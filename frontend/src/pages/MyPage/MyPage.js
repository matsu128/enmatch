import React, { useState } from 'react';
import CategoryFilter from '../../atoms/CategoryFilter';

// MyPageコンポーネント
const MyPage = () => {
    // 入力項目の状態管理
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        phone: '',
    });

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

    // 変更保存処理
    const saveChanges = () => {
        console.log("連絡先情報:", contactInfo);
        console.log("フィルタ:", selectedFilters);
    };

    return (
        <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-semibold mt-2 mb-4">マイページ</h1>

            {/* 連絡先情報セクション */}
            <div className="w-full max-w-2xl mb-6 p-4 rounded-lg shadow-lg border border-gray-300">
                <h2 className="text-xl font-medium mb-4">連絡先情報</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">名前</label>
                    <input
                        type="text"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-inner"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">メールアドレス</label>
                    <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-inner"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">電話番号</label>
                    <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-inner"
                    />
                </div>
            </div>

            {/* CategoryFilterコンポーネント */}
            <CategoryFilter
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
            />

            {/* 保存ボタン */}
            <button
                className="mt-4 bg-gradient-to-r from-gray-400 to-gray-300 text-black py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={saveChanges}
            >
                変更を保存
            </button>
        </div>
    );
};

export default MyPage;
