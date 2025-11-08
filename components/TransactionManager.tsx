import React, { useState } from 'react';
import { Transaction } from '../types';
import TransactionForm from './TransactionForm';
import TransactionTable from './TransactionTable';
import TransactionDetailModal from './TransactionDetailModal';

interface TransactionManagerProps {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  currentDate: Date;
}

const TransactionManager: React.FC<TransactionManagerProps> = ({
  transactions,
  addTransaction,
  deleteTransaction,
  currentDate
}) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm addTransaction={addTransaction} currentDate={currentDate} />
        </div>
        <div className="lg:col-span-2">
          <TransactionTable
            transactions={transactions}
            deleteTransaction={deleteTransaction}
            onRowClick={handleSelectTransaction}
          />
        </div>
      </div>
      {selectedTransaction && (
        <TransactionDetailModal 
          transaction={selectedTransaction}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default TransactionManager;