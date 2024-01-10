import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTimeStore = create(
  persist(
    (set) => ({
      start: null,
      end: null,
      addStart: (data) => set((state) => ({ start: data })),
      addEnd: (data) => set((state) => ({ end: data })),
    }),
    {
      name: "time",
    }
  )
);

export default useTimeStore;
