import React from 'react';
import ChatItem from '../molecules/ChatItem';

const ChatList = ({ chats, onChatSelect }) => (
  <div className="chat-list">
    {chats.map((chat) => (
      <ChatItem key={chat.id} chat={chat} onClick={onChatSelect} />
    ))}
  </div>
);

export default ChatList;
