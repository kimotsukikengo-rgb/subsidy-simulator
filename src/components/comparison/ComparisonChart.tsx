import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ComparisonItem } from '../../types/comparison';
import { formatCurrency } from '../../lib/formatter';

const COLORS = ['#1D2088', '#F39800', '#22C55E', '#8B5CF6', '#EC4899'];

interface ComparisonChartProps {
  items: ComparisonItem[];
}

export function ComparisonChart({ items }: ComparisonChartProps) {
  const data = [
    {
      name: '補助金額',
      ...Object.fromEntries(items.map((item) => [item.programName, item.result.subsidyAmount])),
    },
    {
      name: '実質投資額',
      ...Object.fromEntries(items.map((item) => [item.programName, item.result.actualInvestment])),
    },
    {
      name: '年間利益貢献',
      ...Object.fromEntries(
        items.map((item) => [item.programName, item.result.monthlyProfitContribution * 12])
      ),
    },
  ];

  return (
    <div className="h-72 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) =>
              v >= 10_000_000
                ? `${(v / 10_000_000).toFixed(0)}千万`
                : v >= 10_000
                  ? `${(v / 10_000).toFixed(0)}万`
                  : `${v}`
            }
          />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {items.map((item, i) => (
            <Bar
              key={item.id}
              dataKey={item.programName}
              fill={COLORS[i % COLORS.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
