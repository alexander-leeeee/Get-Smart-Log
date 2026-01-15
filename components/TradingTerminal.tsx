import React, { useEffect, useRef, useState } from 'react';
import { MarketType } from '../types';
import { Lock, Loader2, DollarSign, Activity, Wallet, ShieldAlert } from 'lucide-react';

interface TradingTerminalProps {
  marketType: MarketType;
  symbol: string;
  isLocked: boolean;
  balance: number; // Реальный баланс из App
  user: any;
}

const TradingTerminal: React.FC<TradingTerminalProps> = ({ marketType, symbol, isLocked, balance, user }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('LIMIT');
  const [stopType, setStopType] = useState<'STOP_MARKET' | 'STOP'>('STOP_MARKET'); // Тип стопа
  const [price, setPrice] = useState<string>('');
  const [stopPrice, setStopPrice] = useState<string>(''); // Цена стоп-лосса
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": `BINANCE:${symbol.replace('/', '')}`,
        "interval": "15",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "ru",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_side_toolbar": false, // Включаем инструменты рисования
        "allow_symbol_change": true,
        "container_id": "tradingview_chart"
      });
      containerRef.current.appendChild(script);
    }
  }, [symbol]);

  const handlePlaceOrder = async (direction: 'BUY' | 'SELL') => {
    if (isLocked) return;
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          symbol,
          direction,
          orderType,
          stopType, // Передаем STOP или STOP_MARKET
          price: orderType === 'LIMIT' ? price : null,
          stopPrice,
          amount,
          marketType
        }),
      });
      
      if (!response.ok) throw new Error('Ошибка ордера');
      alert('Ордер успешно размещен!');
    } catch (err) {
      alert('Ошибка при отправке ордера');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-4 bg-slate-950 p-2 text-slate-200">
      {/* ЛЕВАЯ ЧАСТЬ: График */}
      <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
        <div id="tradingview_chart" ref={containerRef} className="h-full w-full" />
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Панель управления */}
      <div className="w-80 flex flex-col gap-4">
        
        {/* РЕАЛЬНЫЙ БАЛАНС (ВВЕРХУ) */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Wallet size={14} /> Доступный баланс
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">{marketType}</span>
          </div>
          <div className="text-xl font-mono font-bold text-emerald-400">
            {balance.toLocaleString()} <span className="text-sm font-normal text-slate-500">₴</span>
          </div>
        </div>

        {/* ТОРГОВАЯ ПАНЕЛЬ */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex-1 relative">
          {isLocked && (
            <div className="absolute inset-0 z-10 bg-slate-950/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-6 text-center">
              <Lock size={40} className="text-red-500 mb-2 animate-pulse" />
              <h3 className="text-red-500 font-bold uppercase mb-2">Торговля заблокирована</h3>
              <p className="text-xs text-slate-400">Лимит потерь или сделок на сегодня исчерпан. Риск-менеджер защищает ваш депозит.</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Тип входа */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-lg">
              <button 
                onClick={() => setOrderType('LIMIT')}
                className={`py-1.5 text-xs font-bold rounded-md transition-all ${orderType === 'LIMIT' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500'}`}
              >
                ЛИМИТ
              </button>
              <button 
                onClick={() => setOrderType('MARKET')}
                className={`py-1.5 text-xs font-bold rounded-md transition-all ${orderType === 'MARKET' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500'}`}
              >
                МАРКЕТ
              </button>
            </div>

            {/* Выбор ТИПА СТОПА */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-slate-500 font-bold">Тип Стоп-Лосса</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setStopType('STOP_MARKET')}
                  className={`py-1.5 text-[10px] border rounded ${stopType === 'STOP_MARKET' ? 'border-blue-500 text-blue-500 bg-blue-500/10' : 'border-slate-800 text-slate-500'}`}
                >
                  РЫНОЧНЫЙ
                </button>
                <button 
                  onClick={() => setStopType('STOP')}
                  className={`py-1.5 text-[10px] border rounded ${stopType === 'STOP' ? 'border-blue-500 text-blue-500 bg-blue-500/10' : 'border-slate-800 text-slate-500'}`}
                >
                  ЛИМИТНЫЙ
                </button>
              </div>
            </div>

            {/* Поля ввода */}
            <div className="space-y-3">
              {orderType === 'LIMIT' && (
                <div>
                  <label className="text-[10px] text-slate-500 mb-1 block">Цена входа</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm focus:border-blue-500 outline-none" placeholder="0.00" />
                </div>
              )}
              
              <div>
                <label className="text-[10px] text-slate-500 mb-1 block">Цена Стоп-Лосса</label>
                <input type="number" value={stopPrice} onChange={e => setStopPrice(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm focus:border-red-500 outline-none" placeholder="0.00" />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 mb-1 block">Сумма (₴)</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm focus:border-emerald-500 outline-none" placeholder="Мин. 400 ₴" />
              </div>
            </div>

            {/* Кнопки */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                disabled={isLocked || isSubmitting}
                onClick={() => handlePlaceOrder('BUY')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'LONG'}
              </button>
              <button
                disabled={isLocked || isSubmitting}
                onClick={() => handlePlaceOrder('SELL')}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'SHORT'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingTerminal;
