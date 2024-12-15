// socketHandler.js
const messageService = require('./messageService'); // messageServiceをインポート

module.exports.handleSendMessage = async (socket, data) => {
  try {
    // Prismaを使ってメッセージをDBに保存
    const savedMessage = await messageService.saveMessage(data);

    // メッセージが保存された後、受信者に通知
    socket.to(data.receiverId).emit('receiveMessage', savedMessage);

  } catch (error) {
    console.error('Error handling sendMessage:', error);
    socket.emit('error', 'メッセージの送信に失敗しました');
  }
};
