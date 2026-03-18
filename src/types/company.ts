import type { CompanySize } from './subsidy';

/** 都道府県 */
export const PREFECTURES = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',
] as const;

/** 業種 */
export const INDUSTRIES = [
  '製造業', '情報通信業', '卸売業', '小売業', 'サービス業',
  '建設業', '運輸業', '飲食業', '宿泊業', '医療・福祉',
  '農林水産業', '不動産業', 'その他',
] as const;

/** 会社情報 */
export interface CompanyInfo {
  companyName: string;
  representative: string;
  companySize: CompanySize;
  employeeCount: number;
  annualRevenue: number;
  capitalAmount: number;
  industry: string;
  prefecture: string;
  establishedYear: number;
  hasAppliedBefore: boolean;
}

export const defaultCompanyInfo: CompanyInfo = {
  companyName: '',
  representative: '',
  companySize: '中小企業',
  employeeCount: 10,
  annualRevenue: 100_000_000,
  capitalAmount: 10_000_000,
  industry: '製造業',
  prefecture: '東京都',
  establishedYear: 2010,
  hasAppliedBefore: false,
};
