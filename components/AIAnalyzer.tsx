
import React, { useState } from 'react';
import { askGeneralTradingQuestion } from '../services/geminiService';
import { Send, Bot, BrainCircuit, Activity } from 'lucide-react';
import { MarketType } from '../types';

interface AIAnalyzerProps {
  marketType: MarketType;
}

const AIAnalyzer: React.FC<AIAnalyzerProps> = ({ marketType }) => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiProvider, setAiProvider] = useState<'GEMINI' | 'GPT'>('GEMINI');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Add context to the question
    const contextQuery = `[Контекст: Рынок ${marketType}] ${userMsg}`;
    const aiResponse = await askGeneralTradingQuestion(contextQuery, aiProvider);
    
    setChatHistory(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center gap-3 transition-colors">
        <div className="bg-purple-100 dark:bg-purple-600/20 p-2 rounded-lg">
           <Bot className="text-purple-600 dark:text-purple-400" size={24} />
        </div>
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            AI Ассистент
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{marketType}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Powered by {aiProvider === 'GEMINI' ? 'Gemini 1.5 Flash' : 'GPT-4o'}
          </p>
        </div>
      </div>

      <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-center transition-colors">
        <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button 
            onClick={() => setAiProvider('GEMINI')}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              aiProvider === 'GEMINI' 
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <BrainCircuit size={14} /> Gemini
          </button>
          <button 
            onClick={() => setAiProvider('GPT')}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              aiProvider === 'GPT' 
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Activity size={14} /> ChatGPT
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-slate-900 transition-colors">
        {chatHistory.length === 0 && (
          <div className="text-center text-slate-400 dark:text-slate-500 mt-10">
            <Bot size={48} className="mx-auto mb-4 opacity-20" />
            <p>Задайте вопрос о стратегии, психологии или анализе рынка {marketType}.</p>
          </div>
        )}
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-xl p-3 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700'
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 rounded-bl-none border border-slate-200 dark:border-slate-700">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Спросите о ${marketType} трейдинге...`}
            className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <button 
            type="submit" 
            disabled={loading || !query.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAnalyzer;
