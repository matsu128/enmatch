import React, { useEffect, useState, useContext, useMemo, useRef } from 'react';
import { socket } from '../utils/socket';

const ChatMessage = ({ chats, providedRandomId, onBack }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [authRandomId, setAuthRandomId] = useState('');

  const messagesEndRef = useRef(null); // スクロール用のref

  const sortedMessages = useMemo(
    () => messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
    [messages]
  );

  // 初回レンダリング時にsessionStorageからauthRandomIdを取得
  useEffect(() => {
    const storedAuthRandomId = sessionStorage.getItem('randomId');
    if (storedAuthRandomId) {
      setAuthRandomId(storedAuthRandomId);
    }
  }, []);

  // 初回レンダリング時にグループIDに基づいてルームに参加
  useEffect(() => {
    if (chats.groupId) {
      socket.emit('joinRoom', chats.groupId); // ルームに参加
    }
  }, [chats.groupId]);

  // 初期メッセージをセット
  useEffect(() => {
    if (chats?.messages) {
      setMessages(chats.messages); // 初期メッセージをステートに設定
    }
  }, [chats]);

  // メッセージ受信時にメッセージを追加
  useEffect(() => {
    const receiveMessageHandler = (newMessage) => {
      // 自分が送ったメッセージは除外
      if (newMessage.senderId !== authRandomId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on('receiveMessage', receiveMessageHandler); // メッセージを受信

    return () => {
      socket.off('receiveMessage', receiveMessageHandler); // クリーンアップ
    };
  }, [authRandomId]);

  // メッセージ送信
  const handleSendMessage = () => {
    if (message.trim()) {
      const timestamp = new Date().toISOString();

      const newMessage = {
        message,
        timestamp,
        user_id: authRandomId,
      };

      // 自分の画面に即時追加
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // サーバーに送信
      socket.emit('sendMessage', {
        senderId: authRandomId,
        receiverId: providedRandomId,
        message,
        groupId: chats.groupId,
        timestamp,
      });

      setMessage(''); // 入力欄をクリア
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}時${date.getMinutes()}分`;
  };

  // メッセージリストの最下部にスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* メッセージ領域 */}
      <div className="flex-1 overflow-y-auto p-4 max-h-screen mb-20">
        {sortedMessages.length === 0 ? (
          <p className="text-center text-gray-500">チャットを始めよう！</p>
        ) : (
          sortedMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.user_id === authRandomId ? 'justify-end' : 'justify-start'} mb-4 items-center`}
            >
              {msg.user_id !== authRandomId && (
                <img src={chats.icon} alt="user-icon" className="w-10 h-10 rounded-full mr-2" />
              )}

              <div className="flex items-center">
                {msg.user_id === authRandomId && (
                  <span className="text-xs text-gray-500 mr-2">{formatTimestamp(msg.timestamp)}</span>
                )}

                <div className={`max-w-xs px-4 py-2 rounded-lg shadow-2xl border border-gray-200 ${msg.user_id === authRandomId ? 'bg-yellow-300 text-black' : 'bg-gray-300 text-gray-800'}`}>
                  <p>{msg.message}</p>
                </div>

                {msg.user_id !== authRandomId && (
                  <span className="text-xs text-gray-500 ml-2">{formatTimestamp(msg.timestamp)}</span>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} /> {/* ここでスクロール位置を制御 */}
      </div>

      {/* 送信フィールド */}
      <div className="p-4 bg-white shadow-md fixed bottom-0 left-0 w-full">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded p-2"
            placeholder="メッセージを入力..."
          />
          <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded">
            送信
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
