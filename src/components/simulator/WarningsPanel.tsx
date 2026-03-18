import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { SimulationResult } from '../../types/simulation';

interface WarningsPanelProps {
  result: SimulationResult;
}

export function WarningsPanel({ result }: WarningsPanelProps) {
  if (result.warnings.length === 0 && result.eligibilityNotes.length === 0) return null;

  return (
    <div className="space-y-3">
      {result.warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-amber-600" />
            <span className="text-sm font-bold text-amber-800">注意事項</span>
          </div>
          <ul className="space-y-1">
            {result.warnings.map((w, i) => (
              <li key={i} className="text-sm text-amber-700 flex gap-2">
                <span className="shrink-0">・</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.eligibilityNotes.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className="text-blue-600" />
            <span className="text-sm font-bold text-blue-800">申請要件</span>
          </div>
          <ul className="space-y-1">
            {result.eligibilityNotes.map((note, i) => (
              <li key={i} className="text-sm text-blue-700 flex gap-2">
                <span className="shrink-0">・</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
