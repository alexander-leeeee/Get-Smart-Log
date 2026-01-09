import React from 'react';
import { LayoutDashboard, BookOpen, Calculator, BrainCircuit, LogOut, Settings, Moon, Sun, Home } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, onLogout, isDarkMode, toggleTheme }) => {
  const menuItems = [
    { id: 'HOME' as ViewState, label: 'Главная', icon: Home },
    { id: 'DASHBOARD' as ViewState, label: 'Дашборд', icon: LayoutDashboard },
    { id: 'JOURNAL' as ViewState, label: 'Дневник', icon: BookOpen },
    { id: 'RISK_CALC' as ViewState, label: 'Риск-менеджер', icon: Calculator },
    { id: 'AI_ANALYSIS' as ViewState, label: 'ИИ Анализ', icon: BrainCircuit },
  ];

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen flex flex-col p-4 fixed left-0 top-0 hidden md:flex transition-colors">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="font-bold text-white">TM</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">TradeMind</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span>{isDarkMode ? 'Светлая тема' : 'Темная тема'}</span>
        </button>

        <button
          onClick={() => onChangeView('SETTINGS')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === 'SETTINGS'
              ? 'bg-blue-600 text-white'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Settings size={20} />
          <span>Настройки</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Выйти</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;