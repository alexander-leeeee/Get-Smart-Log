import React from 'react';
import { ArrowLeft, Check, X, Zap } from 'lucide-react';

interface PricingProps {
  onBack: () => void;
  onStart: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onBack, onStart }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-800 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
              <img 
                src="https://placehold.co/100x100/2563eb/ffffff?text=GSL" 
                alt="GSL Logo" 
                className="h-8 w-auto rounded-lg" 
              />
              <span className="text-xl font-bold">Get Smart Log</span>
            </div>
            <button 
              onClick={onBack} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft size={18} />
              <span>На главную</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Инвестируйте в свою дисциплину
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Начните бесплатно. Масштабируйтесь, когда будете готовы к профессиональному росту.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col relative overflow-hidden">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Старт</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">$0</span>
                  <span className="text-slate-500 dark:text-slate-400">/ навсегда</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 mt-4">
                  Идеально для знакомства с платформой и первых шагов в системном трейдинге.
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <Check className="text-blue-500 shrink-0" size={20} />
                  <span><span className="font-bold">Безлимитное</span> кол-во сделок</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-500 shrink-0" size={20} />
                  <span>Базовый торговый дневник</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-500 shrink-0" size={20} />
                  <span>Калькулятор риска</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-blue-500 shrink-0" size={20} />
                  <span>Дашборд статистики</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <X className="shrink-0" size={20} />
                  <span>AI Анализ сделок</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <X className="shrink-0" size={20} />
                  <span>Риск-менеджер</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <X className="shrink-0" size={20} />
                  <span>Психологическая ИИ поддержка</span>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <X className="shrink-0" size={20} />
                  <span>Приоритетная поддержка</span>
                </li>
              </ul>

              <button 
                onClick={onStart}
                className="w-full py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Попробовать бесплатно
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl border border-blue-500 p-8 shadow-xl flex flex-col relative overflow-hidden text-white transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                РЕКОМЕНДУЕМ
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  Pro Trader <Zap className="text-yellow-400 fill-yellow-400" size={20} />
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">$20</span>
                  <span className="text-slate-300">/ месяц</span>
                </div>
                <p className="text-slate-300 mt-4">
                  Полный доступ ко всем инструментам для профессиональной торговли без ограничений.
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-500/20 p-1 rounded-full"><Check className="text-blue-400 shrink-0" size={14} /></div>
                  <span className="font-bold">Все функции тарифа Старт</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-500/20 p-1 rounded-full"><Check className="text-blue-400 shrink-0" size={14} /></div>
                  <span><span className="text-purple-300 font-bold">Риск-менеджер</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-500/20 p-1 rounded-full"><Check className="text-blue-400 shrink-0" size={14} /></div>
                  <span><span className="text-purple-300 font-bold">Психологическая AI поддержка 24/7</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-500/20 p-1 rounded-full"><Check className="text-blue-400 shrink-0" size={14} /></div>
                  <span><span className="text-purple-300 font-bold">AI Анализ сделок</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-500/20 p-1 rounded-full"><Check className="text-blue-400 shrink-0" size={14} /></div>
                  <span><span className="text-purple-300 font-bold">Приоритетная поддержка</span></span>
                </li>
              </ul>

              <button 
                onClick={onStart}
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-900/50 transition-transform hover:scale-[1.02]"
              >
                Оформить подписку
              </button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              Остались вопросы? <button onClick={onBack} className="text-blue-600 hover:underline">Свяжитесь с нами</button>
            </p>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-8 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
          <div className="flex items-center gap-2">
             <span className="font-bold text-slate-700 dark:text-slate-300">Get Smart Log</span>
             <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;