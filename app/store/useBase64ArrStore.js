import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBase64ArrStore = create(
  persist(
    (set) => ({
      base64Img: [],
      addBase64Img: (image) =>
        set((state) => ({ base64Img: [Array.from(new Set(image))] })),
    }),
    {
      name: "datasets-base64",
    }
  )
);

export default useBase64ArrStore;
