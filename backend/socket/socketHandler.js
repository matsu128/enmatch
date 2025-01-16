const chatController = require('../controllers/chatController'); // チャットのビジネスロジックをインポート

/**
 * メッセージ送信イベントを処理
 * @param {object} socket - 接続中のSocket.IOインスタンス
 * @param {object} data - クライアントから受け取ったデータ
 */
module.exports.handleSendMessage = async (socket, data) => {
  try {
    // データベースにメッセージを保存
    const savedMessage = await chatController.saveMessage(data);

    // メッセージを受信者に送信
    socket.to(data.receiverId).emit('receiveMessage', savedMessage);
  } catch (error) {
    console.error('Error handling sendMessage:', error);

    // クライアントにエラーメッセージを送信
    socket.emit('error', 'メッセージの送信に失敗しました');
  }
};
