import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, Calculator, BrainCircuit, ArrowRight, CheckCircle2, TrendingUp, Menu, X, Mail, Send, LineChart, Globe, Smartphone, HelpCircle, Sun, Moon, Languages } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface LandingPageProps {
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
  toggleLanguage: () => void; // Keep for interface compatibility if needed, but unused
}

const LandingPage: React.FC<LandingPageProps> = ({ 
  onStart, 
  onNavigateToContacts, 
  onNavigateToPricing, 
  onNavigateToBlog,
  onNavigateToPublicOffer,
  onNavigateToPrivacyPolicy,
  isDarkMode,
  toggleTheme,
  language,
  setLanguage
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];

  const getFaqData = () => {
    if (language === 'ru') {
      return [
        { q: "Можно ли пользоваться бесплатно?", a: "Да, базовый функционал доступен бесплатно. Вы можете вести дневник и пользоваться калькулятором риска без ограничений." },
        { q: "Какие рынки поддерживаются?", a: "Get Smart Log универсален. Вы можете записывать сделки с криптовалютных бирж, Форекса или фондового рынка." },
        { q: "Безопасны ли мои данные?", a: "Мы серьезно относимся к безопасности. Ваши торговые данные хранятся в зашифрованном виде и не передаются третьим лицам." },
        { q: "Как работает ИИ-анализ?", a: "Мы используем Gemini AI для анализа ваших записей. Он оценивает технические и психологические аспекты сделки, давая советы." }
      ];
    } else if (language === 'ua') {
      return [
        { q: "Чи можна користуватися безкоштовно?", a: "Так, базовий функціонал доступний безкоштовно. Ви можете вести щоденник та користуватися калькулятором ризику без обмежень." },
        { q: "Які ринки підтримуються?", a: "Get Smart Log універсальний. Ви можете записувати угоди з криптовалютних бірж, Форексу або фондового ринку." },
        { q: "Чи безпечні мої дані?", a: "Ми серйозно ставимося до безпеки. Ваші торгові дані зберігаються в зашифрованому вигляді і не передаються третім особам." },
        { q: "Як працює ШІ-аналіз?", a: "Ми використовуємо Gemini AI для аналізу ваших записів. Він оцінює технічні та психологічні аспекти угоди, даючи поради." }
      ];
    } else {
      return [
        { q: "Is it free to use?", a: "Yes, basic features are free. You can use the journal and risk calculator without limits." },
        { q: "Which markets are supported?", a: "Get Smart Log is universal. You can record trades from Crypto, Forex, or Stock markets." },
        { q: "Is my data safe?", a: "We take security seriously. Your trading data is encrypted and never shared with third parties." },
        { q: "How does AI analysis work?", a: "We use Gemini AI to analyze your entries. It evaluates technical and psychological aspects to give advice." }
      ];
    }
  };

  const faqData = getFaqData();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-blue-500 selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-800 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
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
                aria-label={isDarkMode ? t.sidebar.themeLight : t.sidebar.themeDark}
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
              <a 
                href="#" 
                className="text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.home}
              </a>
              <button 
                className="text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigateToPricing();
                }}
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
                  onStart();
                  setIsMenuOpen(false);
                }}
                className="w-full max-w-md mx-auto block py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
              >
                {t.nav.cabinet}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8">
            <TrendingUp size={16} />
            <span>{t.landing.aiAssistant}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 whitespace-pre-line">
            {t.landing.heroTitle}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.landing.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
            >
              {t.nav.start} <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* SEO Section */}
      <section id="seo-section" className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                {t.landing.seoTitle}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {t.landing.seoText}
              </p>
              <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                <li className="flex gap-3">
                  <div className="mt-1 min-w-[20px]"><CheckCircle2 className="text-blue-500" size={20} /></div>
                  <p>{t.landing.seoList1}</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 min-w-[20px]"><CheckCircle2 className="text-blue-500" size={20} /></div>
                  <p>{t.landing.seoList2}</p>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 min-w-[20px]"><CheckCircle2 className="text-blue-500" size={20} /></div>
                  <p>{t.landing.seoList3}</p>
                </li>
              </ul>
              <div className="pt-6">
                <a
                  href="#features"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-lg shadow-blue-600/20"
                >
                  {t.common.readMore}
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xl">
                 <img 
                   src="https://placehold.co/800x600/1e293b/FFF?text=Dashboard+Preview" 
                   alt="Get Smart Log" 
                   className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.landing.features.journal.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{t.landing.features.journal.desc}</p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                <Calculator size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.landing.features.risk.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{t.landing.features.risk.desc}</p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6">
                <BrainCircuit size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.landing.features.ai.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{t.landing.features.ai.desc}</p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center mb-6">
                <LineChart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.landing.features.chart.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{t.landing.features.chart.desc}</p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-xl flex items-center justify-center mb-6">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.landing.features.exchanges.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{t.landing.features.exchanges.desc}</p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-500/50 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-xl flex items-center justify-center mb-6">
                <Smartphone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.landing.features.mobile.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{t.landing.features.mobile.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <HelpCircle size={16} />
              <span>FAQ</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t.landing.faqTitle}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqData.map((item, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">{item.q}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t.nav.home}</a></li>
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
            <div className="flex gap-6">
              {/* Social icons could go here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;