import React, { useState } from 'react';
import { Trade, TradeDirection } from '../types';
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, Wand2, BrainCircuit } from 'lucide-react';
import { analyzeTradeWithAI } from '../services/geminiService';

interface JournalProps {
  trades: Trade[];
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
}

const Journal: React.FC<JournalProps> = ({ trades, setTrades }) => {
  const [showForm, setShowForm] = useState(false);
  const [newTrade, setNewTrade] = useState<Partial<Trade>>({
    direction: TradeDirection.LONG,
    date: new Date().toISOString().split('T')[0]
  });
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{id: string, text: string} | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTrade(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTrade(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const calculatePnL = () => {
    if (!newTrade.entryPrice || !newTrade.exitPrice || !newTrade.size || !newTrade.direction) return 0;
    const diff = newTrade.exitPrice - newTrade.entryPrice;
    return newTrade.direction === TradeDirection.LONG 
      ? diff * newTrade.size 
      : -diff * newTrade.size;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pnl = calculatePnL();
    const trade: Trade = {
      id: Date.now().toString(),
      symbol: (newTrade.symbol || '').toUpperCase(),
      entryPrice: newTrade.entryPrice || 0,
      exitPrice: newTrade.exitPrice || 0,
      size: newTrade.size || 0,
      direction: newTrade.direction || TradeDirection.LONG,
      date: newTrade.date || new Date().toISOString().split('T')[0],
      notes: newTrade.notes || '',
      pnl: pnl
    };
    
    setTrades(prev => [trade, ...prev]);
    setShowForm(false);
    setNewTrade({ direction: TradeDirection.LONG, date: new Date().toISOString().split('T')[0] });
  };

  const handleDelete = (id: string) => {
    setTrades(prev => prev.filter(t => t.id !== id));
  };

  const handleAIAnalysis = async (trade: Trade) => {
    setAnalyzingId(trade.id);
    setAnalysisResult(null);
    const result = await analyzeTradeWithAI(trade);
    setAnalysisResult({ id: trade.id, text: result });
    setAnalyzingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Торговый Дневник</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          <span>Добавить сделку</span>
        </button>
      </div>

      {/* Add Trade Form Modal/Panel */}
      {showForm && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-4 shadow-sm transition-colors">
          <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-300">Новая сделка</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              required
              name="symbol"
              placeholder="Тикер (BTC, AAPL)"
              className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-slate-900 dark:text-white"
              onChange={handleInputChange}
            />
            <select
              name="direction"
              className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-slate-900 dark:text-white"
              onChange={handleInputChange}
            >
              <option value={TradeDirection.LONG}>Long</option>
              <option value={TradeDirection.SHORT}>Short</option>
            </select>
            <input
              required
              type="number"
              name="entryPrice"
              placeholder="Цена входа"
              className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-slate-900 dark:text-white"
              onChange={handleNumberChange}
            />
             <input
              required
              type="number"
              name="exitPrice"
              placeholder="Цена выхода"
              className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-slate-900 dark:text-white"
              onChange={handleNumberChange}
            />
             <input
              required
              type="number"
              name="size"
              placeholder="Объем"
              className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-slate-900 dark:text-white"
              onChange={handleNumberChange}
            />
            <input
              type="date"
              name="date"
              className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-slate-900 dark:text-white"
              value={newTrade.date}
              onChange={handleInputChange}
            />
            <textarea
              name="notes"
              placeholder="Причины входа, эмоции..."
              className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-3 py-2 text-slate-900 dark:text-white md:col-span-2"
              onChange={handleInputChange}
            />
            <div className="md:col-span-4 flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Trades List */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold">
              <tr>
                <th className="p-4">Дата</th>
                <th className="p-4">Тикер</th>
                <th className="p-4">Напр.</th>
                <th className="p-4">Вход</th>
                <th className="p-4">Выход</th>
                <th className="p-4">Объем</th>
                <th className="p-4">PnL</th>
                <th className="p-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {trades.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    Сделок пока нет. Добавьте первую сделку!
                  </td>
                </tr>
              ) : (
                trades.map((trade) => (
                  <React.Fragment key={trade.id}>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 text-slate-700 dark:text-slate-300">{trade.date}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{trade.symbol}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${trade.direction === TradeDirection.LONG ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                          {trade.direction}
                        </span>
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300">{trade.entryPrice}</td>
                      <td className="p-4 text-slate-700 dark:text-slate-300">{trade.exitPrice}</td>
                      <td className="p-4 text-slate-700 dark:text-slate-300">{trade.size}</td>
                      <td className={`p-4 font-mono font-bold ${trade.pnl >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)} $
                      </td>
                      <td className="p-4 text-right flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleAIAnalysis(trade)}
                          disabled={analyzingId === trade.id}
                          className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/10 rounded-lg transition-colors disabled:opacity-50"
                          title="ИИ Анализ сделки"
                        >
                          {analyzingId === trade.id ? (
                            <div className="w-5 h-5 border-2 border-purple-600 dark:border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Wand2 size={18} />
                          )}
                        </button>
                        <button 
                          onClick={() => handleDelete(trade.id)}
                          className="p-2 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                    {analysisResult?.id === trade.id && (
                       <tr className="bg-purple-50 dark:bg-purple-900/10">
                        <td colSpan={8} className="p-4">
                          <div className="bg-white dark:bg-slate-950 p-4 rounded-lg border border-purple-200 dark:border-purple-500/30">
                            <h4 className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold mb-2">
                              <BrainCircuit size={16} /> Анализ ИИ:
                            </h4>
                            <div className="prose prose-sm max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-line">
                              {analysisResult.text}
                            </div>
                            <button 
                              onClick={() => setAnalysisResult(null)}
                              className="mt-3 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline"
                            >
                              Скрыть анализ
                            </button>
                          </div>
                        </td>
                       </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Journal;