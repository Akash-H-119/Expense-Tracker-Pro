import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ExpenseContext = createContext();

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      const newExpenses = [...state.expenses, {
        id: Date.now().toString(),
        ...action.payload,
        date: new Date().toISOString()
      }];
      localStorage.setItem('expenses', JSON.stringify(newExpenses));
      return { ...state, expenses: newExpenses };

    case 'DELETE_EXPENSE':
      const filteredExpenses = state.expenses.filter(exp => exp.id !== action.payload);
      localStorage.setItem('expenses', JSON.stringify(filteredExpenses));
      return { ...state, expenses: filteredExpenses };

    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload };

    default:
      return state;
  }
};

const initialState = {
  expenses: []
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      dispatch({ type: 'SET_EXPENSES', payload: JSON.parse(savedExpenses) });
    }
  }, []);

  const addExpense = (expense) => {
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  return (
    <ExpenseContext.Provider value={{
      expenses: state.expenses,
      addExpense,
      deleteExpense
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};
