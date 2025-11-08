import React from 'react';

// Recharts is loaded from a CDN, so we access it via the global `Recharts` object.

interface ChartData {
  name: string;
  value: number;
}

interface CategoryChartProps {
  data: ChartData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  const Recharts = (window as any).Recharts;

  if (!Recharts) {
    return <div className="flex items-center justify-center" style={{ width: '100%', height: 300 }}><p className="text-gray-500 dark:text-gray-400">Loading chart...</p></div>;
  }

  const { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } = Recharts;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };
  
  return (
    <div style={{ width: '100%', height: 300 }}>
       <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
        </PieChart>
       </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;