import React, { useState } from 'react';
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

  const saveChanges = () => {
    console.log('連絡先情報:', contactInfo);
    console.log('フィルタ:', selectedFilters);
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
