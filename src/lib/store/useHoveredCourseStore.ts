import { create } from "zustand";

interface HoveredCourseState {
  hoveredCourse: string | null;
  setHoveredCourse: (course: string | null) => void;
}

export const useHoveredCourseStore = create<HoveredCourseState>((set) => ({
  hoveredCourse: null,
  setHoveredCourse: (course: string | null) => set({ hoveredCourse: course }),
}))