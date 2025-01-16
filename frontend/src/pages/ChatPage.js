import React, { useEffect, useState, useContext } from 'react';
import ChatList from '../organisms/ChatList';
import ChatMessage from '../organisms/ChatMessage';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // AuthContextをインポート

const ChatPage = () => {
  const location = useLocation();
  
  // AuthContextから必要な値を取得
  const { authRandomId } = useContext(AuthContext);

  // State定義
  const [chatData, setChatData] = useState([]); // チャットデータを保持するstate
  const [randomId, setRandomId] = useState(null); // サーバーから取得したランダムIDを保持するstate
  const [selectedChatId, setSelectedChatId] = useState(null); // 現在選択されているチャットID
  const [isLoading, setIsLoading] = useState(true); // ローディング中かどうかのフラグ
  const [error, setError] = useState(null); // エラーメッセージを保持するstate
  const [chatJudge, setChatJudge] = useState(false); // チャット画面かリスト画面かを判定するフラグ

  // チャットデータを取得する共通関数
  const fetchChatData = async (providedRandomId) => {
    setIsLoading(true); // ローディング開始
    setError(null); // エラーをリセット

    try {
      // APIリクエストを送信
      const response = await axios.post(
        '/api/chat/chat',
        { randomId: providedRandomId, authRandomId }, // ランダムIDとAuthRandomIdを送信
      );

      // サーバーからのレスポンスを処理
      const { randomId: returnedRandomId, messages } = response.data;

      // ランダムIDとメッセージデータをstateに保存
      setRandomId(returnedRandomId);
      setChatData(messages);

      // 最初のメッセージをデフォルトで選択
      if (messages.length > 0) {
        setSelectedChatId(messages[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch chat data:', error);
      setError('データの取得に失敗しました。'); // エラーメッセージを設定
    } finally {
      setIsLoading(false); // ローディング終了
    }
  };

  // 初期データを取得する処理
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // ローディング開始
      setError(null); // エラーをリセット

      try {
        const { state } = location; // 画面遷移時の状態を取得
        const isChat = state?.chatJudge || false; // チャット画面かどうかを判定
        const providedRandomId = state?.randomId || '';
        setChatJudge(isChat);

        if (isChat) {
          // チャット画面用のデータ取得処理
          await fetchChatData(providedRandomId);
        } else {
          // チャットリスト用のデータ取得処理
          const response = await axios.post("/api/chat/list", 
            { randomId: providedRandomId, authRandomId }, // ランダムIDとAuthRandomIdを送信
          );

          const { chats } = response.data;
          setChatData(chats); // チャットリストをstateに保存
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('データの取得に失敗しました。'); // エラーメッセージを設定
      } finally {
        setIsLoading(false); // ローディング終了
      }
    };

    fetchData(); // データ取得処理を実行
  }, [location]); // locationの変更を監視

  // チャットを選択した際の処理
  const handleChatSelect = async (chatId, randomId) => {
    setSelectedChatId(chatId); // 選択されたチャットIDを保存
    await fetchChatData(randomId); // 選択されたチャットのデータを取得
  };

  // リスト画面に戻る処理
  const handleBackToList = () => setSelectedChatId(null);

  // 選択されたチャットのデータを取得
  const selectedChat = selectedChatId
    ? chatData.find((chat) => chat.id === selectedChatId)
    : null;

  // コンポーネントの描画
  return (
    <div className="h-screen bg-gray-100">
      {isLoading ? (
        <p>Loading...</p> // ローディング中の表示
      ) : error ? (
        <p className="text-red-500">{error}</p> // エラーメッセージの表示
      ) : chatJudge && selectedChat ? (
        <ChatMessage chatData={selectedChat} onBack={handleBackToList} /> // チャット画面
      ) : (
        <ChatList chats={chatData} onChatSelect={(id, randomId) => handleChatSelect(id, randomId)} /> // チャットリスト画面
      )}
    </div>
  );
};

export default ChatPage;
