import React, { useEffect, useState } from 'react';
import ChatList from '../organisms/ChatList';
import ChatMessage from '../organisms/ChatMessage';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ChatPage = () => {
  const location = useLocation();

  // State定義
  const [chatData, setChatData] = useState([]); // チャットデータを保持するstate
  const [isLoading, setIsLoading] = useState(true); // ローディング中かどうかのフラグ
  const [error, setError] = useState(null); // エラーメッセージを保持するstate
  const [chatJudge, setChatJudge] = useState(false); // チャット画面かリスト画面かを判定するフラグ
  const [providedRandomId, setProvidedRandomId] = useState('');

  // チャットデータを取得する共通関数
  const fetchChatData = async (initialRandomId) => {
    setIsLoading(true); // ローディング開始
    setError(null); // エラーをリセット

    try {
      // APIリクエストを送信
      const response = await axios.post(
        '/api/chat/chat',
        { 
          randomId: initialRandomId, 
          authRandomId: sessionStorage.getItem('randomId') // sessionStorageから取得
        }
      );

      setProvidedRandomId(initialRandomId);

      // サーバーからのレスポンスを処理
      setChatData(response.data);
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
      // チャット画面が有効な場合は処理をスキップ
      if (chatJudge) return;

      setIsLoading(true); // ローディング開始
      setError(null); // エラーをリセット

      try {
        const state = location.state || {}; // 画面遷移時の状態を取得
        const isChat = state.chatJudge || false; // チャット画面かどうかを判定
        const initialRandomId = state.randomId || '';
        setProvidedRandomId(initialRandomId);
        setChatJudge(isChat);

        if (isChat) {
          // チャット画面用のデータ取得処理
          await fetchChatData(initialRandomId);
        } else {
          // チャットリスト用のデータ取得処理
          const response = await axios.post("/api/chat/list", 
            { authRandomId: sessionStorage.getItem('randomId') } // sessionStorageから取得
          );
          // otherUserData(name,icon)とgroups(message)を設定
          setChatData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('データの取得に失敗しました。'); // エラーメッセージを設定
      } finally {
        setIsLoading(false); // ローディング終了
      }
    };

    fetchData(); // データ取得処理を実行
  }, [chatJudge]); // locationの変更を監視

  // チャットを選択した際の処理(今のところgroupIdはいらないけど将来的にグループってなったら必要になる)
  const handleChatSelect = async (groupId, otherId) => {
    setChatJudge(true); // チャット画面フラグをtrueに設定
    await fetchChatData(otherId);
  };

  // リスト画面に戻る処理
  const handleBackToList = (providedRandomId) => {
    setProvidedRandomId(providedRandomId);
    setChatJudge(false);
  };

  return (
    <div>
      {chatJudge ? (
        <ChatMessage 
          chats={chatData} 
          onBackToList={() => handleBackToList(providedRandomId)}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <ChatList 
          chats={chatData} 
          onChatSelect={handleChatSelect}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

export default ChatPage;
