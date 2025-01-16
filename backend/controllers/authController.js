require('dotenv').config();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // UUIDライブラリ
const prisma = new PrismaClient();

// server.jsからRedisクライアントをインポート
const { redisClient } = require('../server');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // データベースからユーザー情報を取得
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        icon: true,
        password: true,
      },
    });

    // ユーザーが存在しない場合
    if (!user) {
      return res.status(400).json({ message: 'ユーザーが見つかりません' });
    }

    // TODO Local用はハッシュ化してないので飛ばす
    /*
    // パスワードを検証
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'パスワードが間違っています' });
    }
    */

    // JWTトークンを生成
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // UUIDv4を使用してランダムなIDを生成
    const randomId = uuidv4();

    // Redisにトークンとユーザー情報を保存 (有効期限: 1時間)
    const redisData = JSON.stringify({
      token,
      user: {
        id: user.id,
        name: user.name,
        icon: user.icon,
      },
    });
    await redisClient.setEx(randomId, 3600, redisData);

    // Redisからデータを取得
    const storedData = await redisClient.get(randomId);
    if (!storedData) {
      return res.status(500).json({ message: 'Redisにデータが保存されていません' });
    }

    // 保存したデータをパース
    const parsedData = JSON.parse(storedData);

    // randomIdと一緒にユーザー情報（name, icon）を返却
    res.status(200).json({
      message: 'ログイン成功',
      randomId,
      user: {
        icon: parsedData.user.icon,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};
