import { create } from "zustand";

const useLoadingStore = create((set) => ({
    loading: false,
    toggle: (args) => set((state) => ({ loading: args}))
}))

export default useLoadingStore;