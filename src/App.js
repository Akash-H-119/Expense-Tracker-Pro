import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import CategoryFilter from './components/CategoryFilter';
import './styles/App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="App">
      <header className="app-header">
        <h1>Advanced Expense Tracker</h1>
        <p>Take control of your finances</p>
      </header>
      
      <div className="container">
        <div className="sidebar">
          <ExpenseForm />
          <ExpenseSummary />
        </div>
        
        <div className="main-content">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <ExpenseList selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

export default App;
