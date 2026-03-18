import { X } from 'lucide-react';
import type { ComparisonItem } from '../../types/comparison';
import { formatCurrency, formatPercent } from '../../lib/formatter';

interface ComparisonTableProps {
  items: ComparisonItem[];
  onRemove: (id: string) => void;
}

export function ComparisonTable({ items, onRemove }: ComparisonTableProps) {
  const rows = [
    { label: '補助金制度', getValue: (item: ComparisonItem) => item.programName },
    { label: '申請枠', getValue: (item: ComparisonItem) => item.trackName },
    { label: '適用補助率', getValue: (item: ComparisonItem) => item.result.subsidyRateDisplay },
    { label: '投資総額', getValue: (item: ComparisonItem) => formatCurrency(item.result.input.totalInvestment) },
    { label: '補助金額', getValue: (item: ComparisonItem) => formatCurrency(item.result.subsidyAmount) },
    { label: '実質投資額', getValue: (item: ComparisonItem) => formatCurrency(item.result.actualInvestment) },
    { label: '月次利益貢献', getValue: (item: ComparisonItem) => formatCurrency(item.result.monthlyProfitContribution) },
    {
      label: '投資回収期間',
      getValue: (item: ComparisonItem) =>
        item.result.paybackPeriodMonths === Infinity
          ? '回収不可'
          : `${item.result.paybackPeriodMonths}ヶ月`,
    },
    { label: '5年後ROI', getValue: (item: ComparisonItem) => formatPercent(item.result.fiveYearROI) },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy-500 text-white">
            <th className="px-4 py-2.5 text-left rounded-tl-lg min-w-[120px]">比較項目</th>
            {items.map((item) => (
              <th key={item.id} className="px-4 py-2.5 text-center min-w-[160px]">
                <div className="flex items-center justify-center gap-1">
                  <span>{item.programName}</span>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-0.5 hover:bg-navy-400 rounded transition-colors"
                    aria-label="削除"
                  >
                    <X size={14} />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
              <td className="px-4 py-2.5 font-medium text-navy-700">{row.label}</td>
              {items.map((item) => (
                <td key={item.id} className="px-4 py-2.5 text-center tabular-nums">
                  {row.getValue(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
