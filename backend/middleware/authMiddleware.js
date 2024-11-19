const jwt = require('jsonwebtoken');

// 認証ミドルウェア
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Authorizationヘッダーからトークンを取得

  if (!token) {
    return res.status(401).json({ message: '認証トークンが必要です' });
  }

  try {
    // トークンを検証してユーザー情報を取得
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // デコードしたユーザー情報をリクエストに追加
    next(); // 次のミドルウェアまたはルートハンドラへ進む
  } catch (error) {
    res.status(401).json({ message: '無効な認証トークンです' });
  }
};

module.exports = authMiddleware;
