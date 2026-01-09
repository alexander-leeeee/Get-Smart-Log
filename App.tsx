import React, { useState, useEffect } from 'react';
import { User, Trade, ViewState, TradeDirection } from './types';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import RiskManager from './components/RiskManager';
import AIAnalyzer from './components/AIAnalyzer';
import Settings from './components/Settings';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import Contacts from './components/Contacts';
import Pricing from './components/Pricing';
import { Home, LayoutDashboard, BookOpen, Calculator, BrainCircuit } from 'lucide-react';

type PublicViewState = 'LANDING' | 'AUTH' | 'CONTACTS' | 'PRICING';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [publicView, setPublicView] = useState<PublicViewState>('LANDING');

  // Default to dark theme, but check local storage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('tm_theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  
  // Initialize with some dummy data for demonstration
  const [trades, setTrades] = useState<Trade[]>([
    {
      id: '1',
      symbol: 'BTCUSDT',
      entryPrice: 62000,
      exitPrice: 64500,
      size: 0.1,
      direction: TradeDirection.LONG,
      date: '2023-10-15',
      notes: 'Пробой уровня сопротивления. Хороший объем.',
      pnl: 250
    },
    {
      id: '2',
      symbol: 'ETHUSDT',
      entryPrice: 3400,
      exitPrice: 3350,
      size: 1.5,
      direction: TradeDirection.LONG,
      date: '2023-10-16',
      notes: 'Ложный пробой, вышел по стопу.',
      pnl: -75
    }
  ]);

  // Check for persisted user session (mock)
  useEffect(() => {
    const savedUser = localStorage.getItem('tm_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Theme Effect
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('tm_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('tm_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('tm_user', JSON.stringify(newUser));
    setCurrentView('HOME'); // Navigate to internal home on login
    setPublicView('LANDING'); // Reset public view
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('tm_user');
    setPublicView('LANDING'); // Reset to Landing Page
  };

  // If user is not logged in, show Landing Page, Auth, Contacts or Pricing
  if (!user) {
    if (publicView === 'AUTH') {
      return <Auth onLogin={handleLogin} onBack={() => setPublicView('LANDING')} />;
    }
    if (publicView === 'CONTACTS') {
      return <Contacts onBack={() => setPublicView('LANDING')} />;
    }
    if (publicView === 'PRICING') {
      return <Pricing onBack={() => setPublicView('LANDING')} onStart={() => setPublicView('AUTH')} />;
    }
    return (
      <LandingPage 
        onStart={() => setPublicView('AUTH')} 
        onNavigateToContacts={() => setPublicView('CONTACTS')}
        onNavigateToPricing={() => setPublicView('PRICING')}
      />
    );
  }

  // Authenticated View
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      {/* Mobile Header (visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 z-50 flex justify-between items-center transition-colors">
        <span className="font-bold">Get Smart Log</span>
        <button onClick={handleLogout} className="text-sm text-red-500 dark:text-red-400">Выйти</button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 transition-all">
        {currentView === 'HOME' && <HomePage user={user} onNavigate={setCurrentView} />}
        {currentView === 'DASHBOARD' && <Dashboard trades={trades} />}
        {currentView === 'JOURNAL' && <Journal trades={trades} setTrades={setTrades} />}
        {currentView === 'RISK_CALC' && <RiskManager />}
        {currentView === 'AI_ANALYSIS' && <AIAnalyzer />}
        {currentView === 'SETTINGS' && <Settings user={user} />}
      </main>

       {/* Mobile Navigation (Simple bottom bar for demo purposes on mobile) */}
       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around p-3 z-50 transition-colors">
         <button onClick={() => setCurrentView('HOME')} className={`p-2 rounded ${currentView === 'HOME' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500'}`}>
           <Home size={20} />
         </button>
         <button onClick={() => setCurrentView('DASHBOARD')} className={`p-2 rounded ${currentView === 'DASHBOARD' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500'}`}>
           <LayoutDashboard size={20} />
         </button>
         <button onClick={() => setCurrentView('JOURNAL')} className={`p-2 rounded ${currentView === 'JOURNAL' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500'}`}>
           <BookOpen size={20} />
         </button>
         <button onClick={() => setCurrentView('RISK_CALC')} className={`p-2 rounded ${currentView === 'RISK_CALC' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500'}`}>
           <Calculator size={20} />
         </button>
         <button onClick={() => setCurrentView('AI_ANALYSIS')} className={`p-2 rounded ${currentView === 'AI_ANALYSIS' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500'}`}>
           <BrainCircuit size={20} />
         </button>
       </div>
    </div>
  );
};

export default App;