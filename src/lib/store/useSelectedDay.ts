import { create } from 'zustand';

interface Day {
  year: number;
  month: number;
  day: number;
}

interface SelectedDayStore {
  selectedDay: Day;
  setSelectedDay: (selectedDay: Day) => void;
}

export const useSelectedDayStore = create<SelectedDayStore>((set) => {
  const today = new Date();
  return {
    selectedDay: {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate(),
    },
    setSelectedDay: (selectedDay) => set({ selectedDay }),
  };
});