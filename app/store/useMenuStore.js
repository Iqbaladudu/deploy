import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialMenuData = [
  { label: "Pilih Engine", url: "select-engine", doneTask: false },
  { label: "Import Gambar", url: "select-dataset", doneTask: false },
  { label: "Prediksi", url: "predict", doneTask: false },
  { label: "Laporan Hasil", url: "result", doneTask: false },
];

const useMenuStore = create(
  persist(
    (set) => ({
      menu: initialMenuData,
      setMenuData: (data) =>
        set((state) => ({
          menu: data,
        })),
    }),
    {
      name: "menu-position",
    }
  )
);

export default useMenuStore;
