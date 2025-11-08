
import React from 'react';
import { Transaction, TransactionStatus } from '../types';

interface TransactionDetailModalProps {
  transaction: Transaction;
  onClose: () => void;
}

const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({ transaction, onClose }) => {
    
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const utcDate = new Date(Date.UTC(year, month - 1, day));
    return utcDate.toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
  
  const getWeekOfMonth = (dateString: string) => {
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth();
      const day = date.getUTCDate();
      const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
      return `Semana ${Math.ceil((day + firstDay) / 7)}`;
  }

  // Prevent clicks inside the modal from closing it
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transform transition-all"
        onClick={handleModalContentClick}
      >
        <div className="flex justify-between items-center border-b pb-3 p-4 border-gray-200 dark:border-gray-700">
          <h3 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">Detalhes do Lançamento</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
              <p className="col-span-1 text-sm font-medium text-gray-500 dark:text-gray-400">Data</p>
              <p className="col-span-2 text-md text-gray-900 dark:text-gray-100">{formatDate(transaction.date)}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <p className="col-span-1 text-sm font-medium text-gray-500 dark:text-gray-400">Categoria</p>
            <p className="col-span-2 text-md text-gray-900 dark:text-gray-100">{transaction.category}</p>
          </div>
          {transaction.description && (
            <div className="grid grid-cols-3 gap-4">
              <p className="col-span-1 text-sm font-medium text-gray-500 dark:text-gray-400">Descrição</p>
              <p className="col-span-2 text-md text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{transaction.description}</p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4 items-center">
            <p className="col-span-1 text-sm font-medium text-gray-500 dark:text-gray-400">Valor</p>
            <p className="col-span-2 text-md font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(transaction.amount)}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center">
            <p className="col-span-1 text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
            <div className="col-span-2">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === TransactionStatus.PAID
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : transaction.status === TransactionStatus.PENDING
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}
                >
                    {transaction.status}
                </span>
            </div>
          </div>
           <div className="grid grid-cols-3 gap-4">
            <p className="col-span-1 text-sm font-medium text-gray-500 dark:text-gray-400">Semana</p>
            <p className="col-span-2 text-md text-gray-900 dark:text-gray-100">{getWeekOfMonth(transaction.date)}</p>
          </div>
        </div>
        <div className="flex justify-end items-center p-4 border-t border-gray-200 dark:border-gray-700 rounded-b">
            <button 
                type="button" 
                onClick={onClose}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
                Fechar
            </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailModal;