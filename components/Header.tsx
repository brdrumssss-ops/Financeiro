
import React from 'react';

type View = 'manager' | 'dashboard';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const activeClasses = 'bg-blue-600 text-white';
  const inactiveClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white';

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h12v10H4v-2a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm10 2a1 1 0 100-2 1 1 0 000 2zm-3 0a1 1 0 100-2 1 1 0 000 2zm-3 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">FluxoCaixa</span>
            </div>
          </div>
          <div className="bg-gray-200 dark:bg-gray-900 p-1 rounded-lg flex space-x-1">
            <button
              onClick={() => setView('manager')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'manager' ? activeClasses : inactiveClasses}`}
            >
              Lançamentos
            </button>
            <button
              onClick={() => setView('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'dashboard' ? activeClasses : inactiveClasses}`}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
