import { create } from "zustand";

const useMenuPosition = create((set) => {
    const initialState = {
      selectDataset: false,
      predict: false,
      result: false,
    };
  
    const state = initialState;
  
    const toggle = (property, value) => {
      set((prevState) => ({
        ...prevState,
        [property]: value,
      }));
    };
  
    return {
      ...state,
      toggleSelectDataset: (bool) => toggle("selectDataset", bool),
      togglePredict: (bool) => toggle("predict", bool),
      toggleResult: (bool) => toggle("result", bool),
    };
});

export default useMenuPosition;