require("dotenv").config();
const express = require('express');
const path = require('path');
const cors = require('cors'); // CORSパッケージをインポート
const http = require('http'); // HTTPサーバー作成のために必要
const initializeSocket = require('../socket/socket'); // Socket.IOの初期化関数
const authRoutes = require('./routes/authRoutes'); // 認証関連のルート
const searchRoutes = require('./routes/searchRoutes'); // 検索関連のルート
const userRoutes = require('./routes/userRoutes'); // 設定画面関連のルート

const app = express();
// const port = process.env.PORT || 5001;
const port = 5001;

// HTTPサーバーの作成
const server = http.createServer(app);

// CORSの設定
const corsOptions = {
  // origin: 'https://enmatch.jp', // フロントエンドのURL
  origin: 'http://localhost:5001',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
};
app.use(cors(corsOptions));

// ミドルウェア
app.use(express.json());

// APIエンドポイント
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/user', userRoutes);

// 静的ファイルの提供（フロントエンドのビルド済みファイルを提供）
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Socket.IOの初期化を別ファイルで実行
initializeSocket(server);

// HTTPサーバーの起動
server.listen(port, '0.0.0.0', () => {
  console.log(`HTTP Server is running on port ${port}`);
});
