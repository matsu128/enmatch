const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid"); // UUIDライブラリのインポート
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // クエリログを有効化
});

// JWTトークンの認証ミドルウェア
const verifyToken = (req, res, next) => {
  try {
    // Authorizationヘッダーからトークンを取得
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      // トークンがない場合、401エラーを返す
      return res.status(401).json({ message: "認証トークンが必要です" });
    }

    // JWTトークンを検証し、デコードされたユーザー情報をリクエストに追加
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // デコードしたユーザー情報をリクエストに格納
    next(); // 次のミドルウェアまたは処理へ進む
  } catch (error) {
    console.error("JWT検証エラー:", error);
    // トークンが無効な場合、401エラーを返す
    return res.status(401).json({ message: "無効なトークンです" });
  }
};

// 共通の選択フィールド（DBから返すデータのフィールドを定義）
const selectFields = {
  name: true,
  icon: true,
  language: true,
  framework: true,
  librarie: true,
  db: true,
  experience: true,
  time_commit: true,
  environment: true,
  short_bio: true,
  motivation: true,
};

// ランダムIDを生成してDBに保存し、レスポンス用データを返す関数
const assignRandomIdsToUsers = async (users) => {
  // ユーザーごとにランダムIDを生成し、DBを更新してからレスポンス用データを作成
  return await Promise.all(
    users.map(async (user) => {
      const randomId = uuidv4(); // ランダムIDを生成
      // DBにランダムIDを保存
      await prisma.user.update({
        where: { id: user.id }, // 元のIDでユーザーを特定
        data: { randomId },
      });
      // ランダムIDとユーザー情報を返す
      return {
        randomId, // ランダムIDをレスポンスに含める
        name: user.name,
        icon: user.icon,
        language: user.language,
        framework: user.framework,
        librarie: user.librarie,
        db: user.db,
        experience: user.experience,
        time_commit: user.time_commit,
        environment: user.environment,
        short_bio: user.short_bio,
        motivation: user.motivation,
      };
    })
  );
};

// ユーザー検索API
exports.searchUsers = [
  verifyToken, // JWT認証をこのエンドポイントに適用
  async (req, res) => {
    try {
      const filters = req.body.filters; // リクエストからフィルターデータを取得

      // フィルター条件を処理
      const whereConditions = filters
        ? Object.entries(filters).reduce((acc, [field, values]) => {
            // フィルターの各項目を処理
            if (Array.isArray(values) && values.length > 0) {
              // "experience"フィールドに特別な処理を行う
              if (field === "experience") {
                // experienceは配列の値を数値に変換してフィルタリング
                acc[field] = { in: values.map((value) => parseInt(value, 10)) };
              } else {
                // その他のフィールドはそのままin条件でフィルタリング
                acc[field] = { in: values };
              }
            }
            return acc; // フィルター条件を累積
          }, {})
        : {}; // フィルターがない場合は空の条件を設定

      // Prismaを使用してDBからユーザーを検索
      const users = await prisma.user.findMany({
        where: whereConditions, // フィルター条件を適用
        select: { id: true, ...selectFields }, // 必要なフィールドを選択
      });

      // ユーザーが見つからなかった場合のレスポンス
      if (users.length === 0) {
        return res.status(200).json({
          filteredData: [],
          message: "該当なし", // 該当するユーザーがいない場合
        });
      }

      // ランダムIDを生成し、ユーザー情報を更新
      const usersWithRandomIds = await assignRandomIdsToUsers(users);

      // 成功レスポンスを返す
      res.status(200).json({
        filteredData: usersWithRandomIds, // 生成されたユーザー情報を含めたレスポンス
        message: "データ取得成功", // データ取得成功のメッセージ
      });
    } catch (error) {
      console.error("ユーザー検索APIエラー:", error);
      // サーバーエラーが発生した場合
      res.status(500).json({ message: "サーバーエラーが発生しました" });
    }
  },
];
