import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLogStore = create(
  persist(
    (set) => ({
      log: null,
      addLog: (data) => set((state) => ({ log: data })),
    }),
    {
      name: "log",
    }
  )
);

export default useLogStore;
