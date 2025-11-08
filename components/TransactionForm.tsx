
import React, { useState, useEffect } from 'react';
import { Transaction, TransactionStatus } from '../types';

interface TransactionFormProps {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  currentDate: Date;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ addTransaction, currentDate }) => {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.PENDING);
  const [error, setError] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Default to today if current month is the actual current month, otherwise default to the 1st
    const day = (today.getFullYear() === year && today.getMonth() === month)
      ? today.getDate()
      : 1;

    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setDate(formattedDate);
  }, [currentDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !category || !amount) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('O valor deve ser um número positivo.');
      return;
    }

    addTransaction({
      date,
      category,
      description,
      amount: numericAmount,
      status,
    });

    // Reset form
    setCategory('');
    setDescription('');
    setAmount('');
    setStatus(TransactionStatus.PENDING);
    setError('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Adicionar Lançamento</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Data</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Categoria</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ex: Aluguel, Prolabore"
            className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Descrição (Opcional)</label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Pagamento referente ao mês de Julho"
            className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Valor (R$)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="150.00"
            step="0.01"
            className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TransactionStatus)}
            className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          >
            <option value={TransactionStatus.PENDING}>Pendente</option>
            <option value={TransactionStatus.PAID}>Pago</option>
            <option value={TransactionStatus.SCHEDULED}>Agendado</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;