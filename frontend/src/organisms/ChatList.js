import React from 'react';
import ChatItem from '../molecules/ChatItem';

const ChatList = ({ chats, onChatSelect }) => (
  <div className="p-4 bg-white shadow-md">
    <h2 className="text-lg font-bold mb-4">チャット一覧</h2>
    <div className="space-y-2">
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} onClick={() => onChatSelect(chat.id)} />
      ))}
    </div>
  </div>
);

export default ChatList;
