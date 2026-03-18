import type { SubsidyProgram } from '../types/subsidy';
import { monodzukuri } from './monodzukuri';
import { itDonyu } from './it-donyu';
import { jigyoSaikouchiku } from './jigyo-saikouchiku';
import { shokiboJizokuka } from './shokibo-jizokuka';
import { shouryokuka } from './shouryokuka';
import { ookiboSeicho } from './ookibo-seicho';
import { regionalPrograms } from './regional/examples';

/** 国策補助金 */
export const nationalPrograms: SubsidyProgram[] = [
  monodzukuri,
  itDonyu,
  jigyoSaikouchiku,
  shokiboJizokuka,
  shouryokuka,
  ookiboSeicho,
];

/** 全補助金プログラム */
export const allPrograms: SubsidyProgram[] = [
  ...nationalPrograms,
  ...regionalPrograms,
];

/** IDからプログラムを取得 */
export function getProgramById(id: string): SubsidyProgram | undefined {
  return allPrograms.find((p) => p.id === id);
}

/** IDからトラックを取得 */
export function getTrackById(
  programId: string,
  trackId: string
) {
  const program = getProgramById(programId);
  return program?.tracks.find((t) => t.id === trackId);
}
