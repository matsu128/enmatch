const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: [] });
const jwt = require("jsonwebtoken");
const redisClient = require('../redisClient'); // server.jsからRedisクライアントをインポート

/**
 * Redisからデータを取得し、トークンをデコードしてユーザーIDを取得する共通関数
 * @param {string} key - Redisで使用するキー
 * @returns {Promise<string>} デコードされたユーザーID
 */
async function getUserIdFromRedisToken(key) {
  const redisData = await redisClient.get(key);
  if (!redisData) {
    throw new Error("Redisにデータが見つかりませんでした。");
  }

  const parsedData = JSON.parse(redisData);
  const token = parsedData.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    throw new Error("無効なトークンです。");
  }
}

/**
 * メッセージをデータベースに保存し、グループおよびユーザーに関連付ける
 * @param {object} req - リクエストオブジェクト
 * @param {object} res - レスポンスオブジェクト
 */
module.exports.saveMessage = async (data) => {
  const { message, groupId, senderId, receiverId } = data;

  try {
    const authUserId = await getUserIdFromRedisToken(senderId);

    // メッセージをグループおよび送信者に関連付けて保存
    const savedMessage = await prisma.message.create({
      data: {
        message: message, // メッセージ内容
        timestamp: new Date(), // 現在時刻
        group: {
          connect: { id: groupId }, // Groupテーブルとのリレーション
        },
        user: {
          connect: { id: authUserId }, // Userテーブルとのリレーション
        },
      },
    });

    return savedMessage; // 保存されたメッセージを返す
  } catch (error) {
    console.error("Error saving message:", error);
    throw new Error("メッセージの保存に失敗しました。");
  }
};


// チャットユーザーAPI
exports.getChatMessages = async (req, res) => {
  try {
    // フロントから送られたrandomIdとauthRandomIdを取得
    const { randomId, authRandomId } = req.body;

    // 認証済みユーザーのIDをRedisトークンから取得
    const authUserId = await getUserIdFromRedisToken(authRandomId);

    // randomIdに基づいて、他のユーザーのデータを取得
    const otherUserData = await prisma.user.findFirst({
      where: { randomId: randomId },
      select: {
        id: true,
        icon: true,
      },
    });

    // 他のユーザーが見つからない場合
    if (!otherUserData) {
      return res.status(404).json({ error: "指定されたユーザーが見つかりません。" });
    }

    // authUserIdとotherUserIdだけが含まれるグループとそのメッセージを取得
    const groupWithMessages = await prisma.group.findFirst({
      where: {
        AND: [
          { users: { some: { id: authUserId } } },
          { users: { some: { id: otherUserData.id } } },
        ],
        NOT: {
          users: { some: { id: { notIn: [authUserId, otherUserData.id] } } },
        },
      },
      select: {
        id: true,
        messages: {
          select: {
            message: true,
            timestamp: true,
            user_id: true,
          },
          orderBy: { timestamp: "asc" },
        },
      },
    });

    // グループが存在しない場合、グループを新規作成
    if (!groupWithMessages) {
      // 新しいグループを作成
      const newGroup = await prisma.group.create({
        data: {
          users: {
            connect: [
              { id: authUserId }, // 認証ユーザーを追加
              { id: otherUserData.id }, // 他のユーザーを追加
            ],
          },
        },
      });

      // 新しいグループ情報をレスポンスとして返す
      return res.status(200).json({
        groupId: newGroup.id,
        messages: [], // 新しいグループなのでメッセージは空
        icon: otherUserData.icon,
      });
    }

    // messagesのuser_idを加工し、必要なデータだけ返す
    const processedMessages = groupWithMessages.messages.map((msg) => {
      if (msg.user_id === authUserId) {
        return {
          message: msg.message,
          timestamp: msg.timestamp,
          user_id: authRandomId, // authRandomIdを付与
        };
      } else {
        return {
          message: msg.message,
          timestamp: msg.timestamp,
          user_id: randomId, // randomIdを付与
        };
      }
    });

    // グループとそのメッセージ情報をレスポンスとして返す
    res.status(200).json({
      groupId: groupWithMessages.id,
      messages: processedMessages,
      icon: otherUserData.icon,
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

    // フロントから送られたauthRandomIdを取得
    const { authRandomId } = req.body;

    // Redisからトークンを取得してauthUserIdを取得
    const authUserId = await getUserIdFromRedisToken(authRandomId);

    // トークンのユーザーが所属する全グループを取得
    const groups = await prisma.group.findMany({
      where: {
        users: {
          some: { id: authUserId },
        },
      },
      select: {
        id: true, // グループID
        name: true, // グループの名前
        messages: {
          take: 1, // 最新のメッセージ1件を取得
          orderBy: { timestamp: "desc" },
          select: {
            message: true,
            timestamp: true,
          },
        },
        users: {
          select: {
            name: true,
            randomId: true, // チャット相手のランダムID
          },
          where: {
            id: { not: authUserId }, // 本人以外のユーザーのみ取得
          },
        },
      },
    });

    // グループデータを加工して、必要な情報を抽出
    const groupList = groups.map((group) => ({
      groupId: group.id,
      groupName: group.name,
      latestMessage: group.messages[0]?.message || null,
      latestTimestamp: group.messages[0]?.timestamp || null,
      otherRandomId: group.users.map((user) => user.randomId), // 複数ユーザーのrandomIdを配列で保持
      otherName: group.users.map((user) => user.name),
    }));

    // フロントに返却
    return res.status(200).json({ groupList });

  } catch (error) {
    console.error("グループリストAPIエラー:", error);
    res.status(500).json({ message: "サーバーエラー" });
  }
};

