import { create } from "zustand";
import { FilterKey } from "../types";

type FilterValue = boolean | number | string;

interface FilterState {
  key: FilterKey | null;
  value: FilterValue | null;
  setFilter: (key: FilterKey, value: FilterValue) => void;
  resetFilter: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  key: null,
  value: null,
  setFilter: (key, value) => set({key, value}),
  resetFilter: () => set({key: null, value: null}),
}));