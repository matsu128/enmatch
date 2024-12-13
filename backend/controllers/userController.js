const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ユーザー情報取得コントローラー
exports.getUserData = async (req, res) => {
  try {
    // ミドルウェアで検証済みのトークンからユーザーIDを取得
    const userId = req.user.id;

    // Prismaを使ってユーザーデータを取得
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // ユーザーが見つからない場合の処理
    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません' });
    }

    // クライアントにユーザーデータを返す
    return res.status(200).json(user);
  } catch (error) {
    console.error('ユーザー情報取得エラー:', error);
    return res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};
