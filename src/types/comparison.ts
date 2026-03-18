import type { SimulationResult } from './simulation';

/** 比較アイテム */
export interface ComparisonItem {
  id: string;
  programName: string;
  trackName: string;
  result: SimulationResult;
}
