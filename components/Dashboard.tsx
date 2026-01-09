import React from 'react';
import { Trade } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  trades: Trade[];
}

const Dashboard: React.FC<DashboardProps> = ({ trades }) => {
  // Calculate Stats
  const totalTrades = trades.length;
  const totalPnL = trades.reduce((acc, t) => acc + t.pnl, 0);
  const winTrades = trades.filter(t => t.pnl > 0).length;
  const winRate = totalTrades > 0 ? (winTrades / totalTrades) * 100 : 0;
  
  // Prepare Chart Data (Cumulative PnL sorted by date)
  const sortedTrades = [...trades].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  let cumulative = 0;
  const chartData = sortedTrades.map(t => {
    cumulative += t.pnl;
    return {
      date: t.date,
      pnl: cumulative,
      rawPnl: t.pnl
    };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Обзор счета</h2>
      
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">Чистая прибыль</p>
          <p className={`text-3xl font-bold mt-2 ${totalPnL >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
            ${totalPnL.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">Винрейт</p>
          <p className="text-3xl font-bold text-blue-500 dark:text-blue-400 mt-2">{winRate.toFixed(1)}%</p>
          <p className="text-xs text-slate-500 mt-1">{winTrades} из {totalTrades} сделок в плюс</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider">Всего сделок</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{totalTrades}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 h-[400px] shadow-sm transition-colors">
        <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300">Кривая доходности</h3>
        {trades.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{fontSize: 12}} />
              <YAxis stroke="#94a3b8" tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--tw-content-bg)', 
                  borderColor: 'var(--tw-border-color)', 
                  color: 'var(--tw-text-color)' 
                }}
                wrapperClassName="dark:!bg-slate-900 !bg-white !border-slate-200 dark:!border-slate-800 !text-slate-900 dark:!text-white rounded-lg shadow-lg"
              />
              <Line 
                type="monotone" 
                dataKey="pnl" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#3b82f6' }}
                activeDot={{ r: 6, fill: '#60a5fa' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500">
            Нет данных для отображения графика
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;