import { create } from "zustand";
import { persist } from "zustand/middleware";

const useResultStore = create(
  persist(
    (set) => ({
      result: [],
      addResult: (data) => set((state) => ({ result: data })),
    }),
    {
      name: "result",
    }
  )
);

export default useResultStore;
