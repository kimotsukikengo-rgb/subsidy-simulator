import { create } from 'zustand';
import type { CompanyInfo } from '../types/company';
import type { SimulationResult } from '../types/simulation';
import { defaultCompanyInfo } from '../types/company';
import { calculateSimulation } from '../lib/calculator';
import { getProgramById, getTrackById, allPrograms } from '../data';

interface SimulationState {
  // 選択
  selectedProgramId: string;
  selectedTrackId: string;

  // 会社情報
  companyInfo: CompanyInfo;

  // 投資情報
  totalInvestment: number;
  monthlyRevenueBefore: number;
  monthlyRevenueAfter: number;
  monthlyCostBefore: number;
  monthlyCostAfter: number;

  // 結果
  result: SimulationResult | null;

  // アクション
  setProgram: (programId: string) => void;
  setTrack: (trackId: string) => void;
  updateCompanyInfo: (partial: Partial<CompanyInfo>) => void;
  setTotalInvestment: (value: number) => void;
  setMonthlyRevenueBefore: (value: number) => void;
  setMonthlyRevenueAfter: (value: number) => void;
  setMonthlyCostBefore: (value: number) => void;
  setMonthlyCostAfter: (value: number) => void;
  calculate: () => void;
  reset: () => void;
}

const defaultProgramId = allPrograms[0]?.id ?? '';
const defaultTrackId = allPrograms[0]?.tracks[0]?.id ?? '';

export const useSimulationStore = create<SimulationState>((set, get) => ({
  selectedProgramId: defaultProgramId,
  selectedTrackId: defaultTrackId,
  companyInfo: { ...defaultCompanyInfo },
  totalInvestment: 10_000_000,
  monthlyRevenueBefore: 5_000_000,
  monthlyRevenueAfter: 6_000_000,
  monthlyCostBefore: 3_000_000,
  monthlyCostAfter: 2_500_000,
  result: null,

  setProgram: (programId) => {
    const program = getProgramById(programId);
    set({
      selectedProgramId: programId,
      selectedTrackId: program?.tracks[0]?.id ?? '',
      result: null,
    });
  },

  setTrack: (trackId) => {
    set({ selectedTrackId: trackId, result: null });
  },

  updateCompanyInfo: (partial) => {
    set((state) => ({
      companyInfo: { ...state.companyInfo, ...partial },
      result: null,
    }));
  },

  setTotalInvestment: (value) => set({ totalInvestment: value, result: null }),
  setMonthlyRevenueBefore: (value) => set({ monthlyRevenueBefore: value, result: null }),
  setMonthlyRevenueAfter: (value) => set({ monthlyRevenueAfter: value, result: null }),
  setMonthlyCostBefore: (value) => set({ monthlyCostBefore: value, result: null }),
  setMonthlyCostAfter: (value) => set({ monthlyCostAfter: value, result: null }),

  calculate: () => {
    const state = get();
    const program = getProgramById(state.selectedProgramId);
    const track = getTrackById(state.selectedProgramId, state.selectedTrackId);
    if (!program || !track) return;

    const result = calculateSimulation(
      {
        programId: state.selectedProgramId,
        trackId: state.selectedTrackId,
        companyInfo: state.companyInfo,
        totalInvestment: state.totalInvestment,
        monthlyRevenueBefore: state.monthlyRevenueBefore,
        monthlyRevenueAfter: state.monthlyRevenueAfter,
        monthlyCostBefore: state.monthlyCostBefore,
        monthlyCostAfter: state.monthlyCostAfter,
      },
      program,
      track
    );
    set({ result });
  },

  reset: () => {
    set({
      selectedProgramId: defaultProgramId,
      selectedTrackId: defaultTrackId,
      companyInfo: { ...defaultCompanyInfo },
      totalInvestment: 10_000_000,
      monthlyRevenueBefore: 5_000_000,
      monthlyRevenueAfter: 6_000_000,
      monthlyCostBefore: 3_000_000,
      monthlyCostAfter: 2_500_000,
      result: null,
    });
  },
}));
