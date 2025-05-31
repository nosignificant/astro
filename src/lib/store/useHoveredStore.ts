import { create } from 'zustand';

interface HoveredEntryState {
  hoveredDate: {startDate: string, endDate: string} | null;
  setHoveredDate: (date: {startDate: string, endDate: string} | null) => void;
}

export const useHoveredStore = create<HoveredEntryState>((set) => ({
  hoveredDate: null,
  setHoveredDate: (date) => set({ hoveredDate: date }),
}));