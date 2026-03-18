import { Trash2 } from 'lucide-react';
import { useComparisonStore } from '../../store/useComparisonStore';
import { SectionCard } from '../shared/SectionCard';
import { ComparisonTable } from './ComparisonTable';
import { ComparisonChart } from './ComparisonChart';

export function ComparisonView() {
  const { items, removeItem, clearAll } = useComparisonStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 text-lg">
            シミュレーション結果を「比較に追加」して、複数の補助金を比較できます
          </p>
          <p className="text-gray-400 text-sm mt-2">
            シミュレーションタブで計算後、「比較に追加」ボタンを押してください
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-navy-800">
          補助金比較 ({items.length}件)
        </h2>
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={14} />
          すべてクリア
        </button>
      </div>

      <SectionCard title="比較チャート">
        <ComparisonChart items={items} />
      </SectionCard>

      <SectionCard title="詳細比較テーブル">
        <ComparisonTable items={items} onRemove={removeItem} />
      </SectionCard>
    </div>
  );
}
