import React, { useState } from 'react';
import { Mail, Send, Menu, X, Sun, Moon } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
  onStart: () => void;
  onNavigateToContacts: () => void;
  onNavigateToPricing: () => void;
  onNavigateToBlog: () => void;
  onNavigateToPublicOffer: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ 
  onBack, onStart, onNavigateToContacts, onNavigateToPricing, 
  onNavigateToBlog, onNavigateToPublicOffer, isDarkMode, toggleTheme 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                onClick={() => {
                  setIsMenuOpen(false);
                  onNavigateToBlog();
                }}
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">
              Политика конфиденциальности
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p>
              Администрация сервиса «Get Smart Log» (далее — «Сервис») с уважением относится к правам посетителей сервиса. Мы безоговорочно признаем важность конфиденциальности личной информации посетителей нашего сервиса.
            </p>

            <h3>1. Сбор информации</h3>
            <p>
              1.1. Мы собираем только ту персональную информацию, которую вы предоставляете нам добровольно при регистрации: адрес электронной почты, имя пользователя и зашифрованный пароль.
            </p>
            <p>
              1.2. Мы также можем собирать обезличенные данные о посещении сайта (cookie) для улучшения работы сервиса.
            </p>

            <h3>2. Использование информации</h3>
            <p>
              2.1. Ваша личная информация используется исключительно для обеспечения доступа к функционалу сервиса, восстановления пароля и уведомления о важных обновлениях.
            </p>
            <p>
              2.2. Данные о ваших торговых операциях (журнал сделок) хранятся в защищенном виде и не передаются третьим лицам.
            </p>

            <h3>3. Защита данных</h3>
            <p>
              3.1. Мы принимаем все необходимые организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа.
            </p>

            <h3>4. Передача данных третьим лицам</h3>
            <p>
              4.1. Мы не раскрываем вашу личную информацию третьим компаниям, организациям или частным лицам, если это не требуется по закону.
            </p>
            <p>
              4.2. Для обработки платежей могут использоваться сторонние платежные системы, политика конфиденциальности которых может отличаться от нашей.
            </p>

            <h3>5. Изменения в политике конфиденциальности</h3>
            <p>
              5.1. Мы оставляем за собой право обновлять нашу политику конфиденциальности. Новая версия политики вступает в силу с момента ее размещения.
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
                    onClick={onNavigateToBlog}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
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
                <li>
                  <button 
                    onClick={onNavigateToPublicOffer}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                  >
                    Публичная оферта
                  </button>
                </li>
                <li>
                  <button 
                    className="text-slate-500 dark:text-slate-400 font-semibold text-blue-600 dark:text-blue-400 cursor-default text-left"
                  >
                    Политика конфиденциальности
                  </button>
                </li>
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

export default PrivacyPolicy;