import React, { useState } from 'react';

const CategoryFilter = ({ selectedFilters, setSelectedFilters }) => {
  const [categoryVisibility, setCategoryVisibility] = useState({
    language: false,
    framework: false,
    librarie: false,
    db: false,
    environment: false,
    experience: false,
    time_commit: false,
    motivation: false,
  });

  const handleFilterChange = (e, category) => {
    const { value, checked } = e.target;
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[category].push(value);
      } else {
        updatedFilters[category] = updatedFilters[category].filter((item) => item !== value);
      }
      return updatedFilters;
    });
  };

  const toggleCategoryVisibility = (category) => {
    setCategoryVisibility((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const categories = {
    language: ['JavaScript', 'Python', 'Java', 'Ruby', 'HTML', 'CSS', 'TypeScript', 'Go', 'C++', 'Swift', 'Kotlin', 'PHP', 'Rust', 'C#', 'Shell', 'Scala', 'Perl', 'R', 'Objective-C', 'Lua'],
    framework: ['React', 'Vue', 'Angular', 'Django', 'Flask', 'Svelte', 'Next.js', 'Express', 'Laravel', 'Spring Boot', 'NestJS', 'Gatsby'],
    librarie: ['Lodash', 'Moment.js', 'Axios', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'Chart.js', 'Three.js', 'Socket.io', 'Redux', 'Vuex', 'GSAP', 'React Query'],
    db: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Cassandra', 'Elasticsearch', 'MariaDB', 'Firebase', 'OracleDB', 'GraphQL', 'DynamoDB', 'BigQuery'],
    environment: ['Linux', 'Windows', 'MacOS', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Heroku', 'Terraform', 'Vagrant', 'CI/CD', 'Nginx', 'Apache'],
    experience: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    time_commit: ['5h〜10h/週', '10h〜20h/週', '20h以上/週', 'フルタイム', 'フリーランス', '夜間のみ', '週末のみ', '必要な時間帯に合わせて'],
    motivation: ['意見交換', 'プロジェクト開発', '仲間探し', 'スキルアップ', 'ポートフォリオ作成', '業界経験を積む', 'ネットワーキング', '収入向上', '新しい技術を学ぶ', 'キャリアアップ'],
  };

  return (
    <div className="w-[96%] mx-auto px-2">
      <div className="overflow-x-auto whitespace-nowrap px-4">
        <div className="flex gap-4 justify-between">
          {Object.keys(categories).map((category) => (
            <div
              key={category}
              className="cursor-pointer px-6 py-3 rounded-full bg-white shadow-lg border border-gray-300 hover:border-gray-500 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                toggleCategoryVisibility(category);
              }}
            >
              {category === 'language' && '言語'}
              {category === 'framework' && 'フレームワーク'}
              {category === 'librarie' && 'ライブラリ'}
              {category === 'db' && 'データベース'}
              {category === 'environment' && '環境'}
              {category === 'experience' && '経験'}
              {category === 'time_commit' && 'リソース'}
              {category === 'motivation' && 'モチベーション'}
            </div>
          ))}
        </div>
      </div>

      {Object.keys(categories).map((category) => (
        categoryVisibility[category] && (
          <div key={category} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[80%] max-h-[70%] overflow-auto">
              <h3 className="text-2xl font-bold mb-4">
                {category === 'language' && '言語'}
                {category === 'framework' && 'フレームワーク'}
                {category === 'librarie' && 'ライブラリ'}
                {category === 'db' && 'データベース'}
                {category === 'environment' && '環境'}
                {category === 'experience' && '経験'}
                {category === 'time_commit' && 'リソース'}
                {category === 'motivation' && 'モチベーション'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories[category].map((item) => (
                  <label
                    key={item}
                    className={`cursor-pointer px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
                      selectedFilters[category].includes(item)
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={item}
                      className="hidden"
                      onChange={(e) => handleFilterChange(e, category)}
                    />
                    {item}
                  </label>
                ))}
              </div>
              <button
                className="mt-4 px-6 py-3 bg-gray-800 text-white rounded-full transition-all duration-300 hover:bg-gray-700"
                onClick={() => toggleCategoryVisibility(category)}
              >
                閉じる
              </button>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default CategoryFilter;
