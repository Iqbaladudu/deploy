import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: (dt) => set((state) => ({ theme: dt })),
    }),
    {
      name: "theme",
    }
  )
);

export default useThemeStore;
