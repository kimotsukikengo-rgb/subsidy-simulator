import { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';

interface EligibilityChecklistProps {
  requirements: string[];
}

export function EligibilityChecklist({ requirements }: EligibilityChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const allChecked = checked.size === requirements.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">要件チェックリスト</span>
        <span className={`text-xs font-bold ${allChecked ? 'text-green-600' : 'text-gray-400'}`}>
          {checked.size}/{requirements.length} 完了
        </span>
      </div>
      <ul className="space-y-2">
        {requirements.map((req, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className={`w-full flex items-start gap-2.5 p-3 rounded-lg border text-left transition-colors text-sm ${
                checked.has(i)
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {checked.has(i) ? (
                <CheckSquare size={18} className="text-green-600 shrink-0 mt-0.5" />
              ) : (
                <Square size={18} className="text-gray-400 shrink-0 mt-0.5" />
              )}
              <span className={checked.has(i) ? 'line-through opacity-75' : ''}>{req}</span>
            </button>
          </li>
        ))}
      </ul>
      {allChecked && (
        <p className="text-sm text-green-600 font-bold text-center py-2">
          すべての要件を確認しました
        </p>
      )}
    </div>
  );
}
