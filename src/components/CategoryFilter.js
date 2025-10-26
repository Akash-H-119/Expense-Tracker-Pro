import React from 'react';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'food', label: 'Food' },
    { value: 'transport', label: 'Transport' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'bills', label: 'Bills' },
    { value: 'health', label: 'Health' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="category-filter">
      <label>Filter by Category:</label>
      <select 
        value={selectedCategory} 
        onChange={(e) => onCategoryChange(e.target.value)}
        className="filter-select"
      >
        {categories.map(category => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
