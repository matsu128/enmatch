const chatController = require('../controllers/chatController'); // チャットのビジネスロジックをインポート

/**
 * メッセージ送信イベントを処理
 * @param {object} io - Socket.IOのインスタンス
 * @param {object} socket - 接続中のSocket.IOインスタンス
 * @param {object} data - クライアントから受け取ったデータ
 */
module.exports.handleSendMessage = async (io, socket, data) => {
  try {
    // データベースにメッセージを保存
    const savedMessage = await chatController.saveMessage(data);

    // 受信者のルームにメッセージを送信
    io.to(data.groupId).emit('receiveMessage', data);
  } catch (error) {
    console.error('Error handling sendMessage:', error);

    // クライアントにエラーメッセージを送信
    socket.emit('error', 'メッセージの送信に失敗しました');
  }
};
