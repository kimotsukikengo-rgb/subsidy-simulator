import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { TabNavigation, type TabId } from './components/layout/TabNavigation';
import { ProgramSelector } from './components/simulator/ProgramSelector';
import { CompanyInfoForm } from './components/simulator/CompanyInfoForm';
import { InvestmentForm } from './components/simulator/InvestmentForm';
import { ResultsPanel } from './components/simulator/ResultsPanel';
import { ActionBar } from './components/simulator/ActionBar';
import { ComparisonView } from './components/comparison/ComparisonView';
import { ProgramListView } from './components/info/ProgramListView';
import { useSimulationStore } from './store/useSimulationStore';
import { useComparisonStore } from './store/useComparisonStore';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('simulator');
  const result = useSimulationStore((s) => s.result);
  const comparisonCount = useComparisonStore((s) => s.items.length);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        comparisonCount={comparisonCount}
      />

      <main className="flex-1">
        {activeTab === 'simulator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 左カラム: 入力 */}
              <div className="space-y-6">
                <ProgramSelector />
                <CompanyInfoForm />
                <InvestmentForm />
              </div>

              {/* 右カラム: 結果 */}
              <div className="space-y-6">
                <ActionBar onSwitchToComparison={() => setActiveTab('comparison')} />
                {result && <ResultsPanel result={result} />}
                {!result && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <p className="text-gray-400">
                      入力を行い「シミュレーション実行」ボタンを押してください
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && <ComparisonView />}
        {activeTab === 'info' && <ProgramListView />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
