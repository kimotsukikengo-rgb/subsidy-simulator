import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { allPrograms } from '../../data';
import { formatManYen } from '../../lib/formatter';
import { PercentBadge } from '../shared/PercentBadge';
import { ProgramDetail } from './ProgramDetail';
import type { SubsidyProgram } from '../../types/subsidy';

export function ProgramListView() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const nationalPrograms = allPrograms.filter((p) => p.category === 'national');
  const regionalPrograms = allPrograms.filter((p) => p.category === 'regional');

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const renderCard = (program: SubsidyProgram) => {
    const isExpanded = expandedId === program.id;
    const mainTrack = program.tracks[0];

    return (
      <div key={program.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => toggle(program.id)}
          className="w-full px-6 py-5 flex items-start gap-4 text-left hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-navy-800">{program.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                program.category === 'national'
                  ? 'bg-navy-50 text-navy-600'
                  : 'bg-green-50 text-green-600'
              }`}>
                {program.category === 'national' ? '国策' : '地方'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{program.description}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
              <span>
                枠: <span className="font-medium text-navy-600">{program.tracks.length}種類</span>
              </span>
              {mainTrack && (
                <>
                  <span>
                    補助率: <PercentBadge rateDisplay={mainTrack.subsidyRate[0]?.rateDisplay ?? '-'} />
                  </span>
                  <span>
                    上限: <span className="font-medium text-navy-600">{formatManYen(mainTrack.upperLimit)}</span>
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="shrink-0 text-gray-400 mt-1">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>

        {isExpanded && (
          <div className="border-t border-gray-100">
            <ProgramDetail program={program} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 国策補助金 */}
      <div>
        <h2 className="text-lg font-bold text-navy-800 mb-4">国策補助金</h2>
        <div className="space-y-3">{nationalPrograms.map(renderCard)}</div>
      </div>

      {/* 地方自治体補助金 */}
      {regionalPrograms.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-navy-800 mb-4">地方自治体補助金</h2>
          <div className="space-y-3">{regionalPrograms.map(renderCard)}</div>
        </div>
      )}
    </div>
  );
}
