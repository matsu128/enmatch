const users = [
    { id: 1, name: 'アリス', languages: ['JavaScript', 'Python'], experience: 'フロントエンド', profilePic: '/path/to/image1.jpg', timeCommitment: '5h〜10h/週', motivation: '意見交換', frameworks: ['React'], libraries: ['Lodash'], databases: ['MongoDB'], environments: ['VSCode'] },
    { id: 2, name: 'ボブ', languages: ['Java', 'C#'], experience: 'バックエンド', profilePic: '/path/to/image2.jpg', timeCommitment: '20h以上/週', motivation: '仲間探し', frameworks: ['Spring Boot'], libraries: ['JUnit'], databases: ['PostgreSQL'], environments: ['IntelliJ IDEA'] },
    { id: 3, name: 'チャーリー', languages: ['React', 'Node.js'], experience: 'フルスタック', profilePic: '/path/to/image3.jpg', timeCommitment: '10h〜20h/週', motivation: '技術質問', frameworks: ['Next.js'], libraries: ['Axios'], databases: ['MySQL'], environments: ['VSCode'] },
    { id: 4, name: 'デイヴィッド', languages: ['Python', 'Django'], experience: 'バックエンド', profilePic: '/path/to/image4.jpg', timeCommitment: '5h未満/週', motivation: 'プロジェクト開発', frameworks: ['Django'], libraries: ['Celery'], databases: ['SQLite'], environments: ['PyCharm'] },
    { id: 5, name: 'エマ', languages: ['Ruby', 'Rails'], experience: 'フルスタック', profilePic: '/path/to/image5.jpg', timeCommitment: '10h〜20h/週', motivation: '意見交換', frameworks: ['Ruby on Rails'], libraries: ['RSpec'], databases: ['PostgreSQL'], environments: ['VSCode'] },
    { id: 6, name: 'フランク', languages: ['PHP', 'JavaScript'], experience: 'フロントエンド', profilePic: '/path/to/image6.jpg', timeCommitment: '20h以上/週', motivation: '仲間探し', frameworks: ['Vue.js'], libraries: ['Vuex'], databases: ['MySQL'], environments: ['Sublime Text'] },
    { id: 7, name: 'グレース', languages: ['Swift', 'Objective-C'], experience: 'モバイル', profilePic: '/path/to/image7.jpg', timeCommitment: '5h未満/週', motivation: '技術質問', frameworks: ['SwiftUI'], libraries: ['Alamofire'], databases: ['CoreData'], environments: ['Xcode'] },
    { id: 8, name: 'ヘンリー', languages: ['Go', 'Python'], experience: 'バックエンド', profilePic: '/path/to/image8.jpg', timeCommitment: '5h〜10h/週', motivation: '意見交換', frameworks: ['Gin'], libraries: ['Gorm'], databases: ['PostgreSQL'], environments: ['GoLand'] },
    { id: 9, name: 'アイビー', languages: ['JavaScript', 'TypeScript'], experience: 'フロントエンド', profilePic: '/path/to/image9.jpg', timeCommitment: '10h〜20h/週', motivation: 'プロジェクト開発', frameworks: ['Angular'], libraries: ['RxJS'], databases: ['MongoDB'], environments: ['VSCode'] },
    { id: 10, name: 'ジャック', languages: ['Kotlin', 'Java'], experience: 'モバイル', profilePic: '/path/to/image10.jpg', timeCommitment: '20h以上/週', motivation: '仲間探し', frameworks: ['Kotlin Android Extensions'], libraries: ['Retrofit'], databases: ['SQLite'], environments: ['Android Studio'] },
    { id: 11, name: 'ケイト', languages: ['JavaScript', 'PHP'], experience: 'フルスタック', profilePic: '/path/to/image11.jpg', timeCommitment: '10h〜20h/週', motivation: '意見交換', frameworks: ['Express'], libraries: ['Moment.js'], databases: ['MongoDB'], environments: ['VSCode'] },
    { id: 12, name: 'ルーカス', languages: ['Python', 'R'], experience: 'バックエンド', profilePic: '/path/to/image12.jpg', timeCommitment: '5h未満/週', motivation: 'プロジェクト開発', frameworks: ['Flask'], libraries: ['Pandas'], databases: ['PostgreSQL'], environments: ['Jupyter Notebook'] },
    { id: 13, name: 'メイ', languages: ['Java', 'Spring'], experience: 'フロントエンド', profilePic: '/path/to/image13.jpg', timeCommitment: '5h〜10h/週', motivation: '技術質問', frameworks: ['Spring Boot'], libraries: ['Spring Data'], databases: ['MySQL'], environments: ['IntelliJ IDEA'] },
    { id: 14, name: 'ニック', languages: ['Swift', 'Python'], experience: 'モバイル', profilePic: '/path/to/image14.jpg', timeCommitment: '20h以上/週', motivation: '仲間探し', frameworks: ['UIKit'], libraries: ['CoreAnimation'], databases: ['CoreData'], environments: ['Xcode'] },
    { id: 15, name: 'オリビア', languages: ['JavaScript', 'React'], experience: 'フロントエンド', profilePic: '/path/to/image15.jpg', timeCommitment: '10h〜20h/週', motivation: '意見交換', frameworks: ['React'], libraries: ['Redux'], databases: ['MongoDB'], environments: ['VSCode'] },
    { id: 16, name: 'ポール', languages: ['Python', 'Java'], experience: 'バックエンド', profilePic: '/path/to/image16.jpg', timeCommitment: '5h未満/週', motivation: 'プロジェクト開発', frameworks: ['Django'], libraries: ['NumPy'], databases: ['PostgreSQL'], environments: ['PyCharm'] },
    { id: 17, name: 'クイーン', languages: ['Ruby', 'Rails'], experience: 'フルスタック', profilePic: '/path/to/image17.jpg', timeCommitment: '10h〜20h/週', motivation: '意見交換', frameworks: ['Ruby on Rails'], libraries: ['ActiveRecord'], databases: ['PostgreSQL'], environments: ['VSCode'] },
    { id: 18, name: 'リック', languages: ['PHP', 'JavaScript'], experience: 'フロントエンド', profilePic: '/path/to/image18.jpg', timeCommitment: '20h以上/週', motivation: '仲間探し', frameworks: ['Vue.js'], libraries: ['Vue Router'], databases: ['MySQL'], environments: ['Sublime Text'] },
    { id: 19, name: 'ソフィア', languages: ['Swift', 'Objective-C'], experience: 'モバイル', profilePic: '/path/to/image19.jpg', timeCommitment: '5h未満/週', motivation: '技術質問', frameworks: ['SwiftUI'], libraries: ['Alamofire'], databases: ['CoreData'], environments: ['Xcode'] },
    { id: 20, name: 'トニー', languages: ['Go', 'Python'], experience: 'バックエンド', profilePic: '/path/to/image20.jpg', timeCommitment: '5h〜10h/週', motivation: '意見交換', frameworks: ['Gin'], libraries: ['Gorm'], databases: ['PostgreSQL'], environments: ['GoLand'] },
    { id: 21, name: 'アイザック', languages: ['C++', 'Python'], experience: 'バックエンド', profilePic: '/path/to/image21.jpg', timeCommitment: '10h〜20h/週', motivation: 'プロジェクト開発', frameworks: ['Qt'], libraries: ['Boost'], databases: ['MySQL'], environments: ['CLion'] },
    { id: 22, name: 'ララ', languages: ['JavaScript', 'Vue.js'], experience: 'フロントエンド', profilePic: '/path/to/image22.jpg', timeCommitment: '5h〜10h/週', motivation: '技術質問', frameworks: ['Vue.js'], libraries: ['Vuex'], databases: ['MongoDB'], environments: ['VSCode'] },
    { id: 23, name: 'マーク', languages: ['Java', 'Spring Boot'], experience: 'バックエンド', profilePic: '/path/to/image23.jpg', timeCommitment: '20h以上/週', motivation: '意見交換', frameworks: ['Spring Boot'], libraries: ['Hibernate'], databases: ['PostgreSQL'], environments: ['IntelliJ IDEA'] },
  
  ];
  export default users;
  