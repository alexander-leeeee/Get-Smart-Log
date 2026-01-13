
import React, { useState, useEffect } from 'react';
import { Trade } from '../types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Wallet, TrendingUp, TrendingDown, Activity, Percent, Scale, RefreshCw, Link2, Loader2 
} from 'lucide-react';

interface DashboardProps {
  trades: Trade[];
}

const Dashboard: React.FC<DashboardProps> = ({ trades }) => {
  // --- State for Balance (API Source) ---
  const [initialBalance, setInitialBalance] = useState<number>(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(true);

  // --- API Sync Shell ---
  const fetchBalanceFromApi = async () => {
    setIsLoadingBalance(true);
    try {
      // ------------------------------------------------------------------
      // TODO: ЗДЕСЬ ВАШ КОД ДЛЯ ПОЛУЧЕНИЯ БАЛАНСА ПО API
      // Например:
      // const response = await fetch('https://api.exchange.com/v1/balance', { ... });
      // const data = await response.json();
      // const apiValue = data.total_equity;
      // ------------------------------------------------------------------

      // Эмуляция задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Эмуляция данных (или берем старые из памяти, если API еще нет)
      const saved = localStorage.getItem('tm_initial_balance');
      const apiValue = saved ? parseFloat(saved) : 1000; // Mock value

      // Обновляем стейт и сохраняем в LS для Риск-менеджера
      setInitialBalance(apiValue);
      localStorage.setItem('tm_initial_balance', apiValue.toString());

    } catch (error) {
      console.error("Ошибка синхронизации баланса", error);
    } finally {
      setIsLoadingBalance(false);
    }
  };

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    fetchBalanceFromApi();
  }, []);

  // --- Calculations ---
  const totalTrades = trades.length;
  
  // Sort trades by date for correct chart calculation
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Financials
  // Логика: Если API возвращает стартовый депозит, то текущий = старт + PnL.
  // Если API будет возвращать уже текущий Equity, то здесь нужно убрать "+ totalPnL"
  const totalPnL = trades.reduce((acc, t) => acc + t.pnl, 0);
  const currentBalance = initialBalance + totalPnL;

  // Win/Loss Stats
  const winningTrades = trades.filter(t => t.pnl > 0);
  const losingTrades = trades.filter(t => t.pnl <= 0); // Assuming 0 is not a win
  
  const winCount = winningTrades.length;
  const lossCount = losingTrades.length;
  const winRate = totalTrades > 0 ? (winCount / totalTrades) * 100 : 0;

  const grossProfit = winningTrades.reduce((acc, t) => acc + t.pnl, 0);
  const grossLoss = Math.abs(losingTrades.reduce((acc, t) => acc + t.pnl, 0));

  // Advanced Metrics
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 99.9 : 0;
  const avgWin = winCount > 0 ? grossProfit / winCount : 0;
  const avgLoss = lossCount > 0 ? grossLoss / lossCount : 0;
  
  // Mathematical Expectation (per trade)
  const expectancy = (winRate / 100 * avgWin) - ((1 - winRate / 100) * avgLoss);

  // Max Drawdown Calculation
  let maxDrawdown = 0;
  let peakBalance = initialBalance;
  let runningBalance = initialBalance;
  
  // Prepare Chart Data
  const chartData = [{ date: 'Start', balance: initialBalance }];
  
  sortedTrades.forEach(t => {
    runningBalance += t.pnl;
    if (runningBalance > peakBalance) peakBalance = runningBalance;
    
    const drawdown = peakBalance - runningBalance;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;

    chartData.push({
      date: t.date,
      balance: runningBalance
    });
  });

  const maxDrawdownPercent = peakBalance > 0 ? (maxDrawdown / peakBalance) * 100 : 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Обзор счета</h2>
           <p className="text-slate-500 dark:text-slate-400 text-sm">Глубокая аналитика вашей торговой эффективности</p>
        </div>
        
        {/* Balance Card (API SYNCED) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-6 py-3 flex items-center gap-4 shadow-sm relative overflow-hidden">
           {/* Visual Indicator for API Link */}
           <div className="absolute top-2 right-2 flex gap-1">
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-1 rounded-full" title="Синхронизировано по API">
                <Link2 size={12} />
              </div>
           </div>

           <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
             <Wallet size={24} />
           </div>
           
           <div>
             <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold flex items-center gap-2">
                Текущий баланс (API)
                <button 
                  onClick={fetchBalanceFromApi} 
                  disabled={isLoadingBalance}
                  className={`text-slate-400 hover:text-blue-500 transition-all ${isLoadingBalance ? 'animate-spin' : ''}`}
                  title="Обновить данные"
                >
                  <RefreshCw size={12} />
                </button>
             </div>
             
             <div className="flex items-center gap-2 mt-0.5">
               {isLoadingBalance ? (
                 <div className="flex items-center gap-2 text-slate-400">
                    <Loader2 size={20} className="animate-spin" />
                    <span className="text-sm font-medium">Загрузка...</span>
                 </div>
               ) : (
                 <div className="text-2xl font-bold text-slate-900 dark:text-white">
                   ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                 </div>
               )}
             </div>
           </div>
        </div>
      </div>
      
      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* PnL */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={48} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider font-semibold">Чистая прибыль</p>
          <div className="flex items-end gap-2 mt-2">
            <p className={`text-3xl font-bold ${totalPnL >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)} $
            </p>
            <span className={`text-sm font-semibold mb-1 ${totalPnL >= 0 ? 'text-emerald-600/70' : 'text-red-600/70'}`}>
               ({initialBalance > 0 ? ((totalPnL / initialBalance) * 100).toFixed(2) : 0}%)
            </span>
          </div>
        </div>

        {/* Win Rate */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Percent size={48} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider font-semibold">Винрейт</p>
          <p className={`text-3xl font-bold mt-2 ${winRate >= 50 ? 'text-blue-500' : 'text-orange-500'}`}>
            {winRate.toFixed(1)}%
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{width: `${winRate}%`}}></div>
          </div>
        </div>

        {/* Profit Factor */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Scale size={48} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider font-semibold">Профит Фактор</p>
          <p className={`text-3xl font-bold mt-2 ${profitFactor >= 1.5 ? 'text-emerald-500' : profitFactor >= 1 ? 'text-yellow-500' : 'text-red-500'}`}>
            {profitFactor.toFixed(2)}
          </p>
          <p className="text-xs text-slate-400 mt-1">
             Цель: &gt; 1.5
          </p>
        </div>

        {/* Expectancy */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={48} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider font-semibold">Мат. Ожидание</p>
          <p className={`text-3xl font-bold mt-2 ${expectancy > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {expectancy.toFixed(2)} $
          </p>
          <p className="text-xs text-slate-400 mt-1">
             на сделку
          </p>
        </div>
      </div>

      {/* Charts & Secondary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 h-[400px] shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300">Рост депозита</h3>
          {trades.length > 0 ? (
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" tick={{fontSize: 12}} minTickGap={30} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 12}} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--tw-content-bg)', 
                    borderColor: 'var(--tw-border-color)', 
                    color: 'var(--tw-text-color)' 
                  }}
                  wrapperClassName="dark:!bg-slate-900 !bg-white !border-slate-200 dark:!border-slate-800 !text-slate-900 dark:!text-white rounded-lg shadow-lg"
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Баланс']}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500">
              Нет данных для графика. Добавьте сделки в журнал.
            </div>
          )}
        </div>

        {/* Detailed Stats Column */}
        <div className="space-y-6">
           {/* Win/Loss Ratios */}
           <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Детализация</h3>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-slate-500 dark:text-slate-400">Всего сделок</span>
                    <span className="font-bold text-slate-900 dark:text-white">{totalTrades}</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                       <TrendingUp size={16} className="text-emerald-500" />
                       <span className="text-slate-500 dark:text-slate-400">Средняя прибыль</span>
                    </div>
                    <span className="font-bold text-emerald-500">+{avgWin.toFixed(2)} $</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                       <TrendingDown size={16} className="text-red-500" />
                       <span className="text-slate-500 dark:text-slate-400">Средний убыток</span>
                    </div>
                    <span className="font-bold text-red-500">-{avgLoss.toFixed(2)} $</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-slate-500 dark:text-slate-400">Коэф. П/У (Win/Loss)</span>
                    <span className="font-bold text-blue-500">
                      {avgLoss > 0 ? (avgWin / avgLoss).toFixed(2) : '∞'}
                    </span>
                 </div>
                 <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-500 dark:text-slate-400">Макс. просадка</span>
                    <div className="text-right">
                       <div className="font-bold text-red-500">-{maxDrawdown.toFixed(2)} $</div>
                       <div className="text-xs text-slate-400">{maxDrawdownPercent.toFixed(2)}%</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
