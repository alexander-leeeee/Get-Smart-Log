
import { Language } from '../types';

export const translations = {
  ru: {
    nav: {
      home: "Главная",
      pricing: "Цены",
      blog: "Блог",
      contacts: "Контакты",
      login: "Войти",
      cabinet: "Войти в кабинет",
      start: "Начать бесплатно",
      docs: "Документы",
      offer: "Публичная оферта",
      privacy: "Политика конфиденциальности",
      map: "Карта сайта",
      menu: "Меню",
      contactUs: "Свяжитесь с нами"
    },
    sidebar: {
       home: "Главная",
       dashboard: "Дашборд",
       journal: "Дневник",
       risk: "Риск-менеджер",
       ai: "ИИ Анализ",
       api: "API Ключи",
       settings: "Настройки",
       logout: "Выйти",
       themeLight: "Светлая тема",
       themeDark: "Темная тема",
       language: "Язык: RU"
    },
    exchange: {
      title: "Подключение Бирж",
      subtitle: "Управляйте API ключами для автоматической синхронизации сделок.",
      addTitle: "Добавить подключение",
      selectExchange: "Выберите биржу",
      nameLabel: "Название (метка)",
      namePlaceholder: "Основной счет",
      apiKeyLabel: "API Key (Публичный ключ)",
      apiKeyPlaceholder: "Вставьте ваш API Key",
      secretKeyLabel: "Secret Key (Секретный ключ)",
      secretKeyPlaceholder: "Вставьте ваш Secret Key",
      addButton: "Подключить",
      connectedTitle: "Подключенные биржи",
      noConnections: "Нет активных подключений",
      delete: "Удалить",
      securityNote: "Ключи хранятся локально в вашем браузере. Мы рекомендуем использовать права «Только чтение» (Read Only)."
    },
    common: {
      rights: "Все права защищены.",
      support: "Поддержка",
      readMore: "Подробнее...",
      readArticle: "Читать статью",
      backToList: "К списку статей",
      back: "Назад",
      send: "Отправить"
    },
    landing: {
      heroTitle: "Торгуйте разумно \n с поддержкой ИИ",
      heroSubtitle: "Ваш персональный торговый хаб: профессиональный дневник, умный риск-менеджмент и анализ сделок с помощью Gemini AI.",
      seoTitle: "Систематизируйте успех с передовыми инструментами",
      seoText: "Get Smart Log — это не просто журнал сделок, это комплексная экосистема для трейдеров любого уровня. Наша платформа помогает выявлять паттерны в вашем поведении.",
      seoList1: "Глубокая аналитика каждой сделки для понимания ваших сильных сторон.",
      seoList2: "Интеграция с искусственным интеллектом Gemini для второго мнения.",
      seoList3: "Полная конфиденциальность ваших данных и безопасность стратегий.",
      aiAssistant: "ИИ Торговый Ассистент",
      features: {
        journal: { title: "Торговый Дневник", desc: "Записывайте каждую сделку. Анализируйте входы и выходы." },
        risk: { title: "Риск-Менеджер", desc: "Контролируйте риски и сохраняйте депозит с умным калькулятором." },
        ai: { title: "AI Аналитик", desc: "Получайте объективную критику сделок от Gemini AI." },
        chart: { title: "Графики доходности", desc: "Визуализируйте прогресс с интерактивными графиками PnL." },
        exchanges: { title: "Все биржи", desc: "Поддержка Binance, Bybit, OKX и других платформ." },
        mobile: { title: "Адаптивность", desc: "Полный функционал на компьютере, планшете и смартфоне." }
      },
      faqTitle: "Часто задаваемые вопросы"
    },
    pricing: {
      title: "Инвестируйте в свою дисциплину",
      subtitle: "Начните бесплатно. Масштабируйтесь, когда будете готовы.",
      start: {
        title: "Старт",
        desc: "Идеально для знакомства с платформой.",
        price: "$0",
        period: "/ навсегда",
        features: [
          "Безлимитное кол-во сделок",
          "Базовый торговый дневник",
          "Калькулятор риска",
          "Дашборд статистики"
        ],
        unavailable: [
          "Риск-менеджер",
          "AI Анализ сделок",
          "Психологическая AI поддержка",
          "Приоритетная поддержка"
        ]
      },
      pro: {
        title: "Pro Trader",
        desc: "Полный доступ ко всем инструментам.",
        price: "$20",
        period: "/ месяц",
        features: [
          "Все функции тарифа Старт",
          "Риск-менеджер",
          "AI Анализ сделок",
          "Психологическая AI поддержка",
          "Приоритетная поддержка"
        ],
        button: "Оформить подписку"
      }
    },
    contacts: {
      title: "Свяжитесь с нами",
      subtitle: "Мы всегда рады помочь. Выберите удобный способ связи.",
      infoTitle: "Наши контакты",
      emailDesc: "Для общих вопросов",
      tgDesc: "Быстрая связь",
      hoursTitle: "Часы работы",
      formTitle: "Напишите нам",
      name: "Ваше имя",
      email: "Email",
      topic: "Тема",
      message: "Сообщение",
      submit: "Отправить сообщение"
    }
  },
  en: {
    nav: {
      home: "Home",
      pricing: "Pricing",
      blog: "Blog",
      contacts: "Contacts",
      login: "Login",
      cabinet: "Enter Cabinet",
      start: "Start for Free",
      docs: "Documents",
      offer: "Public Offer",
      privacy: "Privacy Policy",
      map: "Site Map",
      menu: "Menu",
      contactUs: "Contact Us"
    },
    sidebar: {
       home: "Home",
       dashboard: "Dashboard",
       journal: "Journal",
       risk: "Risk Manager",
       ai: "AI Analysis",
       api: "API Keys",
       settings: "Settings",
       logout: "Logout",
       themeLight: "Light Theme",
       themeDark: "Dark Theme",
       language: "Language: EN"
    },
    exchange: {
      title: "Exchange Connections",
      subtitle: "Manage API keys for automatic trade synchronization.",
      addTitle: "Add Connection",
      selectExchange: "Select Exchange",
      nameLabel: "Name (Label)",
      namePlaceholder: "Main Account",
      apiKeyLabel: "API Key",
      apiKeyPlaceholder: "Paste your API Key",
      secretKeyLabel: "Secret Key",
      secretKeyPlaceholder: "Paste your Secret Key",
      addButton: "Connect",
      connectedTitle: "Connected Exchanges",
      noConnections: "No active connections",
      delete: "Delete",
      securityNote: "Keys are stored locally in your browser. We recommend using \"Read Only\" permissions for API keys."
    },
    common: {
      rights: "All rights reserved.",
      support: "Support",
      readMore: "Read more...",
      readArticle: "Read article",
      backToList: "Back to list",
      back: "Back",
      send: "Send"
    },
    landing: {
      heroTitle: "Trade Smart \n with AI Support",
      heroSubtitle: "Your personal trading hub: professional journal, smart risk management, and trade analysis powered by Gemini AI.",
      seoTitle: "Systematize Success with Advanced Tools",
      seoText: "Get Smart Log is not just a trade journal, it's a complete ecosystem for traders of all levels. Our platform helps identify patterns in your behavior.",
      seoList1: "Deep analytics of every trade to understand your strengths.",
      seoList2: "Integration with Gemini AI for a second opinion.",
      seoList3: "Complete data privacy and strategy security.",
      aiAssistant: "AI Trading Assistant",
      features: {
        journal: { title: "Trading Journal", desc: "Record every trade. Analyze entries and exits." },
        risk: { title: "Risk Manager", desc: "Control risks and preserve capital with our smart calculator." },
        ai: { title: "AI Analyst", desc: "Get objective trade criticism from Gemini AI." },
        chart: { title: "Performance Charts", desc: "Visualize progress with interactive PnL charts." },
        exchanges: { title: "All Exchanges", desc: "Support for Binance, Bybit, OKX, and others." },
        mobile: { title: "Responsive", desc: "Full functionality on desktop, tablet, and mobile." }
      },
      faqTitle: "Frequently Asked Questions"
    },
    pricing: {
      title: "Invest in Your Discipline",
      subtitle: "Start for free. Scale when you are ready for professional growth.",
      start: {
        title: "Start",
        desc: "Perfect for getting to know the platform.",
        price: "$0",
        period: "/ forever",
        features: [
          "Unlimited trades",
          "Basic trading journal",
          "Risk calculator",
          "Statistics dashboard"
        ],
        unavailable: [
          "Risk Manager",
          "AI Trade Analysis",
          "AI Psychology Support",
          "Priority Support"
        ]
      },
      pro: {
        title: "Pro Trader",
        desc: "Full access to all professional tools.",
        price: "$20",
        period: "/ month",
        features: [
          "All Start plan features",
          "Risk Manager",
          "AI Trade Analysis",
          "AI Psychology Support",
          "Priority Support"
        ],
        button: "Subscribe"
      }
    },
    contacts: {
      title: "Contact Us",
      subtitle: "We are always happy to help. Choose a convenient way to reach us.",
      infoTitle: "Contact Info",
      emailDesc: "For general inquiries",
      tgDesc: "Fast response",
      hoursTitle: "Support Hours",
      formTitle: "Write to Us",
      name: "Your Name",
      email: "Email",
      topic: "Subject",
      message: "Message",
      submit: "Send Message"
    }
  },
  ua: {
    nav: {
      home: "Головна",
      pricing: "Ціни",
      blog: "Блог",
      contacts: "Контакти",
      login: "Увійти",
      cabinet: "Увійти в кабінет",
      start: "Почати безкоштовно",
      docs: "Документи",
      offer: "Публічна оферта",
      privacy: "Політика конфіденційності",
      map: "Карта сайту",
      menu: "Меню",
      contactUs: "Зв'яжіться з нами"
    },
    sidebar: {
       home: "Головна",
       dashboard: "Дашборд",
       journal: "Щоденник",
       risk: "Ризик-менеджер",
       ai: "ШІ Аналіз",
       api: "API Ключі",
       settings: "Налаштування",
       logout: "Вийти",
       themeLight: "Світла тема",
       themeDark: "Темна тема",
       language: "Мова: UA"
    },
    exchange: {
      title: "Підключення Бірж",
      subtitle: "Керуйте API ключами для автоматичної синхронізації угод.",
      addTitle: "Додати підключення",
      selectExchange: "Оберіть біржу",
      nameLabel: "Назва (мітка)",
      namePlaceholder: "Основний рахунок",
      apiKeyLabel: "API Key (Публічний ключ)",
      apiKeyPlaceholder: "Вставте ваш API Key",
      secretKeyLabel: "Secret Key (Секретний ключ)",
      secretKeyPlaceholder: "Вставте ваш Secret Key",
      addButton: "Підключити",
      connectedTitle: "Підключені біржі",
      noConnections: "Немає активних підключень",
      delete: "Видалити",
      securityNote: "Ключі зберігаються локально у вашому браузері. Ми рекомендуємо використовувати права «Тільки читання» (Read Only)."
    },
    common: {
      rights: "Всі права захищені.",
      support: "Підтримка",
      readMore: "Детальніше...",
      readArticle: "Читати статтю",
      backToList: "До списку статей",
      back: "Назад",
      send: "Надіслати"
    },
    landing: {
      heroTitle: "Торгуйте розумно \n з підтримкою ШІ",
      heroSubtitle: "Ваш персональный торговий хаб: професійний щоденник, розумний ризик-менеджмент та аналіз угод за допомогою Gemini AI.",
      seoTitle: "Систематизуйте успіх з передовими інструментами",
      seoText: "Get Smart Log — це не просто журнал угод, це комплексна екосистема для трейдерів будь-якого рівня. Наша платформа допомагає виявляти патерни у вашій поведінці.",
      seoList1: "Глибока аналітика кожної угоди для розуміння ваших сильних сторін.",
      seoList2: "Інтеграція зі штучним інтелектом Gemini для другої думки.",
      seoList3: "Повна конфіденційність ваших даних та безпека стратегій.",
      aiAssistant: "ШІ Торговий Асистент",
      features: {
        journal: { title: "Торговий Щоденник", desc: "Записуйте кожну угоду. Аналізуйте входи та виходи." },
        risk: { title: "Ризик-Менеджер", desc: "Контролюйте ризики та зберігайте депозит з розумним калькулятором." },
        ai: { title: "ШІ Аналітик", desc: "Отримуйте об'єктивну критику угод від Gemini AI." },
        chart: { title: "Графіки прибутковості", desc: "Візуалізуйте прогрес з інтерактивними графіками PnL." },
        exchanges: { title: "Всі біржі", desc: "Підтримка Binance, Bybit, OKX та інших платформ." },
        mobile: { title: "Адаптивність", desc: "Повний функціонал на комп'ютері, планшеті та смартфоні." }
      },
      faqTitle: "Часті запитання"
    },
    pricing: {
      title: "Інвестуйте у свою дисципліну",
      subtitle: "Почніть безкоштовно. Масштабуйтесь, коли будете готові.",
      start: {
        title: "Старт",
        desc: "Ідеально для знайомства з платформою.",
        price: "$0",
        period: "/ назавжди",
        features: [
          "Безлімітна к-сть угод",
          "Базовий торговий щоденник",
          "Калькулятор ризику",
          "Дашборд статистики"
        ],
        unavailable: [
          "Ризик-менеджер",
          "ШІ Аналіз угод",
          "Психологічна ШІ підтримка",
          "Пріоритетна підтримка"
        ]
      },
      pro: {
        title: "Pro Trader",
        desc: "Повний доступ до всіх інструментів.",
        price: "$20",
        period: "/ місяць",
        features: [
          "Всі функції тарифу Старт",
          "Ризик-менеджер",
          "ШІ Аналіз угод",
          "Психологічна ШІ підтримка",
          "Пріоритетна підтримка"
        ],
        button: "Оформити підписку"
      }
    },
    contacts: {
      title: "Зв'яжіться з нами",
      subtitle: "Ми завжди раді допомогти. Оберіть зручний спосіб зв'язку.",
      infoTitle: "Наші контакти",
      emailDesc: "Для загальних питань",
      tgDesc: "Швидкий зв'язок",
      hoursTitle: "Години роботи",
      formTitle: "Напишіть нам",
      name: "Ваше ім'я",
      email: "Email",
      topic: "Тема",
      message: "Повідомлення",
      submit: "Надіслати повідомлення"
    }
  }
};
