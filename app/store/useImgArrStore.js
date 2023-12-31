import { create } from "zustand";

const useImgArrStore = create((set) => ({
    images: [],
    addImage: (image) => set((state) => ({ images: [ image ] }))
}))

export default useImgArrStore