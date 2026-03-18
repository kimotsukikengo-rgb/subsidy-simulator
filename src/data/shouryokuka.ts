import type { SubsidyProgram } from '../types/subsidy';

export const shouryokuka: SubsidyProgram = {
  id: 'shouryokuka',
  name: '中小企業省力化投資補助金',
  shortName: '省力化',
  category: 'national',
  description:
    'IoT・ロボット等の人手不足解消に効果がある汎用製品を「カタログ」から選択して導入することで、中小企業等の付加価値や生産性の向上を図り、賃上げにつなげることを目的とした制度です。',
  fiscalYear: '令和6年度',
  applicationPeriod: { start: '2024-06-25', end: '2025-03-31' },
  tracks: [
    {
      id: 'shouryokuka-catalog',
      name: 'カタログ型',
      description:
        'あらかじめカタログに登録された省力化製品を導入する取組を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 1 / 2, rateDisplay: '1/2' },
        { companySize: '中小企業', rate: 1 / 2, rateDisplay: '1/2' },
        { companySize: '中堅企業', rate: 1 / 3, rateDisplay: '1/3' },
      ],
      upperLimit: 15_000_000,
      lowerLimit: 0,
      eligibleExpenses: [
        '省力化製品（カタログ掲載製品）の購入費',
        '導入に要する費用',
      ],
      requirements: [
        '人手不足の状態にあることを示すこと',
        'カタログに登録された製品を導入すること',
        '賃上げ要件あり（従業員数に応じた上限額の違い）',
      ],
      specialConditions:
        '従業員数5人以下: 上限200万円、6〜20人: 上限500万円、21〜50人: 上限1,000万円、51人以上: 上限1,500万円。賃上げ要件達成で上限額引き上げあり。',
    },
  ],
  targetBusinessTypes: ['中小企業', '小規模事業者'],
  officialUrl: 'https://shoryokuka.smrj.go.jp/',
  lastUpdated: '2024-06-25',
  notes: [
    'カタログに掲載された製品のみが対象',
    '販売事業者とともに共同申請',
    '従業員数によって補助上限額が変動',
  ],
};
