import { create } from "zustand";
import { persist } from "zustand/middleware";

const useEngineStore = create(
  persist(
    (set) => ({
      engines: [],
      addData: (engines) => set((state) => ({ engines: engines })),
    }),
    {
      name: "engine-data",
    }
  )
);

export default useEngineStore;
