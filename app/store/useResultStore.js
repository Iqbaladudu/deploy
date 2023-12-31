import { create } from "zustand";

const useResultStore = create((set) => ({
    result: [],
    addResult: (data) => set((state) => ({ result: data  }))
}))

export default useResultStore;