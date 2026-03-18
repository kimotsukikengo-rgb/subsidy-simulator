import type { SubsidyProgram } from '../types/subsidy';

export const itDonyu: SubsidyProgram = {
  id: 'it-donyu',
  name: 'IT導入補助金',
  shortName: 'IT導入',
  category: 'national',
  description:
    '中小企業・小規模事業者等がITツール（ソフトウェア、サービス等）を導入する経費の一部を補助し、業務効率化・売上アップをサポートする制度です。',
  fiscalYear: '令和6年度',
  applicationPeriod: { start: '2024-02-16', end: '2025-01-31' },
  tracks: [
    {
      id: 'it-donyu-regular',
      name: '通常枠',
      description: '自社の課題にあったITツールの導入を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 1 / 2, rateDisplay: '1/2' },
        { companySize: '中小企業', rate: 1 / 2, rateDisplay: '1/2' },
        { companySize: '中堅企業', rate: 1 / 2, rateDisplay: '1/2' },
      ],
      upperLimit: 4_500_000,
      lowerLimit: 50_000,
      eligibleExpenses: [
        'ソフトウェア購入費',
        'クラウド利用料（最大2年分）',
        '導入関連費',
        'ハードウェア購入費',
      ],
      requirements: [
        'gBizIDプライムアカウントの取得',
        'SECURITY ACTION宣言（二つ星）',
        '「みらデジ経営チェック」の実施',
      ],
    },
    {
      id: 'it-donyu-security',
      name: 'セキュリティ対策推進枠',
      description:
        'サイバーセキュリティ対策の強化を目的としたITツールの導入を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 1 / 2, rateDisplay: '1/2' },
        { companySize: '中小企業', rate: 1 / 2, rateDisplay: '1/2' },
        { companySize: '中堅企業', rate: 1 / 2, rateDisplay: '1/2' },
      ],
      upperLimit: 1_000_000,
      lowerLimit: 50_000,
      eligibleExpenses: [
        'サイバーセキュリティサービス利用料（最大2年分）',
      ],
      requirements: [
        '「サイバーセキュリティお助け隊サービスリスト」掲載のサービスであること',
      ],
    },
    {
      id: 'it-donyu-digital-kiban',
      name: 'デジタル化基盤導入枠',
      description:
        '会計ソフト、受発注ソフト、決済ソフト、ECソフトの導入費用を支援',
      subsidyRate: [
        {
          companySize: '小規模',
          rate: 3 / 4,
          rateDisplay: '3/4',
          investmentRange: { min: 50_000, max: 500_000 },
        },
        {
          companySize: '小規模',
          rate: 2 / 3,
          rateDisplay: '2/3',
          investmentRange: { min: 500_001, max: 3_500_000 },
        },
        {
          companySize: '中小企業',
          rate: 3 / 4,
          rateDisplay: '3/4',
          investmentRange: { min: 50_000, max: 500_000 },
        },
        {
          companySize: '中小企業',
          rate: 2 / 3,
          rateDisplay: '2/3',
          investmentRange: { min: 500_001, max: 3_500_000 },
        },
        {
          companySize: '中堅企業',
          rate: 3 / 4,
          rateDisplay: '3/4',
          investmentRange: { min: 50_000, max: 500_000 },
        },
        {
          companySize: '中堅企業',
          rate: 2 / 3,
          rateDisplay: '2/3',
          investmentRange: { min: 500_001, max: 3_500_000 },
        },
      ],
      upperLimit: 3_500_000,
      lowerLimit: 50_000,
      eligibleExpenses: [
        'ソフトウェア購入費',
        'クラウド利用料（最大2年分）',
        '導入関連費',
        'ハードウェア購入費（PC、タブレット、レジ等）',
      ],
      requirements: [
        '会計・受発注・決済・ECのいずれかの機能を持つソフトウェアであること',
        'インボイス制度対応',
      ],
      specialConditions:
        '投資額50万円以下は補助率3/4、50万円超350万円以下は補助率2/3',
    },
  ],
  targetBusinessTypes: ['中小企業', '小規模事業者', '個人事業主'],
  officialUrl: 'https://it-shien.smrj.go.jp/',
  lastUpdated: '2024-02-16',
  notes: [
    'IT導入支援事業者が申請をサポート',
    '登録済みITツールのみが対象',
    '複数回の公募あり',
  ],
};
