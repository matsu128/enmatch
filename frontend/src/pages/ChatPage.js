import React, { useState } from 'react';
import ChatList from '../organisms/Chat/ChatList';
import ChatMessage from '../organisms/Chat/ChatMessage';
import chatDummyData from '../data/ChatDummyData';

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleChatSelect = (chatId) => setSelectedChatId(chatId);
  const handleBackToList = () => setSelectedChatId(null);

  const selectedChat = selectedChatId
    ? chatDummyData.find((chat) => chat.id === selectedChatId)
    : null;

  return (
    <div>
      {selectedChat ? (
        <ChatMessage chatData={selectedChat} onBack={handleBackToList} />
      ) : (
        <ChatList chats={chatDummyData} onChatSelect={handleChatSelect} />
      )}
    </div>
  );
};

export default ChatPage;
