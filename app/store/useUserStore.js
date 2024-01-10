import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      addUser: (data) => set((state) => ({ user: data })),
    }),
    {
      name: "user",
    }
  )
);

export default useUserStore;
