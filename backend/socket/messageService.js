// messageService.js
const prisma = require('./prismaClient'); // Prismaクライアントをインポート

module.exports.saveMessage = async (data) => {
  try {
    // メッセージをDBに保存
    const savedMessage = await prisma.message.create({
      data: {
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
        timestamp: new Date(),
      },
    });

    console.log('Message saved:', savedMessage);
    return savedMessage; // 保存したメッセージを返す
  } catch (error) {
    console.error('Error saving message:', error);
    throw new Error('Failed to save message');
  }
};
