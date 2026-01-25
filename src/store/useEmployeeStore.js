import { create } from "zustand";

export const useEmployeeStore = create((set) => ({
  isModalOpen: false,
  editId: null,

  openModal: (id = null) =>
    set({
      isModalOpen: true,
      editId: id,
      
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      editId: null,
      
    }),
}));
