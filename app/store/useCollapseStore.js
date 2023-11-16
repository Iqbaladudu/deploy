import { create } from "zustand";

const useCollapseStore = create((set) => ({
    collapse: false,
    toggle: () => set((state) => ({ collapse: !state.collapse}))
}))

export default useCollapseStore;