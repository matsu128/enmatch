import React from 'react';

const ChatMessage = ({ chatData }) => {
  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex items-center justify-center p-4 bg-gray-100 shadow-md">
        <h2 className="text-xl font-semibold">{chatData.userName}との会話</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatData.messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isSentByUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-2 rounded-lg ${
                message.isSentByUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
              } max-w-xs`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="メッセージを入力..."
        />
      </div>
    </div>
  );
};

export default ChatMessage;
