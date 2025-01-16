const { Server } = require('socket.io');
const socketHandler = require('./socketHandler'); // イベント処理ロジックをインポート

/**
 * サーバーにSocket.IOを初期化し、クライアントからの接続を処理
 * @param {object} server - HTTPサーバーインスタンス
 */
function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5001', // フロントエンドURL
      // origin: 'https://enmatch.jp', // フロントエンドのURL
      methods: ['GET', 'POST'],        // 許可するHTTPメソッド
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,              // 認証情報を許可
    },
  });

  // クライアント接続時の処理
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // メッセージ送信イベントのリスナーを設定
    socket.on('sendMessage', (data) => {
      console.log('Message received:', data);
      socketHandler.handleSendMessage(socket, data); // メッセージ処理を委譲
    });

    // クライアント切断時の処理
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}

module.exports = initializeSocket;
