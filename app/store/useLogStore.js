import { create } from "zustand";

const useLogStore = create((set) => ({
    log: null,
    addLog: (data) => set((state) => ({ log: data }))
}))

export default useLogStore