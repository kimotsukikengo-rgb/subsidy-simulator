import { Banknote, PiggyBank, TrendingUp, Clock, BarChart3, Percent } from 'lucide-react';
import type { SimulationResult } from '../../types/simulation';
import { formatCurrency, formatPercent } from '../../lib/formatter';

interface SummaryCardsProps {
  result: SimulationResult;
}

export function SummaryCards({ result }: SummaryCardsProps) {
  const cards = [
    {
      label: '補助金額',
      value: formatCurrency(result.subsidyAmount),
      icon: Banknote,
      color: 'text-green-600',
      bg: 'bg-green-50',
      iconColor: 'text-green-500',
    },
    {
      label: '実質投資額',
      value: formatCurrency(result.actualInvestment),
      icon: PiggyBank,
      color: 'text-navy-700',
      bg: 'bg-navy-50',
      iconColor: 'text-navy-400',
    },
    {
      label: '適用補助率',
      value: result.subsidyRateDisplay,
      icon: Percent,
      color: 'text-accent-700',
      bg: 'bg-accent-50',
      iconColor: 'text-accent-500',
    },
    {
      label: '月次利益貢献',
      value: formatCurrency(result.monthlyProfitContribution),
      icon: TrendingUp,
      color: result.monthlyProfitContribution > 0 ? 'text-green-600' : 'text-red-600',
      bg: result.monthlyProfitContribution > 0 ? 'bg-green-50' : 'bg-red-50',
      iconColor: result.monthlyProfitContribution > 0 ? 'text-green-500' : 'text-red-500',
    },
    {
      label: '投資回収期間',
      value:
        result.paybackPeriodMonths === Infinity
          ? '回収不可'
          : `${result.paybackPeriodMonths}ヶ月`,
      icon: Clock,
      color: result.paybackPeriodMonths <= 36 ? 'text-green-600' : 'text-amber-600',
      bg: result.paybackPeriodMonths <= 36 ? 'bg-green-50' : 'bg-amber-50',
      iconColor: result.paybackPeriodMonths <= 36 ? 'text-green-500' : 'text-amber-500',
    },
    {
      label: '5年後ROI',
      value: result.fiveYearROI === 0 ? '-' : formatPercent(result.fiveYearROI),
      icon: BarChart3,
      color: result.fiveYearROI > 0 ? 'text-green-600' : 'text-red-600',
      bg: result.fiveYearROI > 0 ? 'bg-green-50' : 'bg-red-50',
      iconColor: result.fiveYearROI > 0 ? 'text-green-500' : 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.bg} rounded-xl p-4 flex flex-col gap-2`}
        >
          <div className="flex items-center gap-1.5">
            <card.icon size={16} className={card.iconColor} />
            <span className="text-xs font-medium text-gray-600">{card.label}</span>
          </div>
          <span className={`text-lg sm:text-xl font-bold ${card.color} truncate`}>
            {card.value}
          </span>
        </div>
      ))}
    </div>
  );
}
