import { create } from "zustand";

export const useBoardingStore = create((set) => ({
	boarding: false,
	setBoarding: (boardingData) => set({ boarding: boardingData }),
}));
