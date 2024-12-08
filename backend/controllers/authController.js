require('dotenv').config();
const bcrypt = require('bcrypt'); // bcryptをインポート
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ログイン処理
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ユーザーをメールアドレスで検索
    const user = await prisma.user.findUnique({
      where: { email }
    });

    console.log("back authCtrパス");

    if (!user) {
      return res.status(400).json({ message: 'ユーザーが見つかりません' });
    }

    // パスワードを比較 ハッシュ化はフロント側で対応済
    if (password !== user.password) {
      return res.status(400).json({ message: 'パスワードが間違っています' });
    }

    // JWTトークンを発行
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // トークンをレスポンスとして返す
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};
