import React, { useEffect, useRef, useState } from 'react';
import { MarketType } from '../types';
import { Lock, Loader2, Wallet, Info } from 'lucide-react';

interface TradingTerminalProps {
  marketType: MarketType;
  symbol: string;
  isLocked: boolean;
  balance: number;
  user: any;
}

const TradingTerminal: React.FC<TradingTerminalProps> = ({ marketType, symbol, isLocked, balance, user }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerId = "tradingview_chart_v2";
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('LIMIT');
  const [stopType, setStopType] = useState<'STOP_MARKET' | 'STOP'>('STOP_MARKET');
  const [price, setPrice] = useState<string>('');
  const [stopPrice, setStopPrice] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [takeProfit, setTakeProfit] = useState<string>('');

useEffect(() => {
  if (containerRef.current) {
    // 1. Очищаем контейнер перед каждой инициализацией
    containerRef.current.innerHTML = ''; 

    // 2. Создаем скрипт вручную
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    // 3. Конфигурация из рабочей версии
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": "BINANCE:SOLUSDT.P",
      "interval": "5",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "ru",
      "enable_publishing": false,
      "hide_side_toolbar": false, // ВКЛЮЧАЕМ инструменты рисования
      "allow_symbol_change": true,
      "calendar": false,
      "support_host": "https://www.tradingview.com"
    });

    // 4. Добавляем скрипт в DOM
    containerRef.current.appendChild(script);
  }
}, [symbol]); // Срабатывает при смене монеты

  const handlePlaceOrder = async (direction: 'BUY' | 'SELL') => {
    if (isLocked) return; // Риск-менеджер блокирует нажатие
    setIsSubmitting(true);

    const orderDetails = {
      symbol: "SOLUSDT",
      marketType: "FUTURES",
      marketType: marketType, //
      direction: direction, //
      amount: amount, //
      stopLoss: stopPrice, //
      takeProfit: takeProfit, //
    };

    try {
      // Отправляем данные на наш созданный API файл
      const response = await fetch('/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      const resData = await response.json();

      if (resData.success) {
        alert(`Успех! Сделка ${direction} по ${symbol} открыта.`);
      } else {
        alert(`Ошибка биржи: ${resData.error}`);
      }
    } catch (err) {
      alert("Ошибка сети. Проверьте соединение.");
    } finally {
      setIsSubmitting(false); // Разблокируем кнопку
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] gap-4 bg-slate-950 p-4 text-slate-200">
      {/* Контейнер для графика */}
      <div className="flex-1 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 relative">
        <div ref={containerRef} className="h-full w-full" />
      </div>

      {/* ПАНЕЛЬ УПРАВЛЕНИЯ */}
      <div className="w-80 flex flex-col gap-4">
        
        {/* БАЛАНС ВВЕРХУ */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 uppercase tracking-wider font-semibold">
              <Wallet size={14} className="text-blue-500" /> Баланс
            </span>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
              {marketType === 'FUTURES' ? 'ФЬЮЧЕРСЫ' : 'СПОТ'}
            </span>
          </div>
          <div className="text-2xl font-mono font-bold text-white">
            {(balance || 0).toLocaleString()} <span className="text-sm font-normal text-slate-500">USDT</span>
          </div>
        </div>

        {/* ТОРГОВАЯ ПАНЕЛЬ */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex-1 relative flex flex-col shadow-xl">
          {isLocked && (
            <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-red-500/30">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <Lock size={32} className="text-red-500 animate-pulse" />
              </div>
              <h3 className="text-red-500 font-black uppercase text-lg mb-2 tracking-tighter">Доступ закрыт</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Вы достигли дневного лимита риска. <br/>Торговля заблокирована для сохранения депозита.
              </p>
            </div>
          )}

          <div className="space-y-5">
            {/* Ордер: Маркет/Лимит */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button 
                onClick={() => setOrderType('LIMIT')}
                className={`py-2 text-[11px] font-black rounded-lg transition-all ${orderType === 'LIMIT' ? 'bg-slate-800 text-blue-400 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                ЛИМИТ
              </button>
              <button 
                onClick={() => setOrderType('MARKET')}
                className={`py-2 text-[11px] font-black rounded-lg transition-all ${orderType === 'MARKET' ? 'bg-slate-800 text-blue-400 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                МАРКЕТ
              </button>
            </div>

            {/* Тип Стоп-Лосса */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 px-1">
                <Info size={12} className="text-slate-500" />
                <label className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Тип Стоп-Лосса</label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setStopType('STOP_MARKET')}
                  className={`py-2 text-[10px] font-bold border rounded-lg transition-all ${stopType === 'STOP_MARKET' ? 'border-blue-500/50 text-blue-400 bg-blue-500/5' : 'border-slate-800 text-slate-500 hover:border-slate-700'}`}
                >
                  STOP MARKET
                </button>
                <button 
                  onClick={() => setStopType('STOP')}
                  className={`py-2 text-[10px] font-bold border rounded-lg transition-all ${stopType === 'STOP' ? 'border-blue-500/50 text-blue-400 bg-blue-500/5' : 'border-slate-800 text-slate-500 hover:border-slate-700'}`}
                >
                  STOP LIMIT
                </button>
              </div>
            </div>

            {/* Поля ввода */}
            <div className="space-y-4">
              {orderType === 'LIMIT' && (
                <div>
                  <label className="text-[10px] text-slate-500 mb-1.5 ml-1 block font-bold">ЦЕНА ВХОДА</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-blue-500 outline-none transition-colors font-mono" placeholder="0.00" />
                </div>
              )}

              <div>
                <label className="text-[10px] text-slate-500 mb-1.5 ml-1 block font-bold">ЦЕНА ТЕЙК-ПРОФИТА</label>
                <input 
                  type="number" 
                  value={takeProfit} 
                  onChange={e => setTakeProfit(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-emerald-500/50 outline-none transition-colors font-mono" 
                  placeholder="0.00" 
                />
              </div>
              
              <div>
                <label className="text-[10px] text-slate-500 mb-1.5 ml-1 block font-bold">ЦЕНА СТОП-ЛОССА</label>
                <input type="number" value={stopPrice} onChange={e => setStopPrice(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-red-500/50 outline-none transition-colors font-mono" placeholder="0.00" />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 mb-1.5 ml-1 block font-bold">СУММА ОРДЕРА (USDT)</label>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={e => setAmount(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:border-emerald-500/50 outline-none transition-colors font-mono font-bold text-emerald-400" 
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Кнопки ДЕЙСТВИЯ */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                disabled={isLocked || isSubmitting}
                onClick={() => handlePlaceOrder('BUY')}
                className="group relative overflow-hidden bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl transition-all active:scale-95 disabled:opacity-50"
              >
                <div className="relative z-10 flex flex-col items-center">
                   <span className="text-xs uppercase tracking-tighter">LONG</span>
                </div>
              </button>
              <button
                disabled={isLocked || isSubmitting}
                onClick={() => handlePlaceOrder('SELL')}
                className="group relative overflow-hidden bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl transition-all active:scale-95 disabled:opacity-50"
              >
                <div className="relative z-10 flex flex-col items-center">
                   <span className="text-xs uppercase tracking-tighter">SHORT</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingTerminal;
