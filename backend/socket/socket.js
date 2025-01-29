const { Server } = require('socket.io');
const socketHandler = require('./socketHandler'); // イベント処理ロジックをインポート

/**
 * サーバーにSocket.IOを初期化し、クライアントからの接続を処理
 * @param {object} server - HTTPサーバーインスタンス
 */
function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'https://enmatch.jp',  // 公開ドメインに変更
      methods: ['GET', 'POST'],        // 許可するHTTPメソッド
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
    path: '/socket.io/',
    transports: ['websocket', 'polling'],
  });

  // クライアント接続時の処理
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // クライアントがルームに参加
    socket.on('joinRoom', (groupId) => {
      socket.join(groupId); // ユーザーIDをルーム名として使用
      console.log(`User ${groupId} joined their room`);
    });

    // メッセージ送信イベントのリスナーを設定
    socket.on('sendMessage', (data) => {
      console.log('Message received:', data);
      socketHandler.handleSendMessage(io, socket, data); // ioを渡して汎用性を確保
    });

    // クライアント切断時の処理
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}

module.exports = initializeSocket;
