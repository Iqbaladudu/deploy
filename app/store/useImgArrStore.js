import { create } from "zustand";
import { persist } from "zustand/middleware";

const useImgArrStore = create(
  persist(
    (set) => ({
      images: [],
      addImage: (image) => set((state) => ({ images: [image] })),
    }),
    {
      name: "datasets",
    }
  )
);

export default useImgArrStore;
