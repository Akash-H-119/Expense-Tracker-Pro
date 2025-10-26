import React from 'react';
import { useExpense } from '../context/ExpenseContext';

const ExpenseSummary = () => {
  const { expenses } = useExpense();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const getCategoryColor = (category) => {
    const colors = {
      food: '#ff6b6b',
      transport: '#4ecdc4',
      shopping: '#45b7d1',
      entertainment: '#96ceb4',
      bills: '#feca57',
      health: '#ff9ff3',
      other: '#54a0ff'
    };
    return colors[category] || '#999';
  };

  return (
    <div className="expense-summary">
      <h3>Expense Summary</h3>
      
      <div className="total-expenses">
        <h4>Total Spent</h4>
        <div className="total-amount">${totalExpenses.toFixed(2)}</div>
      </div>

      <div className="category-breakdown">
        <h4>By Category</h4>
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <div key={category} className="category-item">
            <div className="category-info">
              <span 
                className="category-color" 
                style={{ backgroundColor: getCategoryColor(category) }}
              ></span>
              <span className="category-name">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </div>
            <div className="category-amount">${amount.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseSummary;
