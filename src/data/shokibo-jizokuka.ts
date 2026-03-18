import type { SubsidyProgram } from '../types/subsidy';

export const shokiboJizokuka: SubsidyProgram = {
  id: 'shokibo-jizokuka',
  name: '小規模事業者持続化補助金',
  shortName: '持続化',
  category: 'national',
  description:
    '小規模事業者が自社の経営を見直し、持続的な経営に向けた経営計画を作成した上で行う販路開拓や生産性向上の取組を支援する制度です。',
  fiscalYear: '令和6年度',
  applicationPeriod: { start: '2024-04-01', end: '2025-03-31' },
  tracks: [
    {
      id: 'jizokuka-regular',
      name: '通常枠',
      description: '小規模事業者の販路開拓等の取り組みを支援',
      subsidyRate: [
        { companySize: '小規模', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中小企業', rate: 2 / 3, rateDisplay: '2/3' },
      ],
      upperLimit: 500_000,
      lowerLimit: 0,
      eligibleExpenses: [
        '機械装置等費',
        '広報費',
        'ウェブサイト関連費',
        '展示会等出展費',
        '旅費',
        '開発費',
        '資料購入費',
        '借料',
        '設備処分費',
        '委託・外注費',
      ],
      requirements: ['商工会議所または商工会の支援を受けること'],
    },
    {
      id: 'jizokuka-chingin',
      name: '賃金引上げ枠',
      description:
        '事業場内最低賃金を地域別最低賃金より+30円以上とした事業者を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中小企業', rate: 2 / 3, rateDisplay: '2/3' },
      ],
      upperLimit: 2_000_000,
      lowerLimit: 0,
      eligibleExpenses: [
        '機械装置等費',
        '広報費',
        'ウェブサイト関連費',
        '展示会等出展費',
        '旅費',
        '開発費',
        '資料購入費',
        '借料',
        '設備処分費',
        '委託・外注費',
      ],
      requirements: [
        '商工会議所または商工会の支援を受けること',
        '事業場内最低賃金 ≧ 地域別最低賃金+30円',
      ],
      specialConditions:
        '赤字事業者は補助率3/4に引き上げ可能',
    },
    {
      id: 'jizokuka-sotsugyou',
      name: '卒業枠',
      description:
        '小規模事業者として補助事業を実施した後、小規模事業者の定義を超えて事業規模を拡大する事業者を支援',
      subsidyRate: [
        { companySize: '小規模', rate: 2 / 3, rateDisplay: '2/3' },
        { companySize: '中小企業', rate: 2 / 3, rateDisplay: '2/3' },
      ],
      upperLimit: 2_000_000,
      lowerLimit: 0,
      eligibleExpenses: [
        '機械装置等費',
        '広報費',
        'ウェブサイト関連費',
        '展示会等出展費',
        '旅費',
        '開発費',
        '資料購入費',
        '借料',
        '設備処分費',
        '委託・外注費',
      ],
      requirements: [
        '商工会議所または商工会の支援を受けること',
        '補助事業終了時に小規模事業者の定義を超えて事業規模を拡大すること',
      ],
    },
  ],
  targetBusinessTypes: [
    '商業・サービス業（常時使用する従業員の数 5人以下）',
    '宿泊業・娯楽業（常時使用する従業員の数 20人以下）',
    '製造業その他（常時使用する従業員の数 20人以下）',
  ],
  officialUrl: 'https://s23.jizokukahojokin.info/',
  lastUpdated: '2024-04-01',
  notes: [
    '小規模事業者が対象',
    '商工会議所・商工会の支援が必要',
    '経営計画書の提出が必要',
  ],
};
