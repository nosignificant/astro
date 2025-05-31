import { create } from 'zustand';

interface HoveredRoomState {
  hoveredRoom: string | null;
  setHoveredRoom: (room: string | null) => void;
}

export const useHoveredRoomStore = create<HoveredRoomState>((set) => ({
  hoveredRoom: null,
  setHoveredRoom: (room: string | null) => set({ hoveredRoom: room }),
}))