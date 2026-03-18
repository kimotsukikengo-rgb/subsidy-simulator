import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { SimulationResult } from '../../types/simulation';
import { formatCurrency } from '../../lib/formatter';

interface PaybackChartProps {
  result: SimulationResult;
}

export function PaybackChart({ result }: PaybackChartProps) {
  const data = result.yearlyBreakdown.map((row) => ({
    name: `${row.year}年目`,
    累積利益: row.cumulativeProfit,
    'ROI(%)': Math.round(row.cumulativeROI * 10) / 10,
  }));

  return (
    <div className="h-72 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) =>
              v >= 10_000_000
                ? `${(v / 10_000_000).toFixed(0)}千万`
                : v >= 10_000
                  ? `${(v / 10_000).toFixed(0)}万`
                  : `${v}`
            }
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11 }}
            tickFormatter={(v: number) => `${v}%`}
          />
          <Tooltip
            formatter={(value, name) => {
              const v = Number(value);
              return name === 'ROI(%)'
                ? [`${v.toFixed(1)}%`, name]
                : [formatCurrency(v), name];
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <ReferenceLine
            yAxisId="left"
            y={result.actualInvestment}
            stroke="#F39800"
            strokeDasharray="5 5"
            label={{ value: '投資回収ライン', fontSize: 11, fill: '#F39800' }}
          />
          <Bar
            yAxisId="left"
            dataKey="累積利益"
            fill="#1D2088"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="ROI(%)"
            stroke="#F39800"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#F39800' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
