
import React, { useState, useEffect } from 'react';
import { Trade } from '../types';
import { Shield, AlertTriangle, Lock, Unlock, Save, RefreshCw, AlertOctagon } from 'lucide-react';

interface RiskManagerProps {
  trades: Trade[];
}

interface RiskSettings {
  maxDailyLoss: number;
  maxDailyTrades: number;
  maxRiskPerTradePercent: number;
}

const RiskManager: React.FC<RiskManagerProps> = ({ trades }) => {
  // Load settings from local storage or default
  const [settings, setSettings] = useState<RiskSettings>(() => {
    const saved = localStorage.getItem('tm_risk_settings');
    return saved ? JSON.parse(saved) : {
      maxDailyLoss: 100, // $
      maxDailyTrades: 5,
      maxRiskPerTradePercent: 1
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState<RiskSettings>(settings);

  // Stats for TODAY
  const [dailyStats, setDailyStats] = useState({
    pnl: 0,
    tradesCount: 0,
    isLossLimitBreached: false,
    isTradesLimitBreached: false
  });

  useEffect(() => {
    // Determine "Today" (Using local date string match for simplicity 'YYYY-MM-DD')
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Filter trades for today
    const todaysTrades = trades.filter(t => t.date === todayStr);
    
    const pnl = todaysTrades.reduce((acc, t) => acc + t.pnl, 0);
    const count = todaysTrades.length;

    setDailyStats({
      pnl,
      tradesCount: count,
      isLossLimitBreached: pnl <= -Math.abs(settings.maxDailyLoss),
      isTradesLimitBreached: count >= settings.maxDailyTrades
    });

  }, [trades, settings]);

  const handleSave = () => {
    setSettings(tempSettings);
    localStorage.setItem('tm_risk_settings', JSON.stringify(tempSettings));
    setIsEditing(false);
  };

  const tradingLocked = dailyStats.isLossLimitBreached || dailyStats.isTradesLimitBreached;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="text-blue-600 dark:text-blue-400" />
            Контроль Рисков
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Автоматическое ограничение торговли при достижении лимитов.
          </p>
        </div>
        
        <div className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 ${tradingLocked ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
          {tradingLocked ? <Lock size={20} /> : <Unlock size={20} />}
          {tradingLocked ? 'ТОРГОВЛЯ ЗАПРЕЩЕНА' : 'ТОРГОВЛЯ РАЗРЕШЕНА'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Status Dashboard */}
        <div className="space-y-6">
          {/* Daily PnL Card */}
          <div className={`p-6 rounded-2xl border shadow-sm transition-colors ${dailyStats.isLossLimitBreached ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-slate-500 dark:text-slate-400 font-medium">PnL за сегодня</h3>
                <div className={`text-4xl font-bold mt-1 ${dailyStats.pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {dailyStats.pnl >= 0 ? '+' : ''}{dailyStats.pnl.toFixed(2)} $
                </div>
              </div>
              {dailyStats.isLossLimitBreached && (
                <AlertOctagon className="text-red-500 animate-pulse" size={32} />
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">Лимит убытка:</span>
                <span className="font-mono font-bold text-red-600 dark:text-red-400">-{settings.maxDailyLoss} $</span>
              </div>
              {/* Progress Bar for Loss */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${dailyStats.pnl < 0 ? 'bg-red-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(Math.abs(dailyStats.pnl) / settings.maxDailyLoss * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 text-right">
                {dailyStats.pnl < 0 
                  ? `${Math.min(Math.abs(dailyStats.pnl) / settings.maxDailyLoss * 100, 100).toFixed(0)}% от лимита` 
                  : 'В прибыли'}
              </p>
            </div>
          </div>

          {/* Daily Trades Count Card */}
          <div className={`p-6 rounded-2xl border shadow-sm transition-colors ${dailyStats.isTradesLimitBreached ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/10 dark:border-orange-800' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-slate-500 dark:text-slate-400 font-medium">Сделок за сегодня</h3>
                <div className="text-4xl font-bold mt-1 text-slate-900 dark:text-white">
                  {dailyStats.tradesCount} <span className="text-lg text-slate-400 font-normal">/ {settings.maxDailyTrades}</span>
                </div>
              </div>
               {dailyStats.isTradesLimitBreached && (
                <AlertTriangle className="text-orange-500" size={32} />
              )}
            </div>
             <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${dailyStats.isTradesLimitBreached ? 'bg-orange-500' : 'bg-blue-500'}`}
                  style={{ width: `${Math.min(dailyStats.tradesCount / settings.maxDailyTrades * 100, 100)}%` }}
                ></div>
              </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Настройки лимитов</h3>
            {!isEditing && (
              <button 
                onClick={() => { setTempSettings(settings); setIsEditing(true); }}
                className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline"
              >
                Изменить
              </button>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Макс. дневной убыток ($)
              </label>
              <div className="relative">
                <input
                  type="number"
                  disabled={!isEditing}
                  value={isEditing ? tempSettings.maxDailyLoss : settings.maxDailyLoss}
                  onChange={(e) => setTempSettings({...tempSettings, maxDailyLoss: Math.abs(parseFloat(e.target.value)) || 0})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 pl-10 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                />
                <span className="absolute left-4 top-3.5 text-slate-400 font-bold">$</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Торговля блокируется, если дневной PnL опустится ниже этого значения.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Макс. кол-во сделок в день
              </label>
              <input
                type="number"
                disabled={!isEditing}
                value={isEditing ? tempSettings.maxDailyTrades : settings.maxDailyTrades}
                onChange={(e) => setTempSettings({...tempSettings, maxDailyTrades: Math.abs(parseInt(e.target.value)) || 0})}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              />
               <p className="text-xs text-slate-500 mt-1">Защита от овертрейдинга (тильта).</p>
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
        <div className="bg-red-600 text-white p-6 rounded-2xl shadow-lg animate-bounce duration-1000 flex items-center justify-center gap-4 text-center">
            <Lock size={48} />
            <div>
                <h2 className="text-2xl font-bold uppercase">Лимиты нарушены!</h2>
                <p className="text-red-100">Пожалуйста, закройте терминал и отдохните до завтра. Рынок никуда не денется.</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default RiskManager;
