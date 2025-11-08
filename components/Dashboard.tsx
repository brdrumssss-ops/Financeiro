
import React, { useMemo } from 'react';
import { Transaction, TransactionStatus } from '../types';
import KPICard from './KPICard';
import CategoryChart from './CategoryChart';
import ExpensesOverTimeChart from './ExpensesOverTimeChart';

interface DashboardProps {
  transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
  const { total, paid, pending, scheduled, categoryData, weeklyData } = useMemo(() => {
    let total = 0;
    let paid = 0;
    let pending = 0;
    let scheduled = 0;
    const categoryMap: { [key: string]: number } = {};
    const weeklyMap: { [key: string]: number } = {};
    
    const getWeekOfMonth = (date: Date) => {
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth();
      const day = date.getUTCDate();
      const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
      return `Semana ${Math.ceil((day + firstDay) / 7)}`;
    }

    transactions.forEach(t => {
      total += t.amount;
      switch (t.status) {
        case TransactionStatus.PAID:
          paid += t.amount;
          break;
        case TransactionStatus.PENDING:
          pending += t.amount;
          break;
        case TransactionStatus.SCHEDULED:
          scheduled += t.amount;
          break;
      }
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      
      const week = getWeekOfMonth(new Date(t.date));
      weeklyMap[week] = (weeklyMap[week] || 0) + t.amount;
    });

    const categoryData = Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const weeklyData = Object.entries(weeklyMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a,b) => a.name.localeCompare(b.name));

    return { total, paid, pending, scheduled, categoryData, weeklyData };
  }, [transactions]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total de Despesas" value={formatCurrency(total)} />
        <KPICard title="Total Pago" value={formatCurrency(paid)} variant="success" />
        <KPICard title="Pendente" value={formatCurrency(pending)} variant="warning" />
        <KPICard title="Agendado" value={formatCurrency(scheduled)} variant="info" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
           <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Despesas por Semana</h3>
           {transactions.length > 0 ? <ExpensesOverTimeChart data={weeklyData} /> : <p className="text-center text-gray-500 dark:text-gray-400 py-10">Sem dados para exibir.</p>}
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Despesas por Categoria</h3>
            {transactions.length > 0 ? <CategoryChart data={categoryData} /> : <p className="text-center text-gray-500 dark:text-gray-400 py-10">Sem dados para exibir.</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;