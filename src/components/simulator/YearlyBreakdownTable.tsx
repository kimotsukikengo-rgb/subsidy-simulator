import type { SimulationResult } from '../../types/simulation';
import { formatCurrency, formatPercent } from '../../lib/formatter';

interface YearlyBreakdownTableProps {
  result: SimulationResult;
}

export function YearlyBreakdownTable({ result }: YearlyBreakdownTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy-500 text-white">
            <th className="px-4 py-2.5 text-left rounded-tl-lg">年次</th>
            <th className="px-4 py-2.5 text-right">累積利益</th>
            <th className="px-4 py-2.5 text-right">累積ROI</th>
            <th className="px-4 py-2.5 text-center rounded-tr-lg">投資回収</th>
          </tr>
        </thead>
        <tbody>
          {result.yearlyBreakdown.map((row) => (
            <tr
              key={row.year}
              className={`border-b border-gray-100 ${
                row.isPaybackYear ? 'bg-green-50' : 'hover:bg-gray-50'
              }`}
            >
              <td className="px-4 py-2.5 font-medium">{row.year}年目</td>
              <td className="px-4 py-2.5 text-right tabular-nums">
                {formatCurrency(row.cumulativeProfit)}
              </td>
              <td
                className={`px-4 py-2.5 text-right tabular-nums font-medium ${
                  row.cumulativeROI >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {formatPercent(row.cumulativeROI)}
              </td>
              <td className="px-4 py-2.5 text-center">
                {row.isPaybackYear && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                    回収達成
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
