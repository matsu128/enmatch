import React, { useState } from 'react';

const CategoryFilter = ({ selectedFilters, setSelectedFilters }) => {
  // カテゴリごとの表示状態を管理するためのuseState
  const [categoryVisibility, setCategoryVisibility] = useState({
    languages: false,
    frameworks: false,
    libraries: false,
    databases: false,
    environments: false,
    experience: false,
    timeCommitment: false,
    motivation: false,
  });

  // フィルターの変更を処理する関数
  const handleFilterChange = (e, category) => {
    const { value, checked } = e.target; // チェックボックスの状態を取得
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters }; // 既存の選択フィルターをコピー
      if (checked) {
        updatedFilters[category].push(value); // チェックが入った場合、選択されたカテゴリーに値を追加
      } else {
        updatedFilters[category] = updatedFilters[category].filter((item) => item !== value); // チェックが外れた場合、カテゴリーから値を削除
      }
      return updatedFilters;
    });
  };

  // カテゴリの表示・非表示を切り替える関数
  const toggleCategoryVisibility = (category) => {
    setCategoryVisibility((prevState) => ({
      ...prevState,
      [category]: !prevState[category], // 指定されたカテゴリの表示状態を反転
    }));
  };

  // 各カテゴリの選択肢（例：言語、フレームワークなど）
  const categories = {
    languages: ['JavaScript', 'Python', 'Java', 'Ruby', 'HTML', 'CSS', 'TypeScript', 'Go', 'C++', 'Swift', 'Kotlin', 'PHP', 'Rust', 'C#', 'Shell', 'Scala', 'Perl', 'R', 'Objective-C', 'Lua'],
    frameworks: ['React', 'Vue', 'Angular', 'Django', 'Flask', 'Svelte', 'Next.js', 'Express', 'Laravel', 'Spring Boot', 'NestJS', 'Gatsby'],
    libraries: ['Lodash', 'Moment.js', 'Axios', 'jQuery', 'Bootstrap', 'Tailwind CSS', 'Chart.js', 'Three.js', 'Socket.io', 'Redux', 'Vuex', 'GSAP', 'React Query'],
    databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Cassandra', 'Elasticsearch', 'MariaDB', 'Firebase', 'OracleDB', 'GraphQL', 'DynamoDB', 'BigQuery'],
    environments: ['Linux', 'Windows', 'MacOS', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Heroku', 'Terraform', 'Vagrant', 'CI/CD', 'Nginx', 'Apache'],
    experience: ['フロントエンド', 'バックエンド', 'フルスタック', 'モバイルアプリ', 'データベース設計', '機械学習', 'クラウドインフラ', 'DevOps', 'AI開発', 'セキュリティエンジニア'],
    timeCommitment: ['5h〜10h/週', '10h〜20h/週', '20h以上/週', 'フルタイム', 'フリーランス', '夜間のみ', '週末のみ', '必要な時間帯に合わせて'],
    motivation: ['意見交換', 'プロジェクト開発', '仲間探し', 'スキルアップ', 'ポートフォリオ作成', '業界経験を積む', 'ネットワーキング', '収入向上', '新しい技術を学ぶ', 'キャリアアップ'],
  };

  return (
    <div className="flex flex-col items-center w-[96%] mx-auto px-2"> {/* 画面幅の96%を使用 */}
      <div className="w-full p-4">
        <div className="grid grid-cols-2 gap-8">
          {Object.keys(categories).map((category) => (
            <div key={category} className="flex flex-col">
              {/* カテゴリ見出し */}
              <h3 className="text-xl text-center font-semibold mb-4 text-gray-800 inline">
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // 他のクリックイベントを防ぐ
                    toggleCategoryVisibility(category); // クリックされたカテゴリの表示をトグル
                  }}
                >
                  {/* カテゴリ名の日本語表記 */}
                  {category === 'languages' && '言語'}
                  {category === 'frameworks' && 'フレームワーク'}
                  {category === 'libraries' && 'ライブラリ'}
                  {category === 'databases' && 'データベース'}
                  {category === 'environments' && '環境'}
                  {category === 'experience' && '経験'}
                  {category === 'timeCommitment' && 'リソース'}
                  {category === 'motivation' && 'モチベーション'}
                </span>
              </h3>

              {/* タグのスライド式表示 */}
              {categoryVisibility[category] && (
                <div className="overflow-x-auto whitespace-nowrap px-4 rounded-lg max-w-[96%]">
                  <div className="inline-flex gap-4">
                    {categories[category].map((item) => (
                      <label
                        key={item}
                        className={`cursor-pointer rounded-full px-4 py-2 transition-all duration-300 ease-in-out flex items-center justify-center text-sm ${
                          selectedFilters[category]?.includes(item)
                            ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500'
                        }`}
                      >
                        {/* チェックボックス */}
                        <input
                          type="checkbox"
                          value={item}
                          checked={selectedFilters[category]?.includes(item)} // フィルターされているかどうかをチェック
                          onChange={(e) => handleFilterChange(e, category)} // チェックボックスの状態変更を処理
                          className="hidden" // チェックボックスを非表示
                        />
                        {item} {/* タグ名 */}
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
