
import React, { useEffect, useRef, useState } from 'react';
import { MarketType } from '../types';
import { Lock, Loader2, DollarSign, Activity } from 'lucide-react';

interface TradingTerminalProps {
  marketType: MarketType;
  symbol: string;
  isLocked: boolean;
}

const TradingTerminal: React.FC<TradingTerminalProps> = ({ marketType, symbol, isLocked }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('LIMIT');
  const [price, setPrice] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize TradingView Widget
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ''; // Clear previous widget

      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": `BINANCE:${symbol.replace('/', '')}${symbol.includes('USDT') ? '' : 'USDT'}`, // Simple normalization
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "hide_side_toolbar": false,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      });
      containerRef.current.appendChild(script);
    }
  }, [symbol]); // Re-run when symbol changes

  const handlePlaceOrder = async (side: 'BUY' | 'SELL') => {
    if (isLocked) return;
    
    setIsSubmitting(true);
    try {
      // API call simulation
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol,
          side,
          type: orderType,
          price: orderType === 'LIMIT' ? parseFloat(price) : null,
          quantity: parseFloat(amount), // Assuming input is in USDT for demo simplification
          marketType
        })
      });
      
      // Since backend doesn't exist in demo, we just simulate delay
      await new Promise(resolve => setTimeout(resolve, 800));
      alert(`Ордер ${side} ${symbol} успешно отправлен!`);
      setPrice('');
      setAmount('');
    } catch (error) {
      console.error(error);
      alert('Ошибка при отправке ордера (Demo mode)');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Chart Section (70%) */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative min-h-[400px]">
        <div className="h-full w-full" ref={containerRef}></div>
      </div>

      {/* Trading Panel (30%) */}
      <div className="w-full md:w-[320px] lg:w-[380px] flex flex-col gap-4">
        
        {/* Order Form */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 relative overflow-hidden">
          
          {/* Risk Lock Overlay */}
          {isLocked && (
            <div className="absolute inset-0 z-50 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300">
               <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
                  <Lock className="text-red-600 dark:text-red-500" size={48} />
               </div>
               <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-2">
                 ТОРГОВЛЯ ЗАБЛОКИРОВАНА
               </h3>
               <p className="text-slate-600 dark:text-slate-400">
                 Риск-менеджер ограничил открытие новых позиций. Вы достигли лимита убытка или профита на сегодня.
               </p>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="text-blue-500" /> Торговля
            </h2>
            <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              {symbol}
            </span>
          </div>

          {/* Order Type Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-6">
            <button
              onClick={() => setOrderType('LIMIT')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${orderType === 'LIMIT' ? 'bg-white dark:bg-slate-600 shadow text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Limit
            </button>
            <button
              onClick={() => setOrderType('MARKET')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${orderType === 'MARKET' ? 'bg-white dark:bg-slate-600 shadow text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Market
            </button>
          </div>

          <div className="space-y-4">
            {orderType === 'LIMIT' && (
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Цена (USDT)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg pl-4 pr-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-mono"
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Объем (USDT)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg pl-4 pr-10 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-mono"
                  placeholder="0.00"
                />
                <div className="absolute right-3 top-3 text-slate-400">
                  <DollarSign size={16} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                disabled={isLocked || isSubmitting}
                onClick={() => handlePlaceOrder('BUY')}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'BUY / LONG'}
              </button>
              <button
                disabled={isLocked || isSubmitting}
                onClick={() => handlePlaceOrder('SELL')}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'SELL / SHORT'}
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Баланс свободен: <span className="font-mono text-slate-600 dark:text-slate-300 font-bold">5,430.00 USDT</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingTerminal;
