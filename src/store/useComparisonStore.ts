import { create } from 'zustand';
import type { ComparisonItem } from '../types/comparison';

interface ComparisonState {
  items: ComparisonItem[];
  addItem: (item: ComparisonItem) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
}

export const useComparisonStore = create<ComparisonState>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clearAll: () => set({ items: [] }),
}));
