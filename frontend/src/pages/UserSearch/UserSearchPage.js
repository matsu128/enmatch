import React, { useState } from 'react';
import UserCard from './UserCard';
import CategoryFilter from '../../atoms/CategoryFilter';
import users from './usersData';

const UserSearchPage = () => {
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [selectedFilters, setSelectedFilters] = useState({
      languages: [],
      frameworks: [],
      libraries: [],
      databases: [],
      environments: [],
      experience: [],
      timeCommitment: [],
      motivation: [],
    });
  
    // フィルターの適用処理
    const applyFilters = () => {
      // フィルタリング処理
      const filtered = users.filter(user => {
        return (
          // 言語フィルター
          (selectedFilters.languages.length === 0 || selectedFilters.languages.some(lang => user.languages.includes(lang))) &&
          
          // フレームワークフィルター
          (selectedFilters.frameworks.length === 0 || selectedFilters.frameworks.some(framework => user.frameworks.includes(framework))) &&
          
          // ライブラリフィルター
          (selectedFilters.libraries.length === 0 || selectedFilters.libraries.some(library => user.libraries.includes(library))) &&
          
          // データベースフィルター
          (selectedFilters.databases.length === 0 || selectedFilters.databases.some(db => user.databases.includes(db))) &&
          
          // 環境フィルター
          (selectedFilters.environments.length === 0 || selectedFilters.environments.some(environment => user.environments.includes(environment))) &&
          
          // 経験フィルター
          (selectedFilters.experience.length === 0 || selectedFilters.experience.includes(user.experience)) &&
          
          // 時間フィルター
          (selectedFilters.timeCommitment.length === 0 || selectedFilters.timeCommitment.includes(user.timeCommitment)) &&
          
          // モチベーションフィルター
          (selectedFilters.motivation.length === 0 || selectedFilters.motivation.includes(user.motivation))
        );
      });
      console.log("フィルタ後のユーザーリスト:", filtered);
      setFilteredUsers(filtered); // フィルター後のユーザーを更新
    };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mt-8 mb-4">ユーザー検索</h1>
      <CategoryFilter 
        selectedFilters={selectedFilters} 
        setSelectedFilters={setSelectedFilters} 
        applyFilters={applyFilters} // フィルター適用関数を渡す
      />
      {/* フィルターを適用ボタン */}
      <button
        className="mt-8 w-full max-w-xs bg-gradient-to-r from-teal-400 to-teal-300 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        onClick={applyFilters}
      >
        フィルターを適用
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserSearchPage;
