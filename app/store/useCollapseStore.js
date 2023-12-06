import { create } from "zustand";

const useCollapseStore = create((set) => ({
    collapse: true,
    toggle: () => set((state) => ({ collapse: !state.collapse}))
}))

export default useCollapseStore;