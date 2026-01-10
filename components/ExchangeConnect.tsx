
import React, { useState, useEffect } from 'react';
import { ExchangeConnection, Language } from '../types';
import { translations } from '../utils/translations';
import { Plus, Trash2, Key, ShieldCheck, AlertCircle } from 'lucide-react';

interface ExchangeConnectProps {
  language: Language;
  user: User;
}

const ExchangeConnect: React.FC<ExchangeConnectProps> = ({ language, user }) => {
  const t = translations[language].exchange;
  const [connections, setConnections] = useState<ExchangeConnection[]>([]);
  const [form, setForm] = useState({
    exchange: 'Binance',
    name: '',
    apiKey: '',
    secretKey: ''
  });

  // Load connections from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tm_exchange_connections');
    if (saved) {
      setConnections(JSON.parse(saved));
    }
  }, []);

  // Save connections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tm_exchange_connections', JSON.stringify(connections));
  }, [connections]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.apiKey || !form.secretKey) return;

    try {
      const response = await fetch('/api/save-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          apiKey: form.apiKey,
          apiSecret: form.secretKey,
          label: form.name || form.exchange
        }),
      });

      if (response.ok) {
        const newConnection: ExchangeConnection = {
          id: Date.now().toString(),
          exchange: form.exchange as any,
          name: form.name || form.exchange,
          apiKey: form.apiKey,
          createdAt: new Date().toISOString().split('T')[0]
        };

        const updated = [...connections, newConnection];
        setConnections(updated);
        localStorage.setItem('tm_exchange_connections', JSON.stringify(updated));
        setForm({ exchange: 'Binance', name: '', apiKey: '', secretKey: '' });
      } else {
        const errorData = await response.json();
        alert('Ошибка базы: ' + errorData.error);
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка при сохранении ключей');
    }
  };

  const handleSyncHistory = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/sync-trades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id, 
          loadHistory: true 
        }),
      });
      const data = await response.json();
      alert(response.ok ? `Успешно! ${data.message}` : `Ошибка: ${data.error}`);
    } catch (err) {
      alert('Ошибка связи с сервером');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = (id: string) => {
    setConnections(prev => prev.filter(c => c.id !== id));
  };

  const getExchangeColor = (exchange: string) => {
    switch (exchange) {
      case 'Binance': return 'bg-yellow-500';
      case 'Bybit': return 'bg-slate-900';
      case 'OKX': return 'bg-blue-600';
      case 'KuCoin': return 'bg-emerald-500';
      default: return 'bg-purple-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t.title}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Connection Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-4">
            <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="text-blue-500" size={20} />
              {t.addTitle}
            </h3>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.selectExchange}</label>
                <select
                  name="exchange"
                  value={form.exchange}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors appearance-none"
                >
                  <option value="Binance">Binance</option>
                  <option value="Bybit">Bybit</option>
                  <option value="OKX">OKX</option>
                  <option value="KuCoin">KuCoin</option>
                  <option value="Bitget">Bitget</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.nameLabel}</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder={t.namePlaceholder}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.apiKeyLabel}</label>
                <input
                  type="text"
                  name="apiKey"
                  value={form.apiKey}
                  onChange={handleInputChange}
                  required
                  placeholder={t.apiKeyPlaceholder}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.secretKeyLabel}</label>
                <input
                  type="password"
                  name="secretKey"
                  value={form.secretKey}
                  onChange={handleInputChange}
                  required
                  placeholder={t.secretKeyPlaceholder}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-mono text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={18} />
                  {t.addButton}
                </button>
              </div>
              
              <div className="flex gap-2 items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-700 dark:text-blue-300">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p>{t.securityNote}</p>
              </div>
            </form>
          </div>
        </div>

        {/* Connected List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{t.connectedTitle}</h3>
          
          {connections.length === 0 ? (
            <div className="bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-12 text-center">
              <Key size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 dark:text-slate-400">{t.noConnections}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connections.map((conn) => (
                <div key={conn.id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${getExchangeColor(conn.exchange)}`}></div>
                  
                  <div className="flex justify-between items-start mb-4 pl-2">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{conn.exchange}</div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">{conn.name}</h4>
                    </div>
                    <div className={`w-10 h-10 rounded-full ${getExchangeColor(conn.exchange)} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center text-white font-bold text-xl shadow-inner`}>
                      {conn.exchange[0]}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-3 mb-4 font-mono text-xs text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 ml-2">
                    {conn.apiKey.substring(0, 4)}...{conn.apiKey.substring(conn.apiKey.length - 4)}
                  </div>

                  <div className="flex justify-between items-center pl-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs text-slate-400">Added: {conn.createdAt}</span>
                    <button 
                      onClick={() => handleDelete(conn.id)}
                      className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-sm flex items-center gap-1"
                    >
                      <Trash2 size={14} /> {t.delete}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangeConnect;
