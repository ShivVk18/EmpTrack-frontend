import { create } from "zustand";

const useComplaintsStore = create((set) => ({
  isModalOpen: false,
 
  onOpen: () =>
    set({
      isModalOpen: true,
      
     
    }),

  onClose: () =>
    set({
      isModalOpen: false,
      
    }),

  shouldRefetchAfterAdd: false,
  setShouldRefetchAfterAdd: (val) => set({ shouldRefetchAfterAdd: val }),
  refetch: () => {},
  setRefetch: (fn) => set({ refetch: fn }),
  page: 1,
  setPage: (newPage) => set({ page: newPage }),
}));

export{useComplaintsStore}