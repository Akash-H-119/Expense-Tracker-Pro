import React from 'react';
import { useExpense } from '../context/ExpenseContext';

const ExpenseList = ({ selectedCategory }) => {
  const { expenses, deleteExpense } = useExpense();

  const filteredExpenses = selectedCategory === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  if (filteredExpenses.length === 0) {
    return (
      <div className="expense-list">
        <h3>Expenses</h3>
        <p className="no-expenses">No expenses found</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h3>Expenses ({filteredExpenses.length})</h3>
      <div className="expenses-container">
        {filteredExpenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-info">
              <div className="expense-title">{expense.title}</div>
              <div className="expense-category">{expense.category}</div>
              <div className="expense-description">{expense.description}</div>
              <div className="expense-date">{formatDate(expense.date)}</div>
            </div>
            <div className="expense-actions">
              <div className="expense-amount">{formatAmount(expense.amount)}</div>
              <button 
                onClick={() => deleteExpense(expense.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
