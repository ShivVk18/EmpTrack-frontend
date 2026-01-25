import { create } from "zustand";

const useAttendancePlanStore = create((set) => ({
  isModalOpen: false,
  editId: null,
  onOpen: (id=null) =>
    set({
      isModalOpen: true,
      editId: id,
     
    }),

  onClose: () =>
    set({
      isModalOpen: false,
      editId: null
    }),

  shouldRefetchAfterAdd: false,
  setShouldRefetchAfterAdd: (val) => set({ shouldRefetchAfterAdd: val }),
  refetch: () => {},
  setRefetch: (fn) => set({ refetch: fn }),
  page: 1,
  setPage: (newPage) => set({ page: newPage }),
}));

export{useAttendancePlanStore}