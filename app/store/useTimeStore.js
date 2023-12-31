import { create } from "zustand";

const useTimeStore = create((set) => ({
    start: null,
    end: null,
    addStart: (data) => set((state) => ({ start: data })),
    addEnd: (data) => set((state) => ({ end: data }))
}))

export default useTimeStore;