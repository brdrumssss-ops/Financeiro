
import React from 'react';
import { Transaction, TransactionStatus } from '../types';

interface TransactionTableProps {
  transactions: Transaction[];
  deleteTransaction: (id: string) => void;
  onRowClick: (transaction: Transaction) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, deleteTransaction, onRowClick }) => {

  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getUTCDate() - new Date(b.date).getUTCDate());

  const getWeekOfMonth = (date: Date) => {
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth();
      const day = date.getUTCDate();
      const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
      return Math.ceil((day + firstDay) / 7);
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    return String(day).padStart(2, '0');
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Lançamentos do Mês</h3>
      {transactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">Nenhum lançamento para este mês.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dia</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Categoria</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Valor</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Semana</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedTransactions.map((t, index) => (
              <tr 
                key={t.id} 
                onClick={() => onRowClick(t)}
                className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-gray-800/50'} cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{formatDate(t.date)}</td>
                <td className="px-6 py-4 text-sm max-w-xs">
                  <div className="font-medium text-gray-900 dark:text-gray-100">{t.category}</div>
                  {t.description && <div className="text-gray-500 dark:text-gray-400 truncate">{t.description}</div>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{formatCurrency(t.amount)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      t.status === TransactionStatus.PAID
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : t.status === TransactionStatus.PENDING
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-600 dark:text-gray-300">{getWeekOfMonth(new Date(t.date))}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteTransaction(t.id); }} 
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  >
                    <svg xmlns="http://www.worg/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionTable;