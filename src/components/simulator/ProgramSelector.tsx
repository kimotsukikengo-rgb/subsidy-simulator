import { ChevronDown } from 'lucide-react';
import { allPrograms, getProgramById } from '../../data';
import { useSimulationStore } from '../../store/useSimulationStore';
import { SectionCard } from '../shared/SectionCard';
import { PercentBadge } from '../shared/PercentBadge';

export function ProgramSelector() {
  const { selectedProgramId, selectedTrackId, setProgram, setTrack, companyInfo } =
    useSimulationStore();
  const program = getProgramById(selectedProgramId);

  const nationalPrograms = allPrograms.filter((p) => p.category === 'national');
  const regionalPrograms = allPrograms.filter((p) => p.category === 'regional');

  return (
    <SectionCard title="補助金プログラム選択" icon={<ChevronDown size={20} />}>
      <div className="space-y-4">
        {/* 補助金プログラム選択 */}
        <div>
          <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
            補助金制度
          </label>
          <select
            id="program"
            value={selectedProgramId}
            onChange={(e) => setProgram(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white
                       focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none"
          >
            <optgroup label="国策補助金">
              {nationalPrograms.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </optgroup>
            {regionalPrograms.length > 0 && (
              <optgroup label="地方自治体補助金">
                {regionalPrograms.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
        </div>

        {/* 申請枠選択 */}
        {program && program.tracks.length > 1 && (
          <div>
            <label htmlFor="track" className="block text-sm font-medium text-gray-700 mb-1">
              申請枠
            </label>
            <select
              id="track"
              value={selectedTrackId}
              onChange={(e) => setTrack(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white
                         focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none"
            >
              {program.tracks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 選択中の枠の概要 */}
        {program && (
          <div className="bg-navy-50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-navy-700">{program.description}</p>
            {(() => {
              const track = program.tracks.find((t) => t.id === selectedTrackId);
              if (!track) return null;
              const rule = track.subsidyRate.find(
                (r) => r.companySize === companyInfo.companySize && !r.investmentRange
              ) ?? track.subsidyRate[0];
              return (
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="text-navy-600">
                    補助率: <PercentBadge rateDisplay={rule?.rateDisplay ?? '-'} />
                  </span>
                  <span className="text-navy-600">
                    上限: <span className="font-bold text-navy-800">{(track.upperLimit / 10_000).toLocaleString()}万円</span>
                  </span>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
