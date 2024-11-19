import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatMessage from './ChatMessage';
import chatDummyData from './ChatDummyData'; // データのインポート

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleChatSelect = (chatId) => {
    console.log("Chat selected with ID:", chatId);
    setSelectedChatId(chatId);
  };

  const handleBackToList = () => {
    console.log("Returning to chat list");
    setSelectedChatId(null);
  };

  // 選択されたチャットデータを取得
  const selectedChat = selectedChatId 
    ? chatDummyData.find(chat => chat.id === selectedChatId)
    : null;
  
  console.log("Current selectedChatId:", selectedChatId);
  console.log("Selected chat data:", selectedChat);

  return (
    <div>
      {selectedChat ? (
        <ChatMessage
          chatData={selectedChat} // 選択されたチャットデータをそのまま渡す
          onBack={handleBackToList}
        />
      ) : (
        <ChatList
          chats={chatDummyData} // チャットリストを渡す
          onChatSelect={handleChatSelect}
        />
      )}
    </div>
  );
};

export default ChatPage;
