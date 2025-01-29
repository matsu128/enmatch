require("dotenv").config();
const { createClient } = require('redis'); // Redisクライアントのインポート

// Redisクライアントの作成
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

// エラーイベントのハンドリング
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

module.exports = redisClient; // Redisクライアントをエクスポート
