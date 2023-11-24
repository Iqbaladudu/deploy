import { create } from "zustand";

const useLoginDataStore = create((set) => ({
    username: "",
    password: "",
    setUsername: (username) => set((state) => ({ username: state.username})),
    setPassword: (password) => set((state) => ({ password: state.password})),
}))

export default useLoginDataStore;