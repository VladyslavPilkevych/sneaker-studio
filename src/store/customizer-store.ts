import { create } from "zustand";

interface CustomizerState {
  currentModelId: string | null;
  selectedPart: string | null;
  partColors: Record<string, string>;
  availableParts: string[];

  initModel: (modelId: string, defaultConfig: Record<string, string>) => void;
  setAvailableParts: (parts: string[]) => void;
  selectPart: (partName: string | null) => void;
  setPartColor: (partName: string, color: string) => void;
  resetColors: (defaultConfig: Record<string, string>) => void;
  setColors: (colors: Record<string, string>) => void;
}

export const useCustomizerStore = create<CustomizerState>((set) => ({
  currentModelId: null,
  selectedPart: null,
  partColors: {},
  availableParts: [],

  initModel: (modelId, defaultConfig) =>
    set({
      currentModelId: modelId,
      partColors: { ...defaultConfig },
      selectedPart: null,
    }),

  setAvailableParts: (parts) => set({ availableParts: parts }),

  selectPart: (partName) => set({ selectedPart: partName }),

  setPartColor: (partName, color) =>
    set((state) => ({
      partColors: { ...state.partColors, [partName]: color },
    })),

  resetColors: (defaultConfig) => set({ partColors: { ...defaultConfig } }),

  setColors: (colors) => set({ partColors: { ...colors } }),
}));
