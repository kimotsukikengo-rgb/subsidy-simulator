import type { SubsidyProgram } from '../../types/subsidy';

/**
 * 地方自治体補助金のテンプレート生成関数
 * カスタム補助金を追加する際に使用
 */
export function createRegionalSubsidy(
  overrides: Partial<SubsidyProgram> & Pick<SubsidyProgram, 'id' | 'name' | 'shortName' | 'tracks'>
): SubsidyProgram {
  return {
    category: 'regional',
    description: '',
    fiscalYear: '令和6年度',
    targetBusinessTypes: ['中小企業', '小規模事業者'],
    officialUrl: '',
    lastUpdated: new Date().toISOString().slice(0, 10),
    notes: [],
    ...overrides,
  };
}
