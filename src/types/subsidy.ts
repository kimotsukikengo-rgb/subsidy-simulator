/** 企業規模 */
export type CompanySize = '小規模' | '中小企業' | '中堅企業';

/** 補助率ルール（企業規模別） */
export interface SubsidyRateRule {
  companySize: CompanySize;
  rate: number;
  rateDisplay: string;
  investmentRange?: {
    min: number;
    max: number;
  };
}

/** 補助金の申請枠 */
export interface SubsidyTrack {
  id: string;
  name: string;
  description: string;
  subsidyRate: SubsidyRateRule[];
  upperLimit: number;
  lowerLimit: number;
  eligibleExpenses: string[];
  requirements: string[];
  specialConditions?: string;
}

/** 補助金プログラム */
export interface SubsidyProgram {
  id: string;
  name: string;
  shortName: string;
  category: 'national' | 'regional';
  description: string;
  fiscalYear: string;
  applicationPeriod?: {
    start: string;
    end: string;
  };
  tracks: SubsidyTrack[];
  targetBusinessTypes: string[];
  officialUrl: string;
  lastUpdated: string;
  notes: string[];
}
