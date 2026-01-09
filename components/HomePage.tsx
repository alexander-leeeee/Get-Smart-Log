import React from 'react';
import { User, ViewState } from '../types';
import { ArrowRight, BookOpen, Calculator, BrainCircuit, TrendingUp } from 'lucide-react';

interface HomePageProps {
  user: User;
  onNavigate: (view: ViewState) => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Добро пожаловать, {user.username}!
          </h1>
          <p className="text-blue-100 text-lg max-w-xl">
            Ваш торговый командный центр готов. Рынки ждут ваших решений. Соблюдайте дисциплину и следуйте плану.
          </p>
          <button 
            onClick={() => onNavigate('JOURNAL')}
            className="mt-6 bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            К дневнику <ArrowRight size={18} />
          </button>
        </div>
        {/* Decorative background element */}
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
          <TrendingUp size={200} />
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => onNavigate('JOURNAL')}
          className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Дневник</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Записывайте сделки, отслеживайте PnL и анализируйте историю.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('RISK_CALC')}
          className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Calculator size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Риск-менеджер</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Рассчитайте лотность и контролируйте риски перед входом.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('AI_ANALYSIS')}
          className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BrainCircuit size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">AI Ассистент</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Получите мгновенный анализ рынка или совет от Gemini AI.
          </p>
        </div>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-center">
         <div>
            <p className="text-lg italic text-slate-600 dark:text-slate-300 mb-2">"Cut your losses short and let your winners run."</p>
            <p className="text-sm text-slate-500 dark:text-slate-500 font-semibold">— Old Trading Adage</p>
         </div>
      </div>
    </div>
  );
};

export default HomePage;