const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: [] });
const jwt = require("jsonwebtoken");
const { redisClient } = require('../server'); // server.jsからRedisクライアントをインポート

/**
 * メッセージをデータベースに保存
 * @param {object} data - 保存するメッセージデータ
 * @returns {object} - 保存されたメッセージオブジェクト
 */
module.exports.saveMessage = async (data) => {
  try {
    // Prismaを使ってメッセージをデータベースに保存
    const savedMessage = await prisma.message.create({
      data: {
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
        timestamp: new Date(), // 現在時刻を設定
      },
    });

    return savedMessage; // 保存されたメッセージを返す
  } catch (error) {
    console.error("Error saving message:", error);
    throw new Error("Failed to save message"); // エラーを上位に伝播
  }
};

// チャットユーザーAPI
exports.getChatMessages = async (req, res) => {
  try {
    // フロントから送られたrandomIdとauthRandomIdを取得
    const { randomId, authRandomId } = req.body;

    // Redisからデータを取得してauthRandomIdに基づくJWTを取得
    const redisData = await redisClient.get(authRandomId);
    if (!redisData) {
      return res.status(404).json({ error: "Redisにデータが見つかりませんでした。" });
    }

    const parsedData = JSON.parse(redisData);
    const userId = parsedData.user.id;

    // randomIdに基づいてUserテーブルから該当ユーザーを取得
    const otherUser = await prisma.user.findUnique({
      where: { randomId: randomId },
      select: { id: true }, // idを取得
    });

    if (!otherUser) {
      return res.status(404).json({ error: "ユーザーが見つかりませんでした。" });
    }

    // 指定された2人のユーザーが含まれているグループを検索
    const group = await prisma.group.findFirst({
      where: {
        AND: [
          {
            users: {
              some: { id: userId }, // トークンのユーザーが含まれている
            },
          },
          {
            users: {
              some: { id: otherUser.id }, // 取得したユーザーが含まれている
            },
          },
          {
            users: {
              every: { id: { in: [userId, otherUser.id] } }, // 他のユーザーが含まれていない
            },
          },
        ],
      },
      select: { id: true }, // group id を取得
    });

    if (!group) {
      return res.status(404).json({ error: "該当するグループが見つかりませんでした。" });
    }

    // 成功レスポンスを返す
    res.status(200).json({
      groupId: group.id,
      message: "グループID取得成功",
    });
  } catch (error) {
    console.error("チャットユーザーAPIエラー:", error);
    res.status(500).json({ message: "サーバーエラー" });
  }
};

/**
 * グループリストと最新メッセージを取得
 */
exports.getChatList = async (req, res) => {
  try {
    console.log("back,ctr,chat,listパス");

    // フロントから送られたauthRandomIdを取得
    const { authRandomId } = req.body;

    // Redisからデータを取得してauthRandomIdに基づくJWTを取得
    const redisData = await redisClient.get(authRandomId);
    if (!redisData) {
      return res.status(404).json({ error: "Redisにデータが見つかりませんでした。" });
    }

    const parsedData = JSON.parse(redisData);
    const userId = parsedData.user.id;

    // トークンのユーザーが所属する全グループを取得
    const groups = await prisma.group.findMany({
      where: {
        users: {
          some: { id: userId },
        },
      },
      select: {
        id: true,
        users: {
          select: {
            name: true, // ユーザーの名前
          },
        },
        messages: {
          take: 1,
          orderBy: { timestamp: "desc" },
          select: { content: true },
        },
      },
    });

    // グループリストと最新メッセージをレスポンス
    res.status(200).json({ groups });
  } catch (error) {
    console.error("グループリストAPIエラー:", error);
    res.status(500).json({ message: "サーバーエラー" });
  }
};
