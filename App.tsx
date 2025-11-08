
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Transaction } from './types';
import Header from './components/Header';
import TransactionManager from './components/TransactionManager';
import Dashboard from './components/Dashboard';

type View = 'manager' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<View>('manager');
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const savedTransactions = localStorage.getItem('transactions');
      return savedTransactions ? JSON.parse(savedTransactions) : [];
    } catch (error) {
      console.error("Failed to parse transactions from localStorage", error);
      return [];
    }
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: new Date().toISOString() + Math.random(),
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };
  
  const changeMonth = (offset: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getFullYear() === currentDate.getFullYear() &&
             transactionDate.getMonth() === currentDate.getMonth();
    });
  }, [transactions, currentDate]);

  const monthYearLabel = useMemo(() => {
      return currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }, [currentDate]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <Header currentView={view} setView={setView} />
      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-200 capitalize">{monthYearLabel}</h2>
                <div className="flex items-center space-x-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </div>

        {view === 'manager' ? (
          <TransactionManager
            transactions={filteredTransactions}
            addTransaction={addTransaction}
            deleteTransaction={deleteTransaction}
            currentDate={currentDate}
          />
        ) : (
          <Dashboard transactions={filteredTransactions} />
        )}
      </main>
    </div>
  );
};

export default App;
