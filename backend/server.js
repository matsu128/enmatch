const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes'); // authRoutesを読み込む

const app = express();
const port = process.env.PORT || 5001;

// ミドルウェア (例: JSONボディのパース)
app.use(express.json());

// APIエンドポイント (authRoutesを使用)
app.use('/api/auth', authRoutes); // '/api/auth' でルートをまとめる

// 静的ファイルの提供 (Reactのビルド済みファイル)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Reactアプリケーションのルーティング (フロントエンド)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// サーバーを起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
