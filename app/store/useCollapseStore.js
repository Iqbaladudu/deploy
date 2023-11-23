import { create } from "zustand";

const useCollapseStore = create((set) => ({
    collapse: true,
    collapseMobile: true,
    toggle: (bool = null) => set((state) => ({ collapse: bool ? bool : !state.collapseMobile, collapseMobile: !state.collapseMobile}))
}))

export default useCollapseStore;