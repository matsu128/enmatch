const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // クエリログを有効化
});

const jwt = require("jsonwebtoken");

// JWTトークンの認証ミドルウェア
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Authorizationヘッダーからトークンを取得

    if (!token) {
      return res.status(401).json({ message: "認証トークンが必要です" });
    }

    // トークンを検証し、デコードされたユーザー情報をリクエストに追加
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // デコードしたユーザー情報をリクエストに格納
    next(); // 次のミドルウェアまたは処理へ進む
  } catch (error) {
    console.error("JWT検証エラー:", error);
    return res.status(401).json({ message: "無効なトークンです" });
  }
};

exports.searchUsers = [
  verifyToken, // JWT認証をこのエンドポイントに適用
  async (req, res) => {
    try {
      // フロントエンドから送られたフィルター情報
      const filters = req.body.filters;

      // 初期表示用データの処理 (フィルタなし、またはデフォルトの状態)
      if (!filters || Object.keys(filters).length === 0) {
        const users = await prisma.user.findMany();
        return res.status(200).json({
          initialData: users, // 初期データを返す
          message: "初期データ取得成功",
        });
      }

      // フロントエンドから受け取ったフィルター条件をwhere句に追記
      const whereConditions = Object.entries(filters).reduce((acc, [field, values]) => {
        if (Array.isArray(values) && values.length > 0) {
          // experience だけ数値型に変換
          if (field === "experience") {
            acc[field] = { in: values.map(value => parseInt(value, 10)) };
          } else {
            acc[field] = { in: values }; // 他はそのまま
          }
        }
        return acc;
      }, {});

      // フィルター条件が1つも追加されなかった場合の処理
      if (Object.keys(whereConditions).length === 0) {
        return res.status(200).json({
          filteredData: [],
          message: "指定された条件に一致するユーザーがいません",
        });
      }

      // Prisma検索
      const users = await prisma.user.findMany({
        where: whereConditions,
      });

      // 絞り込んだ結果がない場合は「該当なし」を返す
      if (users.length === 0) {
        return res.status(200).json({
          filteredData: [],
          message: "該当なし",
        });
      }

      // 絞り込んだ結果を返す
      res.status(200).json({
        filteredData: users, // フィルター後のデータを返す
        message: "データ取得成功",
      });
    } catch (error) {
      console.error("ユーザー検索APIエラー:", error);
      res.status(500).json({ message: "サーバーエラーが発生しました" });
    }
  },
];
