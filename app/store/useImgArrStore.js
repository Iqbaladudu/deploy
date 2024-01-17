import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useImgArrStore = create(
  persist(
    (set) => ({
      images: [],
      addImage: (image) => set((state) => ({ images: [image] })),
      removeImage: (id) =>
        set((state) => ({
          images: [state.images[0].filter((obj) => obj.id !== id)],
        })),
      removeAll: () => set((state) => ({ images: [] })),
    }),
    {
      name: "datasets",
    }
  )
);

export default useImgArrStore;
