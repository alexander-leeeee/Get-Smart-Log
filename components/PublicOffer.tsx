import React, { useState } from 'react';
import { Mail, Send, Menu, X, Sun, Moon } from 'lucide-react';

interface PublicOfferProps {
  onBack: () => void;
  onStart: () => void;
  onNavigateToContacts: () => void;
  onNavigateToPricing: () => void;
  onNavigateToBlog: () => void;
  onNavigateToPrivacyPolicy: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const PublicOffer: React.FC<PublicOfferProps> = ({ 
  onBack, onStart, onNavigateToContacts, onNavigateToPricing, 
  onNavigateToBlog, onNavigateToPrivacyPolicy, isDarkMode, toggleTheme 
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
              Публичная оферта
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p>
              Настоящий документ является официальным предложением (публичной офертой) сервиса <strong>Get Smart Log</strong> (далее — «Исполнитель») и содержит все существенные условия предоставления услуг любому физическому или юридическому лицу (далее — «Заказчик»).
            </p>

            <h3>1. Общие положения</h3>
            <p>
              1.1. В соответствии со статьей 437 Гражданского Кодекса Российской Федерации (ГК РФ) данный документ является публичной офертой. Акцептом оферты является факт регистрации на сайте сервиса или оплата услуг.
            </p>
            <p>
              1.2. Исполнитель оставляет за собой право вносить изменения в настоящую Оферту без предварительного уведомления Заказчика. Новая редакция вступает в силу с момента ее размещения на сайте.
            </p>

            <h3>2. Предмет оферты</h3>
            <p>
              2.1. Исполнитель обязуется предоставить Заказчику доступ к программному обеспечению «Get Smart Log» для ведения торгового дневника и анализа сделок, а Заказчик обязуется оплатить эти услуги в соответствии с выбранным тарифом.
            </p>

            <h3>3. Права и обязанности сторон</h3>
            <p>
              3.1. Исполнитель обязуется обеспечивать работоспособность сервиса 24/7, за исключением времени проведения технических работ.
            </p>
            <p>
              3.2. Заказчик обязуется не использовать сервис для противоправных действий и не передавать доступ к своему аккаунту третьим лицам.
            </p>

            <h3>4. Стоимость услуг и порядок расчетов</h3>
            <p>
              4.1. Стоимость услуг определяется в соответствии с тарифами, опубликованными на странице «Цены».
            </p>
            <p>
              4.2. Оплата производится в безналичном порядке. Услуга считается оказанной в момент предоставления доступа к расширенному функционалу.
            </p>

            <h3>5. Ответственность сторон</h3>
            <p>
              5.1. Исполнитель не несет ответственности за финансовые убытки Заказчика, понесенные в результате торговой деятельности. Сервис носит исключительно информационный и аналитический характер.
            </p>
            <p>
              5.2. Заказчик самостоятельно принимает решения о совершении сделок на финансовых рынках.
            </p>

            <h3>6. Заключительные положения</h3>
            <p>
              6.1. Все споры и разногласия решаются путем переговоров. В случае невозможности достижения соглашения спор передается на рассмотрение в суд по месту нахождения Исполнителя.
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
                    className="text-slate-500 dark:text-slate-400 font-semibold text-blue-600 dark:text-blue-400 cursor-default text-left"
                  >
                    Публичная оферта
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onNavigateToPrivacyPolicy}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
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

export default PublicOffer;