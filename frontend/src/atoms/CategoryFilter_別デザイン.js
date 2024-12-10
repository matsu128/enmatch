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
    <div className="flex flex-col items-center w-[96%] mx-auto px-2">
      <div className="w-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8"> {/* スマホ時は1列、デスクトップ時は2列 */}
          {Object.keys(categories).map((category) => (
            <div key={category} className="flex flex-col">
              <h3 className="text-xl text-center font-semibold mb-4 text-gray-800 inline">
                <span
                  className="cursor-pointer"
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
                </span>
              </h3>

              {categoryVisibility[category] && (
                <div className="overflow-x-auto whitespace-nowrap px-4 rounded-lg max-w-[96%]">
                  <div className="inline-flex gap-4 flex-nowrap"> {/* タグが横スクロールできるように指定 */}
                    {categories[category].map((item) => (
                      <label
                        key={item}
                        className={`cursor-pointer rounded-full px-4 py-2 transition-all duration-300 ease-in-out flex items-center justify-center text-sm ${
                          selectedFilters[category]?.includes(item)
                            ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500'
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={item}
                          checked={selectedFilters[category]?.includes(item)}
                          onChange={(e) => handleFilterChange(e, category)}
                          className="hidden"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;