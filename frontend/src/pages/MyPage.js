import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactInfoSection from '../molecules/ContactInfoSection';
import CategoryFilter from '../organisms/CategoryFilter';
import Button from '../atoms/Button';

const MyPage = () => {
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/user', { withCredentials: true }); // APIエンドポイントにGETリクエスト
        const userData = response.data;

        // 取得したデータを初期値として設定
        setContactInfo({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
        });

        // 必要ならフィルタ情報も初期化
        setSelectedFilters({
          language: userData.language ? [userData.language] : [],
          framework: userData.framework ? [userData.framework] : [],
          librarie: userData.librarie ? [userData.librarie] : [],
          db: userData.db ? [userData.db] : [],
          environment: userData.environment ? [userData.environment] : [],
          experience: userData.experience ? [userData.experience] : [],
          time_commit: userData.time_commit ? [userData.time_commit] : [],
          motivation: userData.motivation ? [userData.motivation] : [],
        });
      } catch (error) {
        console.error('ユーザー情報取得に失敗しました:', error);
      }
    };

    fetchUserData();
  }, []);

  const saveChanges = () => {
    // サーバーに変更を保存するAPIリクエスト例
    axios
      .post('/api/user/update', {
        contactInfo,
        filters: selectedFilters,
      })
      .catch((error) => {
        console.error('変更保存に失敗しました:', error);
      });
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <h1 className="text-3xl font-semibold mt-2 mb-4">マイページ</h1>
      <ContactInfoSection contactInfo={contactInfo} setContactInfo={setContactInfo} />
      <CategoryFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      <Button
        type="button"
        onClick={saveChanges}
        label="変更を保存"
        className="bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
      />
    </div>
  );
};

export default MyPage;
