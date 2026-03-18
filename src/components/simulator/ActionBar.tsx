import { Download, GitCompareArrows, Calculator, RotateCcw } from 'lucide-react';
import { useSimulationStore } from '../../store/useSimulationStore';
import { useComparisonStore } from '../../store/useComparisonStore';
import { getProgramById, getTrackById } from '../../data';
import { exportToExcel } from '../../lib/excelExport';

interface ActionBarProps {
  onSwitchToComparison: () => void;
}

export function ActionBar({ onSwitchToComparison }: ActionBarProps) {
  const { result, selectedProgramId, selectedTrackId, calculate, reset } =
    useSimulationStore();
  const addItem = useComparisonStore((s) => s.addItem);

  const program = getProgramById(selectedProgramId);
  const track = getTrackById(selectedProgramId, selectedTrackId);

  const handleAddToComparison = () => {
    if (!result || !program || !track) return;
    addItem({
      id: `${selectedProgramId}-${selectedTrackId}-${Date.now()}`,
      programName: program.name,
      trackName: track.name,
      result,
    });
    onSwitchToComparison();
  };

  const handleExcel = async () => {
    if (!result || !program || !track) return;
    await exportToExcel(result, program, track);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={calculate}
        className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-600 text-white
                   font-bold rounded-lg shadow-sm transition-colors"
      >
        <Calculator size={18} />
        シミュレーション実行
      </button>

      {result && (
        <>
          <button
            onClick={handleExcel}
            className="flex items-center gap-2 px-5 py-3 bg-navy-500 hover:bg-navy-600 text-white
                       font-medium rounded-lg shadow-sm transition-colors"
          >
            <Download size={18} />
            Excel出力
          </button>
          <button
            onClick={handleAddToComparison}
            className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-navy-500 text-navy-700
                       hover:bg-navy-50 font-medium rounded-lg transition-colors"
          >
            <GitCompareArrows size={18} />
            比較に追加
          </button>
        </>
      )}

      <button
        onClick={reset}
        className="flex items-center gap-2 px-4 py-3 text-gray-500 hover:text-gray-700
                   hover:bg-gray-100 rounded-lg transition-colors ml-auto"
      >
        <RotateCcw size={16} />
        リセット
      </button>
    </div>
  );
}
