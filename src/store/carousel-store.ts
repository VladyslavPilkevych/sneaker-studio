import { create } from "zustand";
import { SNEAKER_MODELS } from "../data/models";

interface CarouselState {
  currentIndex: number;
  direction: number;
  isTransitioning: boolean;

  nextModel: () => void;
  prevModel: () => void;
  setIndex: (index: number) => void;
  setIsTransitioning: (isTransitioning: boolean) => void;
}

export const useCarouselStore = create<CarouselState>((set) => ({
  currentIndex: 0,
  direction: 0,
  isTransitioning: false,

  nextModel: () => {
    set((state) => {
      if (state.isTransitioning) return state;
      const nextIndex = (state.currentIndex + 1) % SNEAKER_MODELS.length;
      return {
        currentIndex: nextIndex,
        direction: 1,
        isTransitioning: true,
      };
    });
  },

  prevModel: () => {
    set((state) => {
      if (state.isTransitioning) return state;
      const prevIndex =
        (state.currentIndex - 1 + SNEAKER_MODELS.length) %
        SNEAKER_MODELS.length;
      return {
        currentIndex: prevIndex,
        direction: -1,
        isTransitioning: true,
      };
    });
  },

  setIndex: (index: number) => {
    set((state) => {
      if (state.isTransitioning || index === state.currentIndex) return state;
      const direction = index > state.currentIndex ? 1 : -1;
      return {
        currentIndex: index,
        direction,
        isTransitioning: true,
      };
    });
  },

  setIsTransitioning: (isTransitioning: boolean) => set({ isTransitioning }),
}));
