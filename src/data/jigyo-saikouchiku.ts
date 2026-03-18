import type { SubsidyProgram } from '../types/subsidy';

export const jigyoSaikouchiku: SubsidyProgram = {
  id: 'jigyo-saikouchiku',
  name: '事業再構築補助金',
  shortName: '事業再構築',
  category: 'national',
  description:
    'ポストコロナ・ウィズコロナ時代の経済社会の変化に対応するため、中小企業等の事業再構築を支援する制度です。新分野展開、業態転換、事業・業種転換等の取組を支援します。',
  fiscalYear: '令和6年度',
  applicationPeriod: { start: '2024-04-01', end: '2025-03-31' },
  tracks: [
    {
      id: 'saikouchiku-growth',
      name: '成長枠',
      description:
        '成長分野への大胆な事業再構築に取り組む中小企業等を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中小企業', rate: 1 / 2, rateDisplay: '1/2' },
        { companySize: '中堅企業', rate: 1 / 3, rateDisplay: '1/3' },
      ],
      upperLimit: 70_000_000,
      lowerLimit: 1_000_000,
      eligibleExpenses: [
        '建物費',
        '機械装置・システム構築費',
        '技術導入費',
        '専門家経費',
        '運搬費',
        'クラウドサービス利用費',
        '外注費',
        '知的財産権等関連経費',
        '広告宣伝・販売促進費',
        '研修費',
      ],
      requirements: [
        '事業計画を認定経営革新等支援機関と策定',
        '付加価値額の年率平均4.0%以上増加',
        '取り組む事業が過去～今後のいずれか10年間で市場規模10%以上拡大する業種・業態に属していること',
      ],
    },
    {
      id: 'saikouchiku-green-growth',
      name: 'グリーン成長枠',
      description:
        'グリーン分野での事業再構築を通じて高い成長を目指す事業者を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中小企業', rate: 1 / 2, rateDisplay: '1/2' },
        { companySize: '中堅企業', rate: 1 / 3, rateDisplay: '1/3' },
      ],
      upperLimit: 150_000_000,
      lowerLimit: 1_000_000,
      eligibleExpenses: [
        '建物費',
        '機械装置・システム構築費',
        '技術導入費',
        '専門家経費',
        '運搬費',
        'クラウドサービス利用費',
        '外注費',
        '知的財産権等関連経費',
        '広告宣伝・販売促進費',
        '研修費',
      ],
      requirements: [
        '事業計画を認定経営革新等支援機関と策定',
        '付加価値額の年率平均4.0%以上増加',
        'グリーン成長戦略「実行計画」14分野に掲げられた課題の解決に資する取組であること',
      ],
    },
    {
      id: 'saikouchiku-sangyou',
      name: '産業構造転換枠',
      description:
        '国内市場縮小等の構造的な課題に直面している業種・業態の事業者が取り組む事業再構築を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中小企業', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中堅企業', rate: 1 / 2, rateDisplay: '1/2' },
      ],
      upperLimit: 70_000_000,
      lowerLimit: 1_000_000,
      eligibleExpenses: [
        '建物費',
        '機械装置・システム構築費',
        '技術導入費',
        '専門家経費',
        '運搬費',
        'クラウドサービス利用費',
        '外注費',
        '知的財産権等関連経費',
        '広告宣伝・販売促進費',
        '研修費',
        '廃業費',
      ],
      requirements: [
        '事業計画を認定経営革新等支援機関と策定',
        '付加価値額の年率平均3.0%以上増加',
        '現在の主たる事業が過去～今後のいずれか10年間で市場規模10%以上縮小する業種・業態に属していること',
      ],
    },
  ],
  targetBusinessTypes: ['中小企業者', '中堅企業', '個人事業主'],
  officialUrl: 'https://jigyou-saikouchiku.go.jp/',
  lastUpdated: '2024-04-01',
  notes: [
    '認定経営革新等支援機関の確認書が必要',
    '補助額3,000万円超は金融機関の確認書も必要',
    '電子申請（jGrants）が必須',
  ],
};
