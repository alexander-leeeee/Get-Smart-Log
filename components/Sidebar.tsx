import React from 'react';
import { LayoutDashboard, BookOpen, Calculator, BrainCircuit, LogOut, Settings, Moon, Sun, Home, Languages } from 'lucide-react';
import { ViewState, Language } from '../types';
import { translations } from '../utils/translations';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, onLogout, isDarkMode, toggleTheme, language, setLanguage }) => {
  const t = translations[language].sidebar;

  const menuItems = [
    { id: 'HOME' as ViewState, label: t.home, icon: Home },
    { id: 'DASHBOARD' as ViewState, label: t.dashboard, icon: LayoutDashboard },
    { id: 'JOURNAL' as ViewState, label: t.journal, icon: BookOpen },
    { id: 'RISK_CALC' as ViewState, label: t.risk, icon: Calculator },
    { id: 'AI_ANALYSIS' as ViewState, label: t.ai, icon: BrainCircuit },
  ];

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen flex flex-col p-4 fixed left-0 top-0 hidden md:flex transition-colors">
      <div className="flex items-center gap-2 mb-8 px-2">
        <img 
          src="https://placehold.co/100x100/2563eb/ffffff?text=GSL" 
          alt="GSL Logo" 
          className="h-8 w-auto rounded-lg" 
        />
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Get Smart Log</h1>
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
          <span>{isDarkMode ? t.themeLight : t.themeDark}</span>
        </button>

        <div className="w-full relative flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg transition-colors">
          <Languages size={20} />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="w-full bg-transparent border-none outline-none appearance-none cursor-pointer"
          >
            <option value="ru" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Русский</option>
            <option value="ua" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Українська</option>
            <option value="en" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">English</option>
          </select>
        </div>

        <button
          onClick={() => onChangeView('SETTINGS')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === 'SETTINGS'
              ? 'bg-blue-600 text-white'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Settings size={20} />
          <span>{t.settings}</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>{t.logout}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;