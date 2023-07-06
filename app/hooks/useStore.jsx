import { create } from 'zustand';

export const useStore = create((set) => ({
  store: {},
  setStore: (obj) => {
    set({ store: obj });
  },
}));

export const useComparisonModalStore = create((set) => ({
  store: {},
  setStore: (obj) => {
    set({ store: obj });
  },
}));