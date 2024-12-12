import React from 'react';

const ChatItem = ({ chat, onClick }) => (
  <div onClick={() => onClick(chat.id)} className="chat-item">
    {chat.userName}
  </div>
);

export default ChatItem;
