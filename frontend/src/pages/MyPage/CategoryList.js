import React, { useState } from 'react';

const CategoryList = ({ categories, updateCategory }) => {
  const [selectedItems, setSelectedItems] = useState({
    languages: [],
    frameworks: [],
    databases: [],
  });

  const handleItemSelect = (category, item) => {
    setSelectedItems((prevState) => {
      const updatedCategoryItems = prevState[category].includes(item)
        ? prevState[category].filter((i) => i !== item)
        : [...prevState[category], item];
      return {
        ...prevState,
        [category]: updatedCategoryItems,
      };
    });
  };

  const handleSaveCategory = (category) => {
    updateCategory(category, selectedItems[category]);
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Skills & Technologies</h2>
      {Object.keys(categories).map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{category}</h3>
          <div className="flex flex-wrap gap-4 mt-4">
            {categories[category].map((item) => (
              <label key={item} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={selectedItems[category]?.includes(item)}
                  onChange={() => handleItemSelect(category, item)}
                  className="form-checkbox text-indigo-500"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <button
            onClick={() => handleSaveCategory(category)}
            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            Save {category}
          </button>
        </div>
      ))}
    </section>
  );
};

export default CategoryList;
