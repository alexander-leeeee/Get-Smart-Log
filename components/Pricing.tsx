import React, { useState } from 'react';
import { ArrowLeft, Check, X, Zap, Mail, Send, Menu, Sun, Moon, Languages } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface PricingProps {
  onBack: () => void;
  onStart: () => void;
  onNavigateToContacts: () => void;
  onNavigateToPricing: () => void;
  onNavigateToBlog: () => void;
  onNavigateToPublicOffer: () => void;
  onNavigateToPrivacyPolicy: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const Pricing: React.FC<PricingProps> = ({ 
  onBack, onStart, onNavigateToContacts, onNavigateToPricing, onNavigateToBlog, 
  onNavigateToPublicOffer, onNavigateToPrivacyPolicy, isDarkMode, toggleTheme, language, setLanguage
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-800 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
              <img 
                src="https://placehold.co/100x100/2563eb/ffffff?text=GSL" 
                alt="GSL Logo" 
                className="h-8 w-auto rounded-lg" 
              />
              <span className="text-xl font-bold">Get Smart Log</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={onStart}
                className="hidden md:block text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t.nav.login}
              </button>
              
              {/* Burger Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>

              {/* Language Switcher */}
              <div className="relative group">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="appearance-none bg-transparent font-bold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 py-2 pl-3 pr-8 rounded-lg cursor-pointer outline-none transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <option value="ru" className="bg-white dark:bg-slate-900">RU</option>
                  <option value="ua" className="bg-white dark:bg-slate-900">UA</option>
                  <option value="en" className="bg-white dark:bg-slate-900">EN</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <Languages size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Screen Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 z-40 flex flex-col animate-mobile-menu-slide-down overflow-y-auto">
            <div className="flex flex-col items-center justify-center flex-1 space-y-8 p-8">
              <button 
                className="text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                onClick={() => {
                  setIsMenuOpen(false);
                  onBack();
                }}
              >
                {t.nav.home}
              </button>
              <button 
                className="text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                 {t.nav.pricing}
              </button>
              <button 
                className="text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigateToBlog();
                }}
              >
                {t.nav.blog}
              </button>
              <button 
                className="text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigateToContacts();
                }}
              >
                {t.nav.contacts}
              </button>
            </div>
            
            <div className="p-8 border-t border-slate-100 dark:border-slate-800">
               <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onStart();
                }}
                className="w-full max-w-md mx-auto block py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
              >
                {t.nav.cabinet}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              {t.pricing.title}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {t.pricing.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col relative overflow-hidden">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{t.pricing.start.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">{t.pricing.start.price}</span>
                  <span className="text-slate-500 dark:text-slate-400">{t.pricing.start.period}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 mt-4">
                  {t.pricing.start.desc}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {t.pricing.start.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="text-blue-500 shrink-0" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
                {/* Dynamically render unavailable features */}
                {t.pricing.start.unavailable && t.pricing.start.unavailable.map((feature, i) => (
                  <li key={`unavailable-${i}`} className="flex items-start gap-3 text-slate-400">
                    <X className="shrink-0" size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onStart}
                className="w-full py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t.nav.start}
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl border border-blue-500 p-8 shadow-xl flex flex-col relative overflow-hidden text-white transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                {language === 'en' ? 'RECOMMENDED' : language === 'ua' ? 'РЕКОМЕНДУЄМО' : 'РЕКОМЕНДУЕМ'}
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  {t.pricing.pro.title} <Zap className="text-yellow-400 fill-yellow-400" size={20} />
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">{t.pricing.pro.price}</span>
                  <span className="text-slate-300">{t.pricing.pro.period}</span>
                </div>
                <p className="text-slate-300 mt-4">
                  {t.pricing.pro.desc}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {t.pricing.pro.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="bg-blue-500/20 p-1 rounded-full"><Check className="text-blue-400 shrink-0" size={14} /></div>
                    <span className={i === 0 ? "font-bold" : "text-purple-300 font-bold"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onStart}
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-900/50 transition-transform hover:scale-[1.02]"
              >
                {t.pricing.pro.button}
              </button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              {language === 'en' ? 'Have questions?' : language === 'ua' ? 'Залишились питання?' : 'Остались вопросы?'} <button onClick={onNavigateToContacts} className="text-blue-600 hover:underline">{t.nav.contactUs}</button>
            </p>
          </div>
        </div>
      </main>

      {/* Extended Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img 
                  src="https://placehold.co/100x100/2563eb/ffffff?text=GSL" 
                  alt="GSL Logo" 
                  className="h-8 w-auto rounded-lg" 
                />
                <span className="text-xl font-bold text-slate-900 dark:text-white">Get Smart Log</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                 {language === 'ru' 
                 ? 'Ваш надежный партнер в мире трейдинга. Анализируйте, учитесь и зарабатывайте с помощью передовых технологий.'
                 : language === 'ua'
                 ? 'Ваш надійний партнер у світі трейдингу. Аналізуйте, навчайтеся та заробляйте за допомогою передових технологій.'
                 : 'Your trusted partner in the world of trading. Analyze, learn, and earn with advanced technologies.'}
              </p>
            </div>

            {/* Menu Links */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">{t.nav.menu}</h3>
              <ul className="space-y-3">
                <li><button onClick={onBack} className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.nav.home}</button></li>
                <li>
                  <button 
                    onClick={onNavigateToPricing}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                  >
                     {t.nav.pricing}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onNavigateToBlog}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                  >
                    {t.nav.blog}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onNavigateToContacts}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                  >
                    {t.nav.contacts}
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">{t.nav.docs}</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={onNavigateToPublicOffer}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                  >
                    {t.nav.offer}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onNavigateToPrivacyPolicy}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                  >
                     {t.nav.privacy}
                  </button>
                </li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.nav.map}</a></li>
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">{t.nav.contacts}</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                  <Mail size={16} className="text-blue-500" />
                  <a href="mailto:support@getsmartlog.trade" className="hover:text-blue-600 transition-colors">support@getsmartlog.trade</a>
                </li>
                <li className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                  <Send size={16} className="text-blue-500" />
                  <a href="https://t.me/alexander_leeee" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Telegram</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 dark:text-slate-500">
            <p>&copy; {new Date().getFullYear()} Get Smart Log. {t.common.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;