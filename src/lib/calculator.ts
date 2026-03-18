import type { SubsidyProgram, SubsidyTrack, CompanySize } from '../types/subsidy';
import type { SimulationInput, SimulationResult, YearlyBreakdown } from '../types/simulation';
import { formatCurrency } from './formatter';

/** 企業規模と投資額に基づく適用補助率を取得 */
function getApplicableRate(
  track: SubsidyTrack,
  companySize: CompanySize,
  totalInvestment: number
): { rate: number; rateDisplay: string } {
  // 投資額レンジ付きのルールがある場合
  const rangedRules = track.subsidyRate.filter(
    (r) => r.companySize === companySize && r.investmentRange
  );
  if (rangedRules.length > 0) {
    const matched = rangedRules.find(
      (r) =>
        r.investmentRange &&
        totalInvestment >= r.investmentRange.min &&
        totalInvestment <= r.investmentRange.max
    );
    if (matched) return { rate: matched.rate, rateDisplay: matched.rateDisplay };
  }

  // 通常のルール
  const rule = track.subsidyRate.find((r) => r.companySize === companySize && !r.investmentRange);
  if (rule) return { rate: rule.rate, rateDisplay: rule.rateDisplay };

  // フォールバック: 最初のルール
  const fallback = track.subsidyRate[0];
  return { rate: fallback?.rate ?? 0, rateDisplay: fallback?.rateDisplay ?? '0' };
}

/** シミュレーション計算 */
export function calculateSimulation(
  input: SimulationInput,
  _program: SubsidyProgram,
  track: SubsidyTrack
): SimulationResult {
  const { rate, rateDisplay } = getApplicableRate(
    track,
    input.companyInfo.companySize,
    input.totalInvestment
  );

  // 補助金額の計算（上限・下限チェック）
  const rawSubsidy = Math.floor(input.totalInvestment * rate);
  const subsidyAmount = Math.min(rawSubsidy, track.upperLimit);
  const belowMinimum = input.totalInvestment < track.lowerLimit;

  // 実質投資額
  const actualInvestment = input.totalInvestment - subsidyAmount;

  // 月次利益貢献 = 売上増加分 + コスト削減分
  const monthlyRevenueGain = input.monthlyRevenueAfter - input.monthlyRevenueBefore;
  const monthlyCostSaving = input.monthlyCostBefore - input.monthlyCostAfter;
  const monthlyProfitContribution = monthlyRevenueGain + monthlyCostSaving;

  // 投資回収期間（月数）
  const paybackPeriodMonths =
    monthlyProfitContribution > 0
      ? Math.ceil(actualInvestment / monthlyProfitContribution)
      : Infinity;

  // 5年ROI
  const totalProfit5Years = monthlyProfitContribution * 60;
  const fiveYearROI =
    actualInvestment > 0
      ? ((totalProfit5Years - actualInvestment) / actualInvestment) * 100
      : 0;

  // 年次推移
  const yearlyBreakdown: YearlyBreakdown[] = [];
  for (let year = 1; year <= 5; year++) {
    const cumulativeProfit = monthlyProfitContribution * 12 * year;
    const cumulativeROI =
      actualInvestment > 0
        ? ((cumulativeProfit - actualInvestment) / actualInvestment) * 100
        : 0;
    yearlyBreakdown.push({
      year,
      cumulativeProfit,
      cumulativeROI,
      isPaybackYear:
        cumulativeProfit >= actualInvestment &&
        (year === 1 || monthlyProfitContribution * 12 * (year - 1) < actualInvestment),
    });
  }

  // 警告
  const warnings: string[] = [];
  if (belowMinimum && track.lowerLimit > 0) {
    warnings.push(
      `投資額が補助下限額（${formatCurrency(track.lowerLimit)}）を下回っています。申請対象外の可能性があります。`
    );
  }
  if (input.totalInvestment > track.upperLimit / rate && track.upperLimit < Infinity) {
    warnings.push(
      `投資額が高額のため、補助金は上限額（${formatCurrency(track.upperLimit)}）が適用されます。`
    );
  }
  if (paybackPeriodMonths > 60) {
    warnings.push('投資回収期間が5年を超えています。投資計画の見直しをご検討ください。');
  }
  if (monthlyProfitContribution <= 0) {
    warnings.push('月次利益貢献がゼロ以下です。売上増加額またはコスト削減額を確認してください。');
  }

  return {
    input,
    subsidyAmount,
    actualInvestment,
    subsidyRate: rate,
    subsidyRateDisplay: rateDisplay,
    monthlyProfitContribution,
    paybackPeriodMonths,
    fiveYearROI,
    yearlyBreakdown,
    warnings,
    eligibilityNotes: track.requirements,
  };
}
