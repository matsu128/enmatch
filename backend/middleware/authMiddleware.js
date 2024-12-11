const jwt = require('jsonwebtoken');

// JWTを検証するミドルウェア
exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token; // HTTP-Onlyクッキーからトークンを取得

  if (!token) {
    return res.status(401).json({ message: '認証トークンがありません' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // デコードしたトークン情報をリクエストオブジェクトに追加
    next();
  } catch (error) {
    console.error('トークン検証エラー:', error);
    return res.status(401).json({ message: '無効なトークンです' });
  }
};
