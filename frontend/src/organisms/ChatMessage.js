import React, { useEffect, useState } from 'react';
import { socket } from '../utils/socket'; // Socket接続を管理するユーティリティ

const ChatMessage = ({ chatData, onBack }) => {
  // 現在の入力メッセージ
  const [message, setMessage] = useState('');
  // 表示するメッセージのリスト
  const [messages, setMessages] = useState(chatData?.messages || []);

  // ソケットイベントの設定（リアルタイムメッセージの受信）
  useEffect(() => {
    // 受信したメッセージを追加
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // コンポーネントのアンマウント時にリスナーを削除
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  // メッセージ入力時の状態更新
  const handleInputChange = (e) => setMessage(e.target.value);

  // メッセージ送信処理
  const handleSendMessage = () => {
    if (message.trim()) {
      // 新しいメッセージオブジェクトを作成
      const newMessage = {
        content: message,
        isSender: true, // 自分のメッセージとしてマーク
        timestamp: new Date().toLocaleTimeString(), // 送信時刻
      };

      // メッセージを自分側のチャットに追加
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // サーバーにメッセージを送信
      socket.emit('sendMessage', {
        content: message,
        receiverId: chatData.receiverId, // 受信者のID
      });

      // 入力フィールドをクリア
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* ヘッダー */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        {/* 戻るボタン */}
        <button onClick={onBack} className="text-blue-500">
          戻る
        </button>
        <div className="flex items-center space-x-4">
          {/* 相手のアイコン */}
          <img
            src={chatData.receiverIcon}
            alt="Receiver Icon"
            className="w-10 h-10 rounded-full"
          />
          {/* 相手の名前 */}
          <span className="font-semibold text-lg text-gray-800">
            {chatData.receiverName}
          </span>
        </div>
      </div>

      {/* メインチャットエリア */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* メッセージがない場合の表示 */}
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">メッセージを開始してください。</p>
        ) : (
          // メッセージのリストを表示
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.isSender ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              {/* 相手のメッセージアイコン */}
              {!msg.isSender && (
                <img
                  src={chatData.receiverIcon}
                  alt="Receiver Icon"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              {/* メッセージバブル */}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
                  msg.isSender
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-800'
                }`}
              >
                <p>{msg.content}</p>
                {/* メッセージの送信時刻 */}
                <span className="block text-xs text-gray-500 mt-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* メッセージ入力エリア */}
      <div className="p-4 bg-white shadow-md">
        <div className="flex items-center">
          {/* メッセージ入力フィールド */}
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="メッセージを入力..."
            className="flex-1 px-4 py-2 border rounded-full shadow-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          {/* メッセージ送信ボタン */}
          <button
            onClick={handleSendMessage}
            className="ml-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
