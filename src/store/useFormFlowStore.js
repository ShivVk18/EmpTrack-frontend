import { create } from "zustand";

export const useFormFlowStore = create((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

  countries: [],
  states: [],
  cities: [],
  setCountries: (countries) => set({ countries }),
  setStates: (states) => set({ states }),
  setCities: (cities) => set({ cities }),

  selectedCountry: "",
  selectedState: "",
  selectedCity: "",
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setSelectedState: (state) => set({ selectedState: state }),
  setSelectedCity: (city) => set({ selectedCity: city }),

  isLoading: false,
  setIsLoading: (flag) => set({ isLoading: flag }),
}));

