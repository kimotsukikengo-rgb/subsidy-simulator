import { ExternalLink, CheckCircle2 } from 'lucide-react';
import type { SubsidyProgram } from '../../types/subsidy';
import { formatManYen } from '../../lib/formatter';
import { PercentBadge } from '../shared/PercentBadge';

interface ProgramDetailProps {
  program: SubsidyProgram;
}

export function ProgramDetail({ program }: ProgramDetailProps) {
  return (
    <div className="p-6 space-y-6">
      {/* 枠一覧 */}
      {program.tracks.map((track) => (
        <div key={track.id} className="bg-gray-50 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-base font-bold text-navy-700">{track.name}</h4>
            <div className="flex gap-2">
              {track.subsidyRate.map((rule) => (
                <span key={`${rule.companySize}-${rule.rateDisplay}`} className="text-xs text-gray-500">
                  {rule.companySize}: <PercentBadge rateDisplay={rule.rateDisplay} />
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">{track.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 上限・下限 */}
            <div>
              <span className="text-xs font-medium text-gray-500 block mb-1">補助額</span>
              <p className="text-sm">
                {track.lowerLimit > 0 ? formatManYen(track.lowerLimit) : '-'} 〜{' '}
                <span className="font-bold text-navy-700">{formatManYen(track.upperLimit)}</span>
              </p>
            </div>

            {/* 特記事項 */}
            {track.specialConditions && (
              <div>
                <span className="text-xs font-medium text-gray-500 block mb-1">特記事項</span>
                <p className="text-sm text-amber-700">{track.specialConditions}</p>
              </div>
            )}
          </div>

          {/* 対象経費 */}
          <div>
            <span className="text-xs font-medium text-gray-500 block mb-1">対象経費</span>
            <div className="flex flex-wrap gap-1.5">
              {track.eligibleExpenses.map((exp) => (
                <span key={exp} className="text-xs bg-white border border-gray-200 rounded-full px-2.5 py-1">
                  {exp}
                </span>
              ))}
            </div>
          </div>

          {/* 申請要件 */}
          <div>
            <span className="text-xs font-medium text-gray-500 block mb-1">申請要件</span>
            <ul className="space-y-1">
              {track.requirements.map((req, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <CheckCircle2 size={14} className="text-navy-400 shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* 注意事項 & リンク */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {program.notes.length > 0 && (
          <div className="text-xs text-gray-500 space-y-0.5">
            {program.notes.map((note, i) => (
              <p key={i}>※ {note}</p>
            ))}
          </div>
        )}
        {program.officialUrl && (
          <a
            href={program.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-navy-600 hover:text-navy-800 font-medium"
          >
            <ExternalLink size={14} />
            公式サイト
          </a>
        )}
      </div>
    </div>
  );
}
