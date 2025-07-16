import { create } from "zustand";

export const useDesignationModalStore = create((set) => ({
  isModalOpen: false,
  editId: null,
departmentName: null,
  openModal: (id = null,departmentName=null) =>
    set({
      isModalOpen: true,
      editId: id,
      departmentName
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      editId: null,
      departmentName:null
    }),
}));
