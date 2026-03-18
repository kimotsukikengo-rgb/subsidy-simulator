import type { SubsidyProgram } from '../types/subsidy';

export const ookiboSeicho: SubsidyProgram = {
  id: 'ookibo-seicho',
  name: '大規模成長投資補助金',
  shortName: '大規模成長',
  category: 'national',
  description:
    '地域の雇用を支える中堅・中小企業が、足元の人手不足等の課題に対応し、持続的な賃上げを実現するための大規模な設備投資等を行うことを支援する制度です。',
  fiscalYear: '令和6年度',
  applicationPeriod: { start: '2024-04-01', end: '2025-03-31' },
  tracks: [
    {
      id: 'ookibo-single',
      name: '単一枠',
      description:
        '10億円以上の大規模な設備投資等を行う中堅・中小企業を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 1 / 3, rateDisplay: '1/3' },
        { companySize: '中小企業', rate: 1 / 3, rateDisplay: '1/3' },
        { companySize: '中堅企業', rate: 1 / 3, rateDisplay: '1/3' },
      ],
      upperLimit: 5_000_000_000,
      lowerLimit: 1_000_000_000,
      eligibleExpenses: [
        '建物費',
        '機械装置費',
        'ソフトウェア費',
        '外注費',
        '専門家経費',
      ],
      requirements: [
        '投資額10億円以上',
        '補助事業終了後3年間の対象事業に係る従業員1人当たり給与支給総額の年率平均2%以上の増加',
        '事業終了後3年間の従業員数の維持',
      ],
    },
  ],
  targetBusinessTypes: ['中堅企業', '中小企業'],
  officialUrl: 'https://seichoutoushi-hojo.jp/',
  lastUpdated: '2024-04-01',
  notes: [
    '投資額10億円以上が要件',
    '補助上限50億円',
    '工場新設・大規模設備投資向け',
  ],
};
