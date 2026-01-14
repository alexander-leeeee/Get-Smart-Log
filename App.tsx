import React, { useState, useEffect } from 'react';
import { User, Trade, ViewState, TradeDirection, Language, MarketType } from './types';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import RiskManager from './components/RiskManager';
import AIAnalyzer from './components/AIAnalyzer';
import ExchangeConnect from './components/ExchangeConnect';
import Settings from './components/Settings';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import Contacts from './components/Contacts';
import Pricing from './components/Pricing';
import Blog from './components/Blog';
import PublicOffer from './components/PublicOffer';
import PrivacyPolicy from './components/PrivacyPolicy';
import { Home, LayoutDashboard, BookOpen, Calculator, BrainCircuit, Link2, Coins, TrendingUp } from 'lucide-react';

type PublicViewState = 'LANDING' | 'AUTH' | 'CONTACTS' | 'PRICING' | 'BLOG' | 'PUBLIC_OFFER' | 'PRIVACY_POLICY';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [publicView, setPublicView] = useState<PublicViewState>('LANDING');
  const [marketType, setMarketType] = useState<MarketType>('FUTURES');

  const loadTradesFromDb = async () => {
    if (!user?.id) return;
    try {
      const response = await fetch(`/api/get-trades?userId=${user.id}&marketType=${marketType}`);
      const data = await response.json();
      if (data.trades) {
        setTrades(data.trades); 
      }
    } catch (err) {
      console.error("Ошибка загрузки сделок:", err);
    }
  };

  useEffect(() => {
    loadTradesFromDb();
  }, [marketType, user]);

  // Default to dark theme, but check local storage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('tm_theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Language state
  const [language, setLanguage] = useState<Language>(() => {
     const savedLang = localStorage.getItem('tm_lang');
     return (savedLang === 'en' || savedLang === 'ua' || savedLang === 'ru') ? (savedLang as Language) : 'ru';
  });
  
  // Initialize with empty array
  const [trades, setTrades] = useState<Trade[]>([]);

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

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('tm_lang', lang);
  };

  const handleToggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'ru' ? 'ua' : prev === 'ua' ? 'en' : 'ru';
      localStorage.setItem('tm_lang', next);
      return next;
    });
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

  // --- Data Filtering Logic ---
  // We filter trades based on the selected market type to pass down to components
  // If a trade has no marketType defined (legacy data), we assume it matches the default 'FUTURES' or include it.
  // Here we explicitly check for match or undefined (defaulting to FUTURES for legacy)
  const filteredTrades = trades.filter(t => {
    const tradeType = t.marketType || 'FUTURES'; 
    return tradeType === marketType;
  });

  // If user is not logged in, show Landing Page, Auth, Contacts, Pricing or Blog
  if (!user) {
    if (publicView === 'AUTH') {
      return <Auth onLogin={handleLogin} onBack={() => setPublicView('LANDING')} />;
    }
    const publicProps = {
      onBack: () => setPublicView('LANDING'),
      onStart: () => setPublicView('AUTH'),
      onNavigateToContacts: () => setPublicView('CONTACTS'),
      onNavigateToPricing: () => setPublicView('PRICING'),
      onNavigateToBlog: () => setPublicView('BLOG'),
      onNavigateToPublicOffer: () => setPublicView('PUBLIC_OFFER'),
      onNavigateToPrivacyPolicy: () => setPublicView('PRIVACY_POLICY'),
      isDarkMode,
      toggleTheme,
      language,
      setLanguage: handleSetLanguage,
      toggleLanguage: handleToggleLanguage
    };

    if (publicView === 'CONTACTS') return <Contacts {...publicProps} />;
    if (publicView === 'PRICING') return <Pricing {...publicProps} />;
    if (publicView === 'BLOG') return <Blog {...publicProps} />;
    if (publicView === 'PUBLIC_OFFER') return <PublicOffer {...publicProps} />;
    if (publicView === 'PRIVACY_POLICY') return <PrivacyPolicy {...publicProps} />;
    
    return (
      <LandingPage 
        onStart={() => setPublicView('AUTH')} 
        onNavigateToContacts={() => setPublicView('CONTACTS')}
        onNavigateToPricing={() => setPublicView('PRICING')}
        onNavigateToBlog={() => setPublicView('BLOG')}
        onNavigateToPublicOffer={() => setPublicView('PUBLIC_OFFER')}
        onNavigateToPrivacyPolicy={() => setPublicView('PRIVACY_POLICY')}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        language={language}
        setLanguage={handleSetLanguage}
        toggleLanguage={handleToggleLanguage}
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
        language={language}
        setLanguage={handleSetLanguage}
        marketType={marketType}
        setMarketType={setMarketType}
      />
      
      {/* Mobile Header (visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 z-50 flex justify-between items-center transition-colors">
        <span className="font-bold">Profitera</span>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button 
              onClick={() => setMarketType('SPOT')} 
              className={`px-2 py-1 text-xs font-bold rounded ${marketType === 'SPOT' ? 'bg-white dark:bg-slate-700 shadow' : 'text-slate-500'}`}
            >
              S
            </button>
            <button 
              onClick={() => setMarketType('FUTURES')} 
              className={`px-2 py-1 text-xs font-bold rounded ${marketType === 'FUTURES' ? 'bg-white dark:bg-slate-700 shadow' : 'text-slate-500'}`}
            >
              F
            </button>
          </div>
             <select 
               value={language}
               onChange={(e) => handleSetLanguage(e.target.value as Language)}
               className="bg-transparent font-bold text-sm outline-none cursor-pointer"
             >
               <option value="ru">RU</option>
               <option value="ua">UA</option>
               <option value="en">EN</option>
             </select>
             <button onClick={handleLogout} className="text-sm text-red-500 dark:text-red-400">
                {language === 'ru' ? 'Выйти' : language === 'ua' ? 'Вийти' : 'Logout'}
             </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 transition-all">
        {currentView === 'HOME' && <HomePage user={user} onNavigate={setCurrentView} />}
        {currentView === 'DASHBOARD' && <Dashboard trades={filteredTrades} marketType={marketType} />}
        {currentView === 'JOURNAL' && <Journal trades={filteredTrades} setTrades={setTrades} marketType={marketType} user={user} onSyncSuccess={loadTradesFromDb} />}
        {currentView === 'RISK_CALC' && <RiskManager trades={filteredTrades} marketType={marketType} />}
        {currentView === 'AI_ANALYSIS' && <AIAnalyzer marketType={marketType} />}
        {currentView === 'EXCHANGE_CONNECT' && <ExchangeConnect language={language} user={user} />}
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
         <button onClick={() => setCurrentView('EXCHANGE_CONNECT')} className={`p-2 rounded ${currentView === 'EXCHANGE_CONNECT' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500'}`}>
           <Link2 size={20} />
         </button>
       </div>
    </div>
  );
};

export default App;
