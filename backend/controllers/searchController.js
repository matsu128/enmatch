const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const prisma = new PrismaClient({ log: [] });
const { verifyToken } = require('../middleware/authMiddleware'); // トークン検証のインポート

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
  return Promise.all(
    users.map(async (user) => {
      const randomId = uuidv4(); // ランダムIDを生成
      await prisma.user.update({
        where: { id: user.id }, // 元のIDでユーザーを特定
        data: { randomId }, // ランダムIDをDBに保存
      });

      // id を除外してその他のプロパティを rest に格納
      const { id, ...rest } = user;

      // id を除外し、ランダムIDを含めたオブジェクトを返す
      return { randomId, ...rest };
    })
  );
};

// ユーザー検索API
exports.searchUsers = async (req, res) => {
  try {
    const filters = req.body.filters; // リクエストからフィルターデータを取得

    // フィルター条件を処理
    const whereConditions = filters
      ? Object.entries(filters).reduce((acc, [field, values]) => {
          if (Array.isArray(values) && values.length > 0) {
            if (field === "experience") {
              acc[field] = { in: values.map((value) => parseInt(value, 10)) };
            } else {
              acc[field] = { in: values };
            }
          }
          return acc;
        }, {})
      : {}; // フィルターがない場合は空条件

    // Prismaを使用してDBからユーザーを検索
    const users = await prisma.user.findMany({
      where: whereConditions,
      select: { id: true, ...selectFields },
    });

    // ユーザーが見つからなかった場合のレスポンス
    if (users.length === 0) {
      return res.status(200).json({
        filteredData: [],
        message: "該当なし",
      });
    }

    // DBのIDでソート
    const sortedUsers = users.sort((a, b) => a.id - b.id);

    // ランダムIDを生成し、ユーザー情報を更新
    const usersWithRandomIds = await assignRandomIdsToUsers(sortedUsers);

    // 成功レスポンスを返す
    res.status(200).json({
      filteredData: usersWithRandomIds,
      message: "データ取得成功",
    });
  } catch (error) {
    console.error("ユーザー検索APIエラー:", error);
    res.status(500).json({ message: "サーバーエラー" });
  }
};

