import { create } from 'zustand'

interface HoveredProfState {
  hoveredProf: string | null;
  setHoveredProf: (prof: string | null) => void;
}

export const useHoveredProfStore = create<HoveredProfState>((set) => ({
  hoveredProf: null,
  setHoveredProf: (prof: string | null) => set({ hoveredProf: prof }),
}))