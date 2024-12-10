import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import CategoryFilter from '../../atoms/CategoryFilter';
import axios from 'axios';

// front開発用のdummy data
// import dummyData from './dummyData';

// ベースURLの設定
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const UserSearchPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    language: [],
    framework: [],
    librarie: [],
    db: [],
    environment: [],
    experience: [],
    time_commit: [],
    motivation: [],
  });

  // 初期データの取得
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("front SearchPage 初回postのtry前パス ");
      console.log("リクエストURL:", process.env.REACT_APP_API_URL + '/api/search/search');

      // 本番用データ取得コードを有効化
      try {
        const response = await axios.post('/api/search/search', {});
        const data = response.data?.initialData || []; // データが無い場合に空配列を設定
        setUsers(data);
        setFilteredUsers(data); // 初期データをそのまま表示
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }

      // front開発用: dummyDataはコメントアウト
      // console.log("front開発用: dummyDataを使用");
      // setUsers(dummyData);
      // setFilteredUsers(dummyData);
    };
    fetchUsers();
  }, []);

  // フィルターの適用処理
  const applyFilters = async () => {
    // 本番用フィルター処理コードを有効化
    try {
      const response = await axios.post('/api/search/filter', {
        filters: selectedFilters,
      });

      console.log("filter response data:", response.data);
      console.log("parsed filteredData:", response.data?.filteredData);

      console.log("front SearchPage filterの戻り値 = ", response);
      const data = Array.isArray(response.data?.filteredData) ? response.data.filteredData : []; // フィルタ結果が無い場合に空配列を設定
      setFilteredUsers(data); 
    } catch (error) {
      console.error('フィルター適用中にエラーが発生しました:', error);
    }

    // front開発用: dummyDataでのフィルタリングはコメントアウト
    // console.log("front開発用: dummyDataでフィルタリングを実施");
    // const filtered = dummyData.filter(user => {
    //   // フィルタ条件に基づいてダミーデータを絞り込むロジックを実装
    //   return Object.keys(selectedFilters).every(key => 
    //     selectedFilters[key].length === 0 || 
    //     selectedFilters[key].some(filter => user[key]?.includes(filter))
    //   );
    // });
    // setFilteredUsers(filtered);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mt-8 mb-4">ユーザー検索</h1>
      <CategoryFilter 
        selectedFilters={selectedFilters} 
        setSelectedFilters={setSelectedFilters} 
      />
      {/* フィルターを適用ボタン */}
      <button
        className="mt-8 w-full max-w-xs bg-gradient-to-r from-teal-400 to-teal-300 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        onClick={applyFilters}
      >
        フィルターを適用
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        {Array.isArray(filteredUsers) && filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserSearchPage;
