import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, ChevronRight, User as UserIcon, Tag, Mail, Send, Menu, X, Sun, Moon, Languages } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: React.ReactNode;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

interface BlogProps {
  onBack: () => void;
  onStart: () => void;
  onNavigateToPricing: () => void;
  onNavigateToContacts: () => void;
  onNavigateToBlog: () => void;
  onNavigateToPublicOffer: () => void;
  onNavigateToPrivacyPolicy: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const getBlogPosts = (lang: Language): BlogPost[] => {
  if (lang === 'ru') {
    return [
      {
        id: '1',
        title: 'Психология FOMO: Как перестать догонять уходящий поезд',
        excerpt: 'Страх упущенной выгоды (FOMO) — главный враг трейдера. Разбираем биологические причины и техники борьбы с эмоциональными входами.',
        category: 'Психология',
        author: 'Alex Trader',
        date: '15 Окт 2023',
        readTime: '5 мин',
        imageUrl: 'https://placehold.co/800x400/2563eb/ffffff?text=FOMO+Psychology',
        content: (
          <div className="space-y-4">
            <p className="lead text-xl text-slate-600 dark:text-slate-300">
              Вы видите огромную зеленую свечу. График летит вверх. В голове одна мысль: "Сейчас или никогда!". Вы нажимаете кнопку "Купить", и рынок тут же разворачивается. Знакомо?
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Что такое FOMO?</h3>
            <p>
              FOMO (Fear Of Missing Out) — это мощная эмоциональная реакция. В трейдинге она заставляет нас нарушать правила стратегии ради призрачной надежды на быструю прибыль.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Как бороться?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>План превыше всего.</strong> Если ситуации нет в вашем чек-листе, вы не торгуете. Точка.</li>
              <li><strong>Дневник эмоций.</strong> Записывайте свои ощущения перед сделкой. Если там есть "страх упустить", закройте терминал.</li>
              <li><strong>Принятие.</strong> Рынок будет существовать и завтра. Возможностей всегда бесконечно много.</li>
            </ul>
          </div>
        )
      },
      {
        id: '2',
        title: 'Риск-менеджмент: Математика выживания',
        excerpt: 'Почему 90% трейдеров теряют депозит? Потому что они не умеют считать риски. Учимся правильно рассчитывать размер позиции.',
        category: 'Обучение',
        author: 'Risk Manager',
        date: '12 Окт 2023',
        readTime: '7 мин',
        imageUrl: 'https://placehold.co/800x400/059669/ffffff?text=Risk+Management',
        content: (
          <div className="space-y-4">
            <p>
              Трейдинг — это не игра на угадывание, а управление вероятностями. Ваша главная задача — не заработать, а не потерять то, что у вас есть.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Правило 1%</h3>
            <p>
              Золотой стандарт профессионального трейдинга: никогда не рискуйте более чем 1-2% от вашего депозита в одной сделке. Даже серия из 10 убыточных сделок подряд (что бывает редко) лишит вас лишь 10-20% капитала, что вполне реально восстановить.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Risk/Reward Ratio</h3>
            <p>
              Соотношение риска к прибыли должно быть минимум 1:3. Это значит, что на каждый доллар, которым вы рискуете, вы планируете заработать три. При такой математике вы можете быть правы всего в 30% случаев и все равно оставаться в плюсе.
            </p>
          </div>
        )
      },
      {
        id: '3',
        title: 'ИИ в трейдинге: Как Gemini помогает анализировать ошибки',
        excerpt: 'Искусственный интеллект не заменит трейдера, но сделает его лучше. Как использовать нейросети для анализа торгового журнала.',
        category: 'Технологии',
        author: 'GSL Team',
        date: '10 Окт 2023',
        readTime: '4 мин',
        imageUrl: 'https://placehold.co/800x400/7c3aed/ffffff?text=AI+Trading',
        content: (
          <div className="space-y-4">
            <p>
              Мы живем в эпоху ИИ. Gemini и другие модели могут обрабатывать огромные массивы данных быстрее, чем любой человек. В Get Smart Log мы используем это для анализа ваших сделок.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Взгляд со стороны</h3>
            <p>
              Часто мы не видим своих ошибок из-за замыленного взгляда или эго. ИИ беспристрастен. Он укажет на то, что вы систематически рано закрываете прибыльные позиции или пересиживаете убытки.
            </p>
            <p>
              Используйте функцию "AI Анализ" в нашем журнале, чтобы получить объективную оценку каждого трейда.
            </p>
          </div>
        )
      }
    ];
  } else if (lang === 'ua') {
    return [
      {
        id: '1',
        title: 'Психологія FOMO: Як перестати наздоганяти потяг, що йде',
        excerpt: 'Страх втраченої вигоди (FOMO) — головний ворог трейдера. Розбираємо біологічні причини та техніки боротьби з емоційними входами.',
        category: 'Психологія',
        author: 'Alex Trader',
        date: '15 Жов 2023',
        readTime: '5 хв',
        imageUrl: 'https://placehold.co/800x400/2563eb/ffffff?text=FOMO+Psychology',
        content: (
          <div className="space-y-4">
            <p className="lead text-xl text-slate-600 dark:text-slate-300">
              Ви бачите величезну зелену свічку. Графік летить вгору. В голові одна думка: "Зараз або ніколи!". Ви натискаєте кнопку "Купити", і ринок тут же розвертається. Знайомо?
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Що таке FOMO?</h3>
            <p>
              FOMO (Fear Of Missing Out) — це потужна емоційна реакція. У трейдингу вона змушує нас порушувати правила стратегії заради примарної надії на швидкий прибуток.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Як боротися?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>План понад усе.</strong> Якщо ситуації немає у вашому чек-листі, ви не торгуєте. Крапка.</li>
              <li><strong>Щоденник емоцій.</strong> Записуйте свої відчуття перед угодою. Якщо там є "страх упустити", закрийте термінал.</li>
              <li><strong>Прийняття.</strong> Ринок існуватиме і завтра. Можливостей завжди безліч.</li>
            </ul>
          </div>
        )
      },
      {
        id: '2',
        title: 'Ризик-менеджмент: Математика виживання',
        excerpt: 'Чому 90% трейдерів втрачають депозит? Тому що вони не вміють рахувати ризики. Вчимося правильно розраховувати розмір позиції.',
        category: 'Навчання',
        author: 'Risk Manager',
        date: '12 Жов 2023',
        readTime: '7 хв',
        imageUrl: 'https://placehold.co/800x400/059669/ffffff?text=Risk+Management',
        content: (
          <div className="space-y-4">
            <p>
              Трейдинг — це не гра у вгадування, а управління ймовірностями. Ваше головне завдання — не заробити, а не втратити те, що у вас є.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Правило 1%</h3>
            <p>
              Золотий стандарт професійного трейдингу: ніколи не ризикуйте більше ніж 1-2% від вашого депозиту в одній угоді. Навіть серія з 10 збиткових угод поспіль (що буває рідко) позбавить вас лише 10-20% капіталу, що цілком реально відновити.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Risk/Reward Ratio</h3>
            <p>
              Співвідношення ризику до прибутку має бути мінімум 1:3. Це означає, що на кожен долар, яким ви ризикуєте, ви плануєте заробити три. При такій математиці ви можете бути праві лише у 30% випадків і все одно залишатися в плюсі.
            </p>
          </div>
        )
      },
      {
        id: '3',
        title: 'ШІ в трейдингу: Як Gemini допомагає аналізувати помилки',
        excerpt: 'Штучний інтелект не замінить трейдера, але зробить його кращим. Як використовувати нейромережі для аналізу торгового журналу.',
        category: 'Технології',
        author: 'GSL Team',
        date: '10 Жов 2023',
        readTime: '4 хв',
        imageUrl: 'https://placehold.co/800x400/7c3aed/ffffff?text=AI+Trading',
        content: (
          <div className="space-y-4">
            <p>
              Ми живемо в епоху ШІ. Gemini та інші моделі можуть обробляти величезні масиви даних швидше, ніж будь-яка людина. У Get Smart Log ми використовуємо це для аналізу ваших угод.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Погляд з боку</h3>
            <p>
              Часто ми не бачимо своїх помилок через замилений погляд або его. ШІ неупереджений. Він вкаже на те, що ви систематично рано закриваєте прибуткові позиції або пересиджуєте збитки.
            </p>
            <p>
              Використовуйте функцію "ШІ Аналіз" у нашому журналі, щоб отримати об'єктивну оцінку кожного трейду.
            </p>
          </div>
        )
      }
    ];
  } else {
    return [
      {
        id: '1',
        title: 'FOMO Psychology: How to Stop Chasing the Train',
        excerpt: 'Fear Of Missing Out (FOMO) is a trader\'s worst enemy. We analyze the biological causes and techniques to combat emotional entries.',
        category: 'Psychology',
        author: 'Alex Trader',
        date: 'Oct 15, 2023',
        readTime: '5 min',
        imageUrl: 'https://placehold.co/800x400/2563eb/ffffff?text=FOMO+Psychology',
        content: (
          <div className="space-y-4">
            <p className="lead text-xl text-slate-600 dark:text-slate-300">
              You see a massive green candle. The chart is flying up. One thought in your head: "Now or never!". You hit "Buy", and the market immediately reverses. Sound familiar?
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">What is FOMO?</h3>
            <p>
              FOMO (Fear Of Missing Out) is a powerful emotional reaction. In trading, it forces us to break strategy rules for the ghost hope of quick profit.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">How to fight it?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Plan above all.</strong> If the setup isn't in your checklist, you don't trade. Period.</li>
              <li><strong>Emotion Journal.</strong> Record your feelings before a trade. If "fear of missing out" is there, close the terminal.</li>
              <li><strong>Acceptance.</strong> The market will exist tomorrow. Opportunities are always infinite.</li>
            </ul>
          </div>
        )
      },
      {
        id: '2',
        title: 'Risk Management: Survival Mathematics',
        excerpt: 'Why do 90% of traders lose their deposit? Because they can\'t calculate risk. Learn to correctly calculate position size.',
        category: 'Education',
        author: 'Risk Manager',
        date: 'Oct 12, 2023',
        readTime: '7 min',
        imageUrl: 'https://placehold.co/800x400/059669/ffffff?text=Risk+Management',
        content: (
          <div className="space-y-4">
            <p>
              Trading isn't a guessing game, it's probability management. Your main task isn't to earn, but not to lose what you have.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">The 1% Rule</h3>
            <p>
              The golden standard of professional trading: never risk more than 1-2% of your deposit in a single trade. Even a streak of 10 losing trades in a row (which is rare) will only cost you 10-20% of capital, which is recoverable.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Risk/Reward Ratio</h3>
            <p>
              The risk to reward ratio should be at least 1:3. This means for every dollar you risk, you plan to earn three. With this math, you can be right only 30% of the time and still be profitable.
            </p>
          </div>
        )
      },
      {
        id: '3',
        title: 'AI in Trading: How Gemini Helps Analyze Mistakes',
        excerpt: 'Artificial intelligence won\'t replace traders, but it will make them better. How to use neural networks to analyze your trading journal.',
        category: 'Technology',
        author: 'GSL Team',
        date: 'Oct 10, 2023',
        readTime: '4 min',
        imageUrl: 'https://placehold.co/800x400/7c3aed/ffffff?text=AI+Trading',
        content: (
          <div className="space-y-4">
            <p>
              We live in the AI era. Gemini and other models can process massive amounts of data faster than any human. At Get Smart Log, we use this to analyze your trades.
            </p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">An Outside View</h3>
            <p>
              Often we don't see our mistakes due to a blurred gaze or ego. AI is impartial. It will point out that you systematically close profitable positions too early or hold losses too long.
            </p>
            <p>
              Use the "AI Analysis" function in our journal to get an objective assessment of every trade.
            </p>
          </div>
        )
      }
    ];
  }
};

const Blog: React.FC<BlogProps> = ({ 
  onBack, onStart, onNavigateToPricing, onNavigateToContacts, onNavigateToBlog, 
  onNavigateToPublicOffer, onNavigateToPrivacyPolicy, isDarkMode, toggleTheme, language, setLanguage
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];
  
  const posts = getBlogPosts(language);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    window.scrollTo(0, 0);
  };

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
             {/* ... Mobile Menu Items using t.nav ... */}
            <div className="flex flex-col items-center justify-center flex-1 gap-8 p-4">
              <button onClick={() => { setIsMenuOpen(false); onBack(); }} className="text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400">{t.nav.home}</button>
              <button onClick={() => { setIsMenuOpen(false); onNavigateToPricing(); }} className="text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400">{t.nav.pricing}</button>
              <button onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400">{t.nav.blog}</button>
              <button onClick={() => { setIsMenuOpen(false); onNavigateToContacts(); }} className="text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400">{t.nav.contacts}</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4">
        {selectedPost ? (
          // Single Post View
          <article className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Back button */}
             <div className="mb-6">
                <button 
                  onClick={handleClosePost} 
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ArrowLeft size={18} />
                  <span>{t.common.backToList}</span>
                </button>
             </div>

             <div className="mb-8">
               <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-4 font-semibold">
                 <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">{selectedPost.category}</span>
                 <span className="text-slate-400">•</span>
                 <span>{selectedPost.readTime}</span>
               </div>
               <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-slate-900 dark:text-white">
                 {selectedPost.title}
               </h1>
               <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400 text-sm border-b border-slate-200 dark:border-slate-800 pb-8">
                 <div className="flex items-center gap-2">
                   <UserIcon size={16} />
                   <span>{selectedPost.author}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Calendar size={16} />
                   <span>{selectedPost.date}</span>
                 </div>
               </div>
             </div>
             
             <img 
               src={selectedPost.imageUrl} 
               alt={selectedPost.title} 
               className="w-full h-auto rounded-2xl mb-10 shadow-lg"
             />

             <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
               {selectedPost.content}
             </div>

             <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                <button 
                  onClick={handleClosePost}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-2"
                >
                  <ArrowLeft size={20} /> {t.common.backToList}
                </button>
             </div>
          </article>
        ) : (
          // Post List View
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                {language === 'ru' ? 'Торговый Инсайт' : language === 'ua' ? 'Торговий Інсайт' : 'Trading Insight'}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                {language === 'ru' ? 'Статьи о психологии, стратегиях и технологиях.' : language === 'ua' ? 'Статті про психологію, стратегії та технології.' : 'Articles about psychology, strategies, and technologies.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  onClick={() => handlePostClick(post)}
                  className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
                >
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 shadow-sm">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm mt-auto">
                      {t.common.readArticle} <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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

export default Blog;
