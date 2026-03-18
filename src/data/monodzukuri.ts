import type { SubsidyProgram } from '../types/subsidy';

export const monodzukuri: SubsidyProgram = {
  id: 'monodzukuri',
  name: 'ものづくり補助金',
  shortName: 'ものづくり',
  category: 'national',
  description:
    '中小企業・小規模事業者等が取り組む革新的サービス開発・試作品開発・生産プロセスの改善を行うための設備投資等を支援する制度です。',
  fiscalYear: '令和6年度',
  applicationPeriod: { start: '2024-04-01', end: '2025-03-31' },
  tracks: [
    {
      id: 'monodzukuri-regular',
      name: '通常枠',
      description:
        '革新的な製品・サービス開発又は生産プロセス・サービス提供方法の改善に必要な設備・システム投資等を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中小企業', rate: 1 / 2, rateDisplay: '1/2' },
        { companySize: '中堅企業', rate: 1 / 3, rateDisplay: '1/3' },
      ],
      upperLimit: 12_500_000,
      lowerLimit: 1_000_000,
      eligibleExpenses: [
        '機械装置・システム構築費',
        '技術導入費',
        '専門家経費',
        '運搬費',
        'クラウドサービス利用費',
        '原材料費',
        '外注費',
        '知的財産権等関連経費',
      ],
      requirements: [
        '付加価値額 年率平均3%以上増加',
        '給与支給総額 年率平均1.5%以上増加',
        '事業場内最低賃金 ≧ 地域別最低賃金+30円',
      ],
    },
    {
      id: 'monodzukuri-digital',
      name: 'デジタル枠',
      description:
        'DXに資する革新的な製品・サービス開発又はデジタル技術を活用した生産プロセスの改善を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中小企業', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中堅企業', rate: 1 / 2, rateDisplay: '1/2' },
      ],
      upperLimit: 50_000_000,
      lowerLimit: 1_000_000,
      eligibleExpenses: [
        '機械装置・システム構築費',
        '技術導入費',
        '専門家経費',
        '運搬費',
        'クラウドサービス利用費',
        '原材料費',
        '外注費',
        '知的財産権等関連経費',
      ],
      requirements: [
        '付加価値額 年率平均3%以上増加',
        '給与支給総額 年率平均1.5%以上増加',
        '事業場内最低賃金 ≧ 地域別最低賃金+30円',
        'DX推進指標の自己診断を実施・結果を提出',
      ],
    },
    {
      id: 'monodzukuri-green',
      name: 'グリーン枠',
      description:
        '温室効果ガスの排出削減に資する革新的な製品・サービス開発又は炭素生産性向上を図る取組に必要な設備投資を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中小企業', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中堅企業', rate: 1 / 2, rateDisplay: '1/2' },
      ],
      upperLimit: 40_000_000,
      lowerLimit: 1_000_000,
      eligibleExpenses: [
        '機械装置・システム構築費',
        '技術導入費',
        '専門家経費',
        '運搬費',
        'クラウドサービス利用費',
        '原材料費',
        '外注費',
        '知的財産権等関連経費',
      ],
      requirements: [
        '付加価値額 年率平均3%以上増加',
        '給与支給総額 年率平均1.5%以上増加',
        '事業場内最低賃金 ≧ 地域別最低賃金+30円',
        '温室効果ガス排出削減の取組を実施',
      ],
    },
  ],
  targetBusinessTypes: ['中小企業者', '小規模企業者', '特定非営利活動法人'],
  officialUrl: 'https://portal.monodukuri-hojo.jp/',
  lastUpdated: '2024-04-01',
  notes: [
    '採択率は約50%前後',
    '電子申請（GBizID プライムアカウント）が必須',
    '事業計画書の審査あり',
  ],
};
