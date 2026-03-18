import { Calculator, GitCompareArrows, BookOpen } from 'lucide-react';

export type TabId = 'simulator' | 'comparison' | 'info';

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  comparisonCount: number;
}

const tabs: { id: TabId; label: string; icon: typeof Calculator }[] = [
  { id: 'simulator', label: 'シミュレーション', icon: Calculator },
  { id: 'comparison', label: '比較', icon: GitCompareArrows },
  { id: 'info', label: '補助金一覧', icon: BookOpen },
];

export function TabNavigation({ activeTab, onTabChange, comparisonCount }: TabNavigationProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors
                ${
                  activeTab === id
                    ? 'border-accent text-navy-700 bg-accent-50/50'
                    : 'border-transparent text-gray-500 hover:text-navy-600 hover:border-gray-300'
                }`}
            >
              <Icon size={18} />
              {label}
              {id === 'comparison' && comparisonCount > 0 && (
                <span className="ml-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {comparisonCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
