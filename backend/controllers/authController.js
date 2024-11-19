const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ログイン処理
exports.login = async (req, res) => {
  try {
    console.log("backのauthControllerのtryパス");
    const { email, password } = req.body;

    // ユーザーをメールアドレスで検索
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ message: 'ユーザーが見つかりません' });
    }

    // パスワードを比較
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
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
