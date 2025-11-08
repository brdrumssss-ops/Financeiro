
import React from 'react';

interface KPICardProps {
  title: string;
  value: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

const KPICard: React.FC<KPICardProps> = ({ title, value, variant = 'default' }) => {
  const variantClasses = {
    default: 'border-blue-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    info: 'border-sky-500',
  };

  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 ${variantClasses[variant]}`}>
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</h4>
      <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  );
};

export default KPICard;