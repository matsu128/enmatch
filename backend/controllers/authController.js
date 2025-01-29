require('dotenv').config();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // UUIDライブラリ
const prisma = new PrismaClient();

// Redisクライアントをインポート
const redisClient = require('../redisClient');

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

    // パスワードを検証
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'パスワードが間違っています' });
    }

    // JWTトークンを生成
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // UUIDv4を使用してランダムなIDを生成
    const randomId = uuidv4();

    // Redisにトークンとユーザー情報を保存 (有効期限: 1時間)
    const redisData = JSON.stringify({
      token,
      user: {
        name: user.name,
        icon: user.icon,
      },
    });

    try {
      await redisClient.setEx(randomId, 3600, redisData);
    } catch (err) {
      console.error('Failed to save data to Redis:', err);
      return res.status(500).json({ message: 'Redisへの保存中にエラーが発生しました' });
    }

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
        name: parsedData.user.name,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, icon } = req.body;

    // emailの重複確認
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'このメールアドレスは既に登録されています' });
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // 新しいユーザーをデータベースに作成
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        icon: icon || null, // iconが指定されていない場合はnullを設定
      },
    });

    // JWTトークンを生成
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // UUIDv4を使用してランダムなIDを生成
    const randomId = uuidv4();

    // Redisにトークンとユーザー情報を保存 (有効期限: 1時間)
    const redisData = JSON.stringify({
      token,
      user: {
        name: newUser.name,
        icon: newUser.icon,
      },
    });

    try {
      await redisClient.setEx(randomId, 3600, redisData);
    } catch (err) {
      console.error('Redisへの保存中にエラーが発生しました:', err);
      return res.status(500).json({ message: 'Redisへの保存中にエラーが発生しました' });
    }

    // randomIdを返却
    res.status(201).json({
      message: 'サインアップ成功',
      randomId,
      user: {
        name: newUser.name,
        icon: newUser.icon,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
};
