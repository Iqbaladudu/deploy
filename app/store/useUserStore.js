import { create } from "zustand";

const useUserStore = create((set) => ({
    user: null,
    addUser: (data) => set((state) => ({ user: data }))
}))

export default useUserStore