
import React, { useState, useEffect } from 'react';
import { Trade, MarketType } from '../types';
import { Shield, Lock, Unlock, Save, AlertOctagon, Target, DollarSign, Percent, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

interface RiskManagerProps {
  trades: Trade[];
  marketType: MarketType;
  totalBalance: number;
}

type LimitType = 'USD' | 'PERCENT';

interface RiskSettings {
  // Убыток
  maxDailyLoss: number;
  dailyLossType: LimitType;
  
  // Прибыль
  maxDailyProfit: number; // 0 = выключено
  dailyProfitType: LimitType;

  // Сделки
  maxDailyTrades: number;
}

const RiskManager: React.FC<RiskManagerProps> = ({ trades, marketType, totalBalance }) => {
  // 1. Используем totalBalance из пропсов (Binance API)
  const [deposit, setDeposit] = useState<number>(totalBalance || 0);

  // Синхронизируем локальный deposit, если totalBalance обновился в App.tsx
  useEffect(() => {
    if (totalBalance > 0) {
      setDeposit(totalBalance);
    }
  }, [totalBalance]);

  // 2. Настройки риск-менеджмента (отдельные для Spot и Futures)
  const settingsKey = `tm_risk_settings_v2_${marketType}`;

  const [settings, setSettings] = useState<RiskSettings>({
      maxDailyLoss: 5,
      dailyLossType: 'PERCENT',
      maxDailyProfit: 0,
      dailyProfitType: 'PERCENT',
      maxDailyTrades: 5,
  });

  // Загрузка настроек при смене рынка
  useEffect(() => {
    const saved = localStorage.getItem(settingsKey);
    if (saved) {
      setSettings(JSON.parse(saved));
    } else {
      // Дефолт
      setSettings({
        maxDailyLoss: 5,
        dailyLossType: 'PERCENT',
        maxDailyProfit: 0,
        dailyProfitType: 'PERCENT',
        maxDailyTrades: 5,
      });
    }
  }, [marketType, settingsKey]);

  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState<RiskSettings>(settings);

  // Синхронизация tempSettings при смене settings (смене рынка)
  useEffect(() => {
    setTempSettings(settings);
    setIsEditing(false);
  }, [settings]);

  // 3. Статистика за сегодня
  const [dailyStats, setDailyStats] = useState({
    pnl: 0,
    tradesCount: 0,
    isLossLimitBreached: false,
    isProfitLimitReached: false,
    isTradesLimitBreached: false,
    lossLimitValueMoney: 0, // Абсолютное значение лимита в $
    profitLimitValueMoney: 0 // Абсолютное значение лимита в $
  });

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todaysTrades = trades.filter(t => t.date === todayStr);
    
    const pnl = todaysTrades.reduce((acc, t) => acc + t.pnl, 0);
    const count = todaysTrades.length;

    // Расчет абсолютных значений лимитов
    const lossLimitMoney = settings.dailyLossType === 'PERCENT' 
      ? (deposit * (settings.maxDailyLoss / 100)) 
      : settings.maxDailyLoss;

    const profitLimitMoney = settings.dailyProfitType === 'PERCENT'
      ? (deposit * (settings.maxDailyProfit / 100))
      : settings.maxDailyProfit;

    setDailyStats({
      pnl,
      tradesCount: count,
      lossLimitValueMoney: lossLimitMoney,
      profitLimitValueMoney: profitLimitMoney,
      // Убыток: PnL меньше или равен отрицательному лимиту
      isLossLimitBreached: pnl <= -Math.abs(lossLimitMoney) && lossLimitMoney > 0,
      // Прибыль: PnL больше или равен лимиту (если лимит задан > 0)
      isProfitLimitReached: settings.maxDailyProfit > 0 && pnl >= profitLimitMoney,
      isTradesLimitBreached: settings.maxDailyTrades > 0 && count >= settings.maxDailyTrades
    });

  }, [trades, settings, deposit]);

  const handleSave = () => {
    setSettings(tempSettings);
    localStorage.setItem(settingsKey, JSON.stringify(tempSettings));
    setIsEditing(false);
  };

  const tradingLocked = dailyStats.isLossLimitBreached || dailyStats.isTradesLimitBreached || dailyStats.isProfitLimitReached;

  // Компонент переключателя типа (USD / %)
  const TypeToggle = ({ type, onChange }: { type: LimitType, onChange: (t: LimitType) => void }) => (
    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 ml-2">
      <button
        type="button"
        onClick={() => onChange('USD')}
        className={`px-3 py-1 rounded-md text-sm font-bold transition-all ${type === 'USD' ? 'bg-white dark:bg-slate-600 shadow text-blue-600 dark:text-blue-400' : 'text-slate-400 hover:text-slate-600'}`}
      >
        <DollarSign size={14} />
      </button>
      <button
        type="button"
        onClick={() => onChange('PERCENT')}
        className={`px-3 py-1 rounded-md text-sm font-bold transition-all ${type === 'PERCENT' ? 'bg-white dark:bg-slate-600 shadow text-blue-600 dark:text-blue-400' : 'text-slate-400 hover:text-slate-600'}`}
      >
        <Percent size={14} />
      </button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="text-blue-600 dark:text-blue-400" />
            Риск-Менеджер ({marketType})
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Баланс: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">${deposit}</span>
          </p>
        </div>
        
        <div className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 border ${tradingLocked 
          ? dailyStats.isProfitLimitReached 
            ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' // Profit Lock
            : 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' // Loss Lock
          : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' // Unlocked
        }`}>
          {tradingLocked ? <Lock size={20} /> : <Unlock size={20} />}
          {tradingLocked 
            ? dailyStats.isProfitLimitReached 
                ? 'ЦЕЛЬ ВЫПОЛНЕНА (STOP)' 
                : 'ТОРГОВЛЯ ОСТАНОВЛЕНА' 
            : 'ТОРГОВЛЯ РАЗРЕШЕНА'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Visual Status */}
        <div className="space-y-6">
          
          {/* 1. Loss Limit Card */}
          <div className={`p-6 rounded-2xl border shadow-sm transition-colors ${dailyStats.isLossLimitBreached ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-wide">Текущий результат ({marketType})</h3>
                <div className={`text-4xl font-bold mt-1 ${dailyStats.pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {dailyStats.pnl >= 0 ? '+' : ''}{dailyStats.pnl.toFixed(2)} $
                </div>
              </div>
              {dailyStats.isLossLimitBreached && <AlertOctagon className="text-red-500 animate-pulse" size={32} />}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Лимит убытка:</span>
                <span className="font-mono font-bold text-red-600 dark:text-red-400">
                  -{dailyStats.lossLimitValueMoney.toFixed(2)} $ 
                  <span className="text-xs text-slate-400 font-normal ml-1">
                     ({settings.dailyLossType === 'PERCENT' ? `${settings.maxDailyLoss}%` : 'FIX'})
                  </span>
                </span>
              </div>
              
              {/* Progress Bar Loss */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden relative">
                {/* Zero Line Marker */}
                <div className="absolute left-0 h-full w-[1px] bg-slate-400 z-10"></div>
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${dailyStats.pnl < 0 ? 'bg-red-500' : 'bg-emerald-500'}`}
                  style={{ width: `${dailyStats.pnl < 0 ? Math.min((Math.abs(dailyStats.pnl) / dailyStats.lossLimitValueMoney) * 100, 100) : 0}%` }}
                ></div>
              </div>
              {dailyStats.pnl < 0 && (
                 <p className="text-xs text-slate-400 text-right">
                    Использовано {((Math.abs(dailyStats.pnl) / dailyStats.lossLimitValueMoney) * 100).toFixed(1)}% лимита риска
                 </p>
              )}
            </div>
          </div>

          {/* 2. Profit Goal Card */}
          {settings.maxDailyProfit > 0 && (
            <div className={`p-6 rounded-2xl border shadow-sm transition-colors ${dailyStats.isProfitLimitReached ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <Target className="text-emerald-500" size={24} />
                    <h3 className="text-slate-500 dark:text-slate-400 font-medium">Цель на день</h3>
                </div>
                {dailyStats.isProfitLimitReached && <ShieldCheck className="text-emerald-500" size={32} />}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Цель:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        +{dailyStats.profitLimitValueMoney.toFixed(2)} $
                        <span className="text-xs text-slate-400 font-normal ml-1">
                            ({settings.dailyProfitType === 'PERCENT' ? `${settings.maxDailyProfit}%` : 'FIX'})
                        </span>
                    </span>
                </div>
                {/* Progress Bar Profit */}
                 <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 bg-emerald-500"
                      style={{ width: `${dailyStats.pnl > 0 ? Math.min((dailyStats.pnl / dailyStats.profitLimitValueMoney) * 100, 100) : 0}%` }}
                    ></div>
                 </div>
                 <p className="text-xs text-slate-400 text-right">
                    {dailyStats.pnl > 0 ? ((dailyStats.pnl / dailyStats.profitLimitValueMoney) * 100).toFixed(1) : 0}% от цели
                 </p>
              </div>
            </div>
          )}

          {/* 3. Trades Count Card */}
          <div className={`p-6 rounded-2xl border shadow-sm transition-colors ${dailyStats.isTradesLimitBreached ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/10 dark:border-orange-800' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-slate-500 dark:text-slate-400 font-medium">Количество сделок</h3>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {dailyStats.tradesCount} <span className="text-lg text-slate-400 font-normal">/ {settings.maxDailyTrades}</span>
              </div>
            </div>
             <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${dailyStats.isTradesLimitBreached ? 'bg-orange-500' : 'bg-blue-500'}`}
                  style={{ width: `${Math.min(dailyStats.tradesCount / settings.maxDailyTrades * 100, 100)}%` }}
                ></div>
              </div>
          </div>
        </div>

        {/* Right Column: Settings Form */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-fit">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Правила остановки</h3>
            {!isEditing && (
              <button 
                onClick={() => { setTempSettings(settings); setIsEditing(true); }}
                className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline"
              >
                Настроить
              </button>
            )}
          </div>

          <div className="space-y-6">
            
            {/* Setting: Max Loss */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <AlertOctagon size={16} className="text-red-500" />
                Остановка при убытке
              </label>
              <div className="flex items-center">
                <div className="relative flex-1">
                    <input
                      type="number"
                      disabled={!isEditing}
                      value={isEditing ? tempSettings.maxDailyLoss : settings.maxDailyLoss}
                      onChange={(e) => setTempSettings({...tempSettings, maxDailyLoss: Math.abs(parseFloat(e.target.value)) || 0})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-colors"
                    />
                </div>
                {isEditing ? (
                  <TypeToggle 
                    type={tempSettings.dailyLossType} 
                    onChange={(t) => setTempSettings({...tempSettings, dailyLossType: t})} 
                  />
                ) : (
                  <span className="ml-3 font-bold text-slate-500 w-8 text-center">
                    {settings.dailyLossType === 'USD' ? '$' : '%'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                 Блокировка при потере {settings.maxDailyLoss}{settings.dailyLossType === 'USD' ? '$' : '%'} за день.
              </p>
            </div>

            {/* Setting: Max Profit */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <Target size={16} className="text-emerald-500" />
                Цель по прибыли (Take Profit)
              </label>
              <div className="flex items-center">
                <div className="relative flex-1">
                    <input
                      type="number"
                      disabled={!isEditing}
                      value={isEditing ? tempSettings.maxDailyProfit : settings.maxDailyProfit}
                      onChange={(e) => setTempSettings({...tempSettings, maxDailyProfit: Math.abs(parseFloat(e.target.value)) || 0})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-colors"
                    />
                </div>
                {isEditing ? (
                   <TypeToggle 
                    type={tempSettings.dailyProfitType} 
                    onChange={(t) => setTempSettings({...tempSettings, dailyProfitType: t})} 
                  />
                ) : (
                   <span className="ml-3 font-bold text-slate-500 w-8 text-center">
                    {settings.dailyProfitType === 'USD' ? '$' : '%'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                 0 = отключить. Остановка для сохранения профита.
              </p>
            </div>

            {/* Setting: Max Trades */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <TrendingUp size={16} className="text-blue-500" />
                Лимит количества сделок
              </label>
              <input
                type="number"
                disabled={!isEditing}
                value={isEditing ? tempSettings.maxDailyTrades : settings.maxDailyTrades}
                onChange={(e) => setTempSettings({...tempSettings, maxDailyTrades: Math.abs(parseInt(e.target.value)) || 0})}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-colors"
              />
               <p className="text-xs text-slate-500 mt-1">Защита от овертрейдинга.</p>
            </div>
            
            {isEditing && (
              <div className="flex gap-3 pt-4 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Сохранить
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {tradingLocked && (
        <div className={`p-6 rounded-2xl shadow-lg animate-bounce duration-1000 flex items-center justify-center gap-4 text-center ${
            dailyStats.isProfitLimitReached 
             ? 'bg-emerald-600 text-white' 
             : 'bg-red-600 text-white'
        }`}>
            {dailyStats.isProfitLimitReached ? <Target size={48} /> : <Lock size={48} />}
            <div>
                <h2 className="text-2xl font-bold uppercase">
                    {dailyStats.isProfitLimitReached ? 'ПЛАН ВЫПОЛНЕН!' : 'ЛИМИТЫ НАРУШЕНЫ!'}
                </h2>
                <p className={`${dailyStats.isProfitLimitReached ? 'text-emerald-100' : 'text-red-100'}`}>
                    {dailyStats.isProfitLimitReached 
                        ? 'Отличная работа. Заберите прибыль и отдохните.' 
                        : 'Пожалуйста, закройте терминал и отдохните до завтра.'}
                </p>
            </div>
        </div>
      )}
    </div>
  );
};

export default RiskManager;
