import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoxData } from "../data/types";

interface BoxesState {
  boxes: BoxData[];
}

const initialState: BoxesState = {
  boxes: [],
};

const boxesSlice = createSlice({
  name: "boxes",
  initialState,
  reducers: {
    setBoxes: (state, action: PayloadAction<BoxData[]>) => {
      state.boxes = action.payload;
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
