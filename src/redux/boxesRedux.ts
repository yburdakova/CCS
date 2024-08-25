import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoxData } from "../data/types";

interface BoxesState {
  boxes: BoxData[];
  barcodes: string[];
}

const initialState: BoxesState = {
  boxes: [],
  barcodes: []
};

const boxesSlice = createSlice({
  name: "boxes",
  initialState,
  reducers: {
    setBoxes: (state, action: PayloadAction<BoxData[]>) => {
      state.boxes = action.payload;
      state.barcodes = action.payload.map(box => box.barcode);
    },
    updateBox: (state, action: PayloadAction<BoxData>) => {
      const index = state.boxes.findIndex(box => box.id === action.payload.id);
      if (index !== -1) {
        state.boxes[index] = action.payload;
      }
    },

  },
});

export const { setBoxes, updateBox } = boxesSlice.actions;
export default boxesSlice.reducer;
