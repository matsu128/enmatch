import { io } from 'socket.io-client';

// サーバーのURLを設定（環境変数から取得し、WebSocket用に変換）
// 以下のコメントアウト部分はlocal開発時に適応
const SERVER_URL = process.env.REACT_APP_API_URL?.replace(/^https?/, 'wss');
// const SERVER_URL = 'http://localhost:5001';  // local開発用のURLに設定（適宜変更）

if (!SERVER_URL) {
  throw new Error('Environment variable REACT_APP_API_URL is not set.');
}

// Socket.IOクライアントを初期化
const socket = io(SERVER_URL, {
  path: '/socket.io/',      // サーバーが使用するエンドポイント
  transports: ['websocket'], // WebSocketを優先
  reconnection: true,        // 自動再接続を許可
  reconnectionAttempts: 5,   // 再接続試行回数
  timeout: 10000,            // タイムアウト時間（ミリ秒）
});

// 接続状況の詳細なログ
socket.on('connect', () => {
  console.log('Socket connected:', socket.id, 'to', SERVER_URL);
});

socket.on('disconnect', (reason) => {
  console.warn('Socket disconnected:', reason, 'from', SERVER_URL);
});

// エラーハンドリングの詳細化
socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message, 'URL:', SERVER_URL);
});

// 他のファイルで使用できるようエクスポート
export { socket };
