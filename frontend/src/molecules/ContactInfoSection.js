import React from 'react';
import InputField from '../atoms/InputField';

const ContactInfoSection = ({ contactInfo, setContactInfo }) => (
  <div className="w-full max-w-2xl mb-6 p-6 rounded-lg shadow-lg border bg-white border-gray-300">
    <h2 className="text-xl font-semibold mb-6">連絡先情報</h2>
    <div className="flex flex-col gap-4">
      {/* 名前 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <label
          htmlFor="name"
          className="w-full sm:w-32 text-sm font-semibold text-gray-700 text-center sm:text-left"
        >
          名前
        </label>
        <InputField
          id="name"
          type="text"
          placeholder="名前を入力"
          value={contactInfo.name}
          onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
        />
      </div>
      {/* メールアドレス */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <label
          htmlFor="email"
          className="w-full sm:w-32 text-sm font-semibold text-gray-700 text-center sm:text-left"
        >
          メールアドレス
        </label>
        <InputField
          id="email"
          type="email"
          placeholder="メールアドレスを入力"
          value={contactInfo.email}
          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
        />
      </div>
      {/* 電話番号 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <label
          htmlFor="phone"
          className="w-full sm:w-32 text-sm font-semibold text-gray-700 text-center sm:text-left"
        >
          電話番号
        </label>
        <InputField
          id="phone"
          type="tel"
          placeholder="電話番号を入力"
          value={contactInfo.phone}
          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
        />
      </div>
    </div>
  </div>
);

export default ContactInfoSection;
