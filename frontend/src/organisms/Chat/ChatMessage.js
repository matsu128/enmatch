import React, { useState } from 'react';
import InputField from '../../atoms/InputField';

const ChatMessage = ({ chatData, onBack }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => setMessage(e.target.value);
  const handleSendMessage = () => setMessage('');

  return (
    <div className="chat-message">
      <button onClick={onBack}>戻る</button>
      <div>
        {chatData.messages.map((msg, index) => (
          <div key={index}>{msg.content}</div>
        ))}
      </div>
      <InputField
        id="chat-input"
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="メッセージを入力..."
      />
      <button onClick={handleSendMessage}>送信</button>
    </div>
  );
};

export default ChatMessage;
