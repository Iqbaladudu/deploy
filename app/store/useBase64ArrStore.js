import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBase64ArrStore = create(
  persist(
    (set) => ({
      base64Img: [],
      addBase64Img: (image) =>
        set((state) => ({
          base64Img: Array.from(new Set(image)).map((arr) => JSON.parse(arr)),
        })),
      removeBase64Img: (id) =>
        set((state) => ({
          base64Img: state.base64Img.filter((obj) => obj.id !== id),
        })),
      removeBase64ImgAll: () =>
        set((state) => ({
          base64Img: [],
        })),
    }),
    {
      name: "datasets-base64",
    }
  )
);

export default useBase64ArrStore;
