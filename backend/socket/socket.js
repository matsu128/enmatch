const { Server } = require('socket.io');
const socketHandler = require('./socketHandler');

function initializeSocket(server) {
  // Socket.IOを初期化
  const io = new Server(server, {
    cors: {
      // origin: 'https://enmatch.jp', // フロントエンドのURL
      origin: 'http://localhost:5001',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  });

  // 接続処理
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // メッセージ送信イベント
    socket.on('sendMessage', (data) => {
      console.log('Message received:', data);
      socketHandler.handleSendMessage(socket, data); // socketHandlerにメッセージを処理させる
    });

    // 切断時の処理
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}

module.exports = initializeSocket;
