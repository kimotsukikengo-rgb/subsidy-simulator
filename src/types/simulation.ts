import type { CompanyInfo } from './company';

/** シミュレーション入力 */
export interface SimulationInput {
  programId: string;
  trackId: string;
  companyInfo: CompanyInfo;
  totalInvestment: number;
  monthlyRevenueBefore: number;
  monthlyRevenueAfter: number;
  monthlyCostBefore: number;
  monthlyCostAfter: number;
}

/** 年次内訳 */
export interface YearlyBreakdown {
  year: number;
  cumulativeProfit: number;
  cumulativeROI: number;
  isPaybackYear: boolean;
}

/** シミュレーション結果 */
export interface SimulationResult {
  input: SimulationInput;
  subsidyAmount: number;
  actualInvestment: number;
  subsidyRate: number;
  subsidyRateDisplay: string;
  monthlyProfitContribution: number;
  paybackPeriodMonths: number;
  fiveYearROI: number;
  yearlyBreakdown: YearlyBreakdown[];
  warnings: string[];
  eligibilityNotes: string[];
}
