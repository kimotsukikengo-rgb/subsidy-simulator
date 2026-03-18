import type { SubsidyProgram } from '../../types/subsidy';
import { createRegionalSubsidy } from './template';

export const tokyoDX: SubsidyProgram = createRegionalSubsidy({
  id: 'tokyo-dx',
  name: '東京都 DX推進支援助成金',
  shortName: '東京DX',
  description:
    '都内中小企業のDX推進に向けた、デジタル技術の導入・活用に係る経費の一部を助成する制度です。',
  fiscalYear: '令和6年度',
  tracks: [
    {
      id: 'tokyo-dx-regular',
      name: '通常枠',
      description: '都内中小企業のDX推進を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中小企業', rate: 1 / 2, rateDisplay: '1/2' },
        { companySize: '中堅企業', rate: 1 / 3, rateDisplay: '1/3' },
      ],
      upperLimit: 10_000_000,
      lowerLimit: 500_000,
      eligibleExpenses: [
        'ソフトウェア導入費',
        'クラウドサービス利用費',
        'コンサルティング費',
        'ハードウェア導入費',
      ],
      requirements: [
        '都内に主たる事業所を有すること',
        'DX推進計画を策定すること',
      ],
    },
  ],
  targetBusinessTypes: ['都内中小企業'],
  officialUrl: 'https://www.tokyo-kosha.or.jp/',
  notes: ['東京都内に事業所を持つ中小企業が対象'],
});

export const osakaIT: SubsidyProgram = createRegionalSubsidy({
  id: 'osaka-it',
  name: '大阪府 中小企業デジタル化促進補助金',
  shortName: '大阪デジタル',
  description:
    '大阪府内の中小企業がデジタル技術を活用した業務改善を行う際の経費を補助する制度です。',
  fiscalYear: '令和6年度',
  tracks: [
    {
      id: 'osaka-it-regular',
      name: '通常枠',
      description: '府内中小企業のデジタル化を促進',
      subsidyRate: [
        { companySize: '小規模', rate: 1 / 2, rateDisplay: '1/2' },
        { companySize: '中小企業', rate: 1 / 2, rateDisplay: '1/2' },
        { companySize: '中堅企業', rate: 1 / 3, rateDisplay: '1/3' },
      ],
      upperLimit: 5_000_000,
      lowerLimit: 300_000,
      eligibleExpenses: [
        'ソフトウェア購入費',
        'クラウドサービス利用費',
        '専門家謝金',
      ],
      requirements: [
        '大阪府内に主たる事業所を有すること',
        'デジタル化推進計画を策定すること',
      ],
    },
  ],
  targetBusinessTypes: ['大阪府内中小企業'],
  officialUrl: 'https://www.pref.osaka.lg.jp/',
  notes: ['大阪府内に事業所を持つ中小企業が対象'],
});

export const regionalPrograms: SubsidyProgram[] = [tokyoDX, osakaIT];
