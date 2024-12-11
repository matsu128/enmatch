require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ユーザーをメールアドレスで検索
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: 'ユーザーが見つかりません' });
    }

    // パスワードを比較 (bcryptでハッシュ化されたパスワードを比較)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'パスワードが間違っています' });
    }

    // JWTトークンを発行
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // HTTP-Onlyクッキーとしてトークンを保存
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // HTTPSのみ（ローカル開発中はコメントアウトする）
      sameSite: 'strict',
      maxAge: 3600000 // 1時間
    });

    res.status(200).json({ message: 'ログイン成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};
