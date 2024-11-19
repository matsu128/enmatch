// ChatList.js
import React from 'react';

const ChatList = ({ chats, onChatSelect }) => {
  console.log("Initial Chats:", chats); // 初期画面でのchatsの内容を表示

  const handleChatSelect = (id) => {
    console.log("Chat clicked with ID:", id); // クリックされたIDを表示
    onChatSelect(id);
  };

  return (
    <div className="w-full px-[2%] py-6 max-w-full mx-auto">
      {chats && chats.length > 0 ? (
        chats.map((chat) => {
          console.log("Rendering chat:", chat); // 各チャットの内容を表示

          return (
            <div
              key={chat?.id} // chatがnullやundefinedの時にエラーを防ぐ
              className="w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer mb-4 transform hover:-translate-y-1 hover:bg-gray-700"
              onClick={() => handleChatSelect(chat?.id)} // idを渡す
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full shadow-inner text-white text-2xl">
                  {chat?.icon || "?"} {/* chat.iconがundefinedなら"?"を表示 */}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white text-lg md:text-xl">
                    {chat?.userName || "Unknown User"} {/* userNameがない場合には"Unknown User"を表示 */}
                  </p>
                  <p className="text-gray-300 text-base md:text-lg truncate">
                    {chat?.lastMessage || "No messages yet"} {/* lastMessageがない場合には" No messages yet"を表示 */}
                  </p>
                </div>
                <span className="text-gray-400 text-sm md:text-base">{chat?.timestamp || "N/A"}</span>
              </div>
            </div>
          );
        })
      ) : (
        <p>No chats available</p> // chatsが空またはundefinedの場合のフォールバック表示
      )}
    </div>
  );
};

export default ChatList;
