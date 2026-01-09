import React, { useState, useEffect } from 'react';
import { RiskCalculationResult } from '../types';

const RiskManager: React.FC = () => {
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [entryPrice, setEntryPrice] = useState<number>(0);
  const [stopLoss, setStopLoss] = useState<number>(0);
  const [takeProfit, setTakeProfit] = useState<number>(0);
  const [result, setResult] = useState<RiskCalculationResult | null>(null);

  useEffect(() => {
    if (balance > 0 && entryPrice > 0 && stopLoss > 0) {
      const riskAmount = balance * (riskPercent / 100);
      const stopDistance = Math.abs(entryPrice - stopLoss);
      
      if (stopDistance === 0) return;

      const positionUnits = riskAmount / stopDistance;
      const positionMoney = positionUnits * entryPrice;
      
      let potentialReward = 0;
      let rrRatio = 0;

      if (takeProfit > 0) {
        const rewardDistance = Math.abs(takeProfit - entryPrice);
        potentialReward = (rewardDistance / stopDistance) * riskAmount;
        rrRatio = rewardDistance / stopDistance;
      }

      setResult({
        positionSizeUnits: positionUnits,
        positionSizeMoney: positionMoney,
        riskAmount,
        potentialReward,
        riskRewardRatio: rrRatio
      });
    } else {
      setResult(null);
    }
  }, [balance, riskPercent, entryPrice, stopLoss, takeProfit]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Калькулятор Риска</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Рассчитайте идеальный размер позиции на основе вашего депозита и допустимого риска.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Депозит ($)</label>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(parseFloat(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Риск на сделку (%)</label>
              <input
                type="number"
                step="0.1"
                value={riskPercent}
                onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Вход (Цена)</label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Стоп-лосс</label>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(parseFloat(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Тейк-профит (Опционально)</label>
              <input
                type="number"
                value={takeProfit}
                onChange={(e) => setTakeProfit(parseFloat(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center space-y-6 transition-colors">
            {!result ? (
              <div className="text-center text-slate-500">
                Заполните поля слева для расчета
              </div>
            ) : (
              <>
                <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Рекомендуемый объем</div>
                  <div className="text-4xl font-bold text-emerald-500 dark:text-emerald-400">
                    {result.positionSizeUnits.toFixed(4)} <span className="text-lg text-emerald-600">ед.</span>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    ≈ ${result.positionSizeMoney.toLocaleString()} маржи
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Риск ($)</div>
                    <div className="text-xl font-semibold text-red-500 dark:text-red-400">-${result.riskAmount.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Потенциал ($)</div>
                    <div className="text-xl font-semibold text-emerald-500 dark:text-emerald-400">
                      {result.potentialReward > 0 ? `+$${result.potentialReward.toFixed(2)}` : '-'}
                    </div>
                  </div>
                </div>

                {result.riskRewardRatio > 0 && (
                  <div className="bg-white dark:bg-slate-700/50 rounded-lg p-3 text-center shadow-sm dark:shadow-none border border-slate-200 dark:border-transparent">
                     <span className="text-slate-500 dark:text-slate-400">Risk/Reward: </span>
                     <span className={`font-bold ${result.riskRewardRatio >= 2 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                       1 : {result.riskRewardRatio.toFixed(2)}
                     </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskManager;