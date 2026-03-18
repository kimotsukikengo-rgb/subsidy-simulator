import { BarChart3 } from 'lucide-react';
import type { SimulationResult } from '../../types/simulation';
import { SectionCard } from '../shared/SectionCard';
import { SummaryCards } from './SummaryCards';
import { PaybackChart } from './PaybackChart';
import { YearlyBreakdownTable } from './YearlyBreakdownTable';
import { WarningsPanel } from './WarningsPanel';

interface ResultsPanelProps {
  result: SimulationResult;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  return (
    <SectionCard title="シミュレーション結果" icon={<BarChart3 size={20} />}>
      <div className="space-y-6">
        <SummaryCards result={result} />
        <WarningsPanel result={result} />
        <div>
          <h3 className="text-sm font-bold text-navy-700 mb-3">投資回収チャート（5年推移）</h3>
          <PaybackChart result={result} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-navy-700 mb-3">年次ブレークダウン</h3>
          <YearlyBreakdownTable result={result} />
        </div>
      </div>
    </SectionCard>
  );
}
