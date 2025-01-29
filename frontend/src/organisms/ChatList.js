import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatList = ({ chats = { groupList: [] }, onChatSelect }) => {
  const navigate = useNavigate();

  // デフォルトの画像を設定
  const defaultIcon = "path/to/default/icon.png"; // 適宜変更

  // 日付のフォーマット関数
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return ''; // 日付が取得できない場合は何も表示しない

    const now = new Date();
    const date = new Date(timestamp);

    const isSameDay =
      now.toDateString() === date.toDateString();
    
    // 現在の週かを判断するための関数
    const getWeekNumber = (d) => {
      const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (date.getDay() || 7));
      const firstDay = new Date(date.getFullYear(), 0, 1);
      const dayOfYear = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
      return Math.ceil((dayOfYear + 1) / 7);
    };

    const isSameWeek =
      now.getFullYear() === date.getFullYear() &&
      getWeekNumber(now) === getWeekNumber(date);

    const options = { hour: "2-digit", minute: "2-digit" };

    if (isSameDay) {
      return `本日 ${date.toLocaleTimeString([], options)}`;
    } else if (isSameWeek) {
      const weekday = ["日", "月", "火", "水", "木", "金", "土"];
      return `${weekday[date.getDay()]}曜日 ${date.toLocaleTimeString([], options)}`;
    } else {
      return `${date.getDate()}日 ${date.toLocaleTimeString([], options)}`;
    }
  };

  // latestMessageを指定した長さにトリミング
  const truncateMessage = (message, maxLength) => {
    if (!message) return "";
    return message.length > maxLength ? `${message.slice(0, maxLength)}...` : message;
  };

  return (
    <div className="flex flex-col space-y-2 px-[5%]">
      {Array.isArray(chats.groupList) && chats.groupList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-lg text-gray-700 mb-4">ユーザーを検索してチャットを開始しよう！</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            チャットを開始する
          </button>
        </div>
      ) : (
        (chats.groupList || []).map((group) => {
          const otherRandomId = group.otherRandomId?.[0] || null; // 相手のユーザーランダムIDを取得
          return (
            <div
              key={group.groupId}
              onClick={() => onChatSelect(group.groupId, otherRandomId)}
              className="flex items-center border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 h-24 w-full cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center w-full px-4">
                {/* 左側: アイコン */}
                <div
                  className="w-16 h-16 rounded-full border-2 border-gray-300 overflow-hidden flex-shrink-0"
                  style={{
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={group.icon || defaultIcon}
                    alt={group.groupName || "グループ"}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 中央: グループ情報 */}
                <div className="flex-grow ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {group.groupName || group.otherName}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    <span className="block sm:hidden">
                      {truncateMessage(group.latestMessage, 5)}
                    </span>
                    <span className="hidden sm:block">
                      {truncateMessage(group.latestMessage, 10)}
                    </span>
                  </p>
                </div>

                {/* 右側: タイムスタンプ */}
                <div className="text-sm text-gray-500">
                  {formatTimestamp(group.latestTimestamp)}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatList;
