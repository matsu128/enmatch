import { io } from 'socket.io-client';

// サーバーのURLを設定（環境に応じて変更）
const SERVER_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Socket.IOクライアントを初期化
const socket = io(SERVER_URL, {
  transports: ['websocket'], // WebSocketを優先
  reconnection: true,       // 自動再接続を許可
  reconnectionAttempts: 5,  // 再接続試行回数
  timeout: 10000,           // タイムアウト時間（ミリ秒）
});

// 接続状況のログ
socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.warn('Socket disconnected:', reason);
});

// エラーハンドリング
socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});

// 他のファイルで使用できるようエクスポート
export { socket };
