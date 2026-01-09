import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, ChevronRight, User as UserIcon, Tag, Mail, Send, Menu, X, Sun, Moon } from 'lucide-react';

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
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const BLOG_POSTS: BlogPost[] = [
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

const Blog: React.FC<BlogProps> = ({ onBack, onStart, onNavigateToPricing, onNavigateToContacts, isDarkMode, toggleTheme }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                Войти
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
                Главная
              </button>
              <button 
                className="text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigateToPricing();
                }}
              >
                Цены
              </button>
              <button 
                className="text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                Блог
              </button>
              <button 
                className="text-2xl font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigateToContacts();
                }}
              >
                Контакты
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
                Войти в кабинет
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4">
        {selectedPost ? (
          // Single Post View
          <article className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Back button for article view since header is now generic */}
             <div className="mb-6">
                <button 
                  onClick={handleClosePost} 
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ArrowLeft size={18} />
                  <span>К списку статей</span>
                </button>
             </div>

             <div className="mb-8">
               <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-4 font-semibold">
                 <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">{selectedPost.category}</span>
                 <span className="text-slate-400">•</span>
                 <span>{selectedPost.readTime} чтения</span>
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
                  <ArrowLeft size={20} /> Читать другие статьи
                </button>
             </div>
          </article>
        ) : (
          // Post List View
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Торговый Инсайт
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Статьи о психологии, стратегиях и технологиях, которые помогут вам стать системным трейдером.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
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
                      Читать статью <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
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
                Ваш надежный партнер в мире трейдинга. Анализируйте, учитесь и зарабатывайте с помощью передовых технологий.
              </p>
            </div>

            {/* Menu Links */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Меню</h3>
              <ul className="space-y-3">
                <li><button onClick={onBack} className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Главная</button></li>
                <li>
                  <button 
                    onClick={onNavigateToPricing}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                  >
                    Цены
                  </button>
                </li>
                <li>
                  <button 
                    className="text-slate-500 dark:text-slate-400 font-semibold text-blue-600 dark:text-blue-400 cursor-default"
                  >
                    Блог
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onNavigateToContacts}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                  >
                    Контакты
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Документы</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Публичная оферта</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Карта сайта</a></li>
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">Контакты</h3>
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
            <p>&copy; {new Date().getFullYear()} Get Smart Log. Все права защищены.</p>
            <div className="flex gap-6">
              {/* Social icons could go here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;