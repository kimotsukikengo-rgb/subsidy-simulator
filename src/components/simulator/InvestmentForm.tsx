import { TrendingUp } from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { SectionCard } from '../shared/SectionCard';
import { CurrencyInput } from '../shared/CurrencyInput';
import { InfoTooltip } from '../shared/InfoTooltip';

export function InvestmentForm() {
  const {
    totalInvestment,
    monthlyRevenueBefore,
    monthlyRevenueAfter,
    monthlyCostBefore,
    monthlyCostAfter,
    setTotalInvestment,
    setMonthlyRevenueBefore,
    setMonthlyRevenueAfter,
    setMonthlyCostBefore,
    setMonthlyCostAfter,
  } = useSimulationStore();

  return (
    <SectionCard title="投資・収支情報" icon={<TrendingUp size={20} />}>
      <div className="space-y-6">
        {/* 投資総額 */}
        <div>
          <CurrencyInput
            id="totalInvestment"
            label="設備投資総額"
            value={totalInvestment}
            onChange={setTotalInvestment}
          />
          <p className="mt-1 text-xs text-gray-500">
            補助金申請の対象となる投資総額を入力してください
          </p>
        </div>

        {/* 月次売上 */}
        <div>
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-gray-700">月次売上</span>
            <InfoTooltip text="投資前後の月間平均売上を入力してください" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CurrencyInput
              id="revenueBefore"
              label="投資前（現在）"
              value={monthlyRevenueBefore}
              onChange={setMonthlyRevenueBefore}
            />
            <CurrencyInput
              id="revenueAfter"
              label="投資後（見込）"
              value={monthlyRevenueAfter}
              onChange={setMonthlyRevenueAfter}
            />
          </div>
          {monthlyRevenueAfter > monthlyRevenueBefore && (
            <p className="mt-1 text-xs text-green-600">
              売上増加見込: +¥{(monthlyRevenueAfter - monthlyRevenueBefore).toLocaleString()}/月
            </p>
          )}
        </div>

        {/* 月次コスト */}
        <div>
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-gray-700">月次コスト</span>
            <InfoTooltip text="投資前後の月間平均コスト（人件費、外注費等）を入力してください" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CurrencyInput
              id="costBefore"
              label="投資前（現在）"
              value={monthlyCostBefore}
              onChange={setMonthlyCostBefore}
            />
            <CurrencyInput
              id="costAfter"
              label="投資後（見込）"
              value={monthlyCostAfter}
              onChange={setMonthlyCostAfter}
            />
          </div>
          {monthlyCostBefore > monthlyCostAfter && (
            <p className="mt-1 text-xs text-green-600">
              コスト削減見込: -¥{(monthlyCostBefore - monthlyCostAfter).toLocaleString()}/月
            </p>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
