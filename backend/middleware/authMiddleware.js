const jwt = require('jsonwebtoken');

// JWTを検証するミドルウェア
exports.verifyToken = (req, res, next) => {

  // JWTの検証前にクッキーの存在を確認
const beforeToken = req.cookies.token;  // req.cookiesの確認
console.log('Token from cookie:', beforeToken);

  
  console.log("back,middleware/authパス")
  // トークンをクッキーから取得
  const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  
  console.log("back,middleware/auth後パス。token = ", token)

  if (!token) {
    return res.status(401).json({ error: '認証トークンがありません' }); // 修正: message -> error
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // トークンからデコードしたユーザー情報をリクエストオブジェクトに格納
    next(); // 次のミドルウェアまたは処理へ進む
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'トークンの有効期限が切れています' }); // 修正: message -> error
    }
    console.error('トークン検証エラー:', error);
    return res.status(401).json({ error: '無効なトークンです' }); // 修正: message -> error
  }
};