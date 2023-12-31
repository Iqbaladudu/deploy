import { create } from "zustand";

const useEngineStore = create((set) => ({
    engines: [],
    addData: (engines) => set((state) => ({ engines: engines }))
}))

export default useEngineStore;