import React, { useState, useEffect } from 'react';
import ProfileSection from './ProfileSection';
import CategoryFilter from '../../atoms/CategoryFilter';


// MyPageコンポーネント
const MyPage = () => {
    // プロフィール情報の管理（省略可能）
    const [profile, setProfile] = useState({
        name: 'John Doe',
        shortDescription: 'Software Developer',
        longDescription: 'Building innovative web applications.',
        avatar: 'https://via.placeholder.com/150',
    });

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

    const [isFilterChanged, setIsFilterChanged] = useState(false);

    // CategoryFilterの状態の変化を監視して、フィルタが変更された際にボタンを表示する
    useEffect(() => {
        setIsFilterChanged(true);
    }, [selectedFilters]);

    // フィルタ変更の保存処理
    const saveChanges = () => {
        console.log("変更が保存されました:", selectedFilters);
        setIsFilterChanged(false);  // 保存後にボタンを非表示に戻す
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold mt-8 mb-4">マイページ</h1>

            <ProfileSection profile={profile} />

            {/* CategoryFilterコンポーネント */}
            <CategoryFilter
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
            />

            {/* フィルター変更があった場合のみ表示する「変更を保存」ボタン */}
            {isFilterChanged && (
                <button
                    className="mt-4 bg-gradient-to-r from-blue-400 to-blue-300 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={saveChanges}
                >
                    変更を保存
                </button>
            )}
        </div>
    );
};

export default MyPage;
