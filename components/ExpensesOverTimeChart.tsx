import React from 'react';

// Recharts is loaded from a CDN, so we access it via the global `Recharts` object.

interface ChartData {
  name: string;
  value: number;
}

interface ExpensesOverTimeChartProps {
  data: ChartData[];
}

const ExpensesOverTimeChart: React.FC<ExpensesOverTimeChartProps> = ({ data }) => {
  const Recharts = (window as any).Recharts;

  if (!Recharts) {
    return <div className="flex items-center justify-center" style={{ width: '100%', height: 300 }}><p className="text-gray-500 dark:text-gray-400">Loading chart...</p></div>;
  }

  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(value);
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
       <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
          <XAxis dataKey="name" tick={{ fill: '#a0a0a0' }} />
          <YAxis tickFormatter={formatCurrency} tick={{ fill: '#a0a0a0' }} />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), "Valor"]}
            cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }}
          />
          <Bar dataKey="value" name="Despesa" fill="#0088FE" />
        </BarChart>
       </ResponsiveContainer>
    </div>
  );
};

export default ExpensesOverTimeChart;