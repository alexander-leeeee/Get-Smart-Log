
import React, { useState } from 'react';
import { Trade, TradeDirection } from '../types';
import { Trash2, Wand2, BrainCircuit, FileText, Save, X, UploadCloud } from 'lucide-react';
import { analyzeTradeWithAI } from '../services/geminiService';

interface JournalProps {
  trades: Trade[];
  setTrades: React.Dispatch<React.SetStateAction<Trade[]>>;
}

const Journal: React.FC<JournalProps> = ({ trades, setTrades }) => {
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{id: string, text: string} | null>(null);
  
  // State for note editing
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState<string>('');

  const handleDelete = (id: string) => {
    setTrades(prev => prev.filter(t => t.id !== id));
  };

  const handleAIAnalysis = async (trade: Trade) => {
    setAnalyzingId(trade.id);
    setAnalysisResult(null);
    setEditingNoteId(null); // Close note editor if open
    const result = await analyzeTradeWithAI(trade);
    setAnalysisResult({ id: trade.id, text: result });
    setAnalyzingId(null);
  };

  const startEditingNote = (trade: Trade) => {
    setEditingNoteId(trade.id);
    setNoteContent(trade.notes || '');
    setAnalysisResult(null); // Close analysis if open
  };

  const saveNote = () => {
    if (editingNoteId) {
      setTrades(prev => prev.map(t => 
        t.id === editingNoteId ? { ...t, notes: noteContent } : t
      ));
      setEditingNoteId(null);
      setNoteContent('');
    }
  };

  const cancelEditNote = () => {
    setEditingNoteId(null);
    setNoteContent('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Торговый Дневник</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:scale-105 shadow-sm active:scale-95">
            <UploadCloud size={20} />
            <span className="font-medium text-sm hidden sm:inline">Загрузить историю сделок</span>
        </button>
      </div>

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
                    Сделок пока нет. Подключите биржу в разделе "API Ключи" для автоматической синхронизации.
                  </td>
                </tr>
              ) : (
                trades.map((trade) => (
                  <React.Fragment key={trade.id}>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 text-slate-700 dark:text-slate-300">{trade.date}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-white">{trade.symbol}</div>
                        {trade.notes && (
                          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                            <FileText size={10} className="shrink-0 text-blue-500" />
                            <span className="truncate max-w-[120px]" title={trade.notes}>
                              {trade.notes}
                            </span>
                          </div>
                        )}
                      </td>
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
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => startEditingNote(trade)}
                              className={`p-2 rounded-lg transition-colors ${trade.notes ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/10' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                              title={trade.notes ? "Редактировать заметку" : "Добавить заметку"}
                            >
                              <FileText size={18} />
                            </button>
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
                              title="Удалить сделку"
                            >
                              <Trash2 size={18} />
                            </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Note Editor Row */}
                    {editingNoteId === trade.id && (
                      <tr className="bg-blue-50 dark:bg-blue-900/10 animate-in fade-in slide-in-from-top-2">
                        <td colSpan={8} className="p-4">
                          <div className="bg-white dark:bg-slate-950 p-4 rounded-lg border border-blue-200 dark:border-blue-500/30">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                              <FileText size={16} className="text-blue-500" /> 
                              Заметки трейдера
                            </h4>
                            <textarea
                              value={noteContent}
                              onChange={(e) => setNoteContent(e.target.value)}
                              placeholder="Опишите причины входа, эмоции, ошибки..."
                              className="w-full min-h-[100px] p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white mb-3"
                            />
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={cancelEditNote}
                                className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm font-medium"
                              >
                                <X size={16} /> Отмена
                              </button>
                              <button 
                                onClick={saveNote}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-2 text-sm font-medium"
                              >
                                <Save size={16} /> Сохранить
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}

                    {/* AI Analysis Row */}
                    {analysisResult?.id === trade.id && (
                       <tr className="bg-purple-50 dark:bg-purple-900/10 animate-in fade-in slide-in-from-top-2">
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
