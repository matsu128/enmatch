import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
      <img src={user.profilePic} alt={user.name} className="w-full h-32 object-cover rounded" />
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-gray-500">言語: {user.languages.join(', ')}</p>
        <p className="text-gray-500">フレームワーク: {user.frameworks.join(', ')}</p>
        <p className="text-gray-500">ライブラリ: {user.libraries.join(', ')}</p>
        <p className="text-gray-500">データベース: {user.databases.join(', ')}</p>
        <p className="text-gray-500">開発環境: {user.environments.join(', ')}</p>
        <p className="text-gray-700">担当工程: {user.experience}</p>
        <p className="text-gray-500 text-sm">リソース: {user.timeCommitment}</p>
        <p className="text-gray-500 text-sm">モチベーション: {user.motivation}</p>
        <button className="mt-4 bg-yellow-400 text-black py-1 px-3 rounded-lg">
          マッチ申請 or チャット
        </button>
      </div>
    </div>
  );
};

export default UserCard;
