require("dotenv").config();
const express = require('express');
const path = require('path');
const cors = require('cors'); // CORSパッケージをインポート
const http = require('http'); // HTTPサーバー作成のために必要
const { createClient } = require('redis'); // Redisクライアント
const initializeSocket = require('./socket/socket'); // Socket.IOの初期化関数
const authRoutes = require('./routes/authRoutes'); // 認証関連のルート
const searchRoutes = require('./routes/searchRoutes'); // 検索関連のルート
const userRoutes = require('./routes/userRoutes'); // 設定画面関連のルート
const chatRoutes = require('./routes/chatRoutes'); // チャット画面関連のルート

const app = express();
// const port = process.env.PORT || 5001; // 環境変数が設定されていれば優先
const port = 5001;

// HTTPサーバーの作成
const server = http.createServer(app);

// Redisクライアントの作成と接続
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379', // 環境変数からURLを取得
});
redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Redisに接続
(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    process.exit(1); // Redisに接続できない場合はサーバーを終了
  }
})();

// Redisクライアントをエクスポート
module.exports = { redisClient };

// CORSの設定
const corsOptions = {
  origin: ['http://localhost:5001', 'https://enmatch.jp'],
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type',
  credentials: true,
};
app.use(cors(corsOptions));

// ミドルウェア
app.use(express.json());

console.log("back,server,searc.use前パス");
/*
// Redisを利用したセッション管理（例）
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  redisClient.get(token, (err, data) => {
    if (err || !data) {
      return res.status(401).json({ error: 'Session expired or invalid' });
    }

    req.user = JSON.parse(data); // Redisから取得したセッションデータをreqに設定
    next();
  });
});
*/
// APIエンドポイント
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

// 静的ファイルの提供（フロントエンドのビルド済みファイルを提供）
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Socket.IOの初期化を別ファイルで実行
initializeSocket(server);

// HTTPサーバーの起動
server.listen(port, '0.0.0.0', () => {
  console.log(`HTTP Server is running on port ${port}`);
});
