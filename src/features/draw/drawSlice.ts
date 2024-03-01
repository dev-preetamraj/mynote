import { colors } from "@/lib/colors";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DrawState {
  toolbarOpen: boolean;
  erasorActive: boolean;
  erasorWidth: number;
  lineWidth: number;
  lineColor: string;
}

const initialState: DrawState = {
  toolbarOpen: false,
  erasorActive: false,
  erasorWidth: 40,
  lineWidth: 2,
  lineColor: colors.find((item) => item.id === 1)!.hex,
};

export const drawSlice = createSlice({
  name: "draw",
  initialState,
  reducers: {
    handleToolbarOpenClose: (state, actions: PayloadAction<boolean>) => {
      state.toolbarOpen = actions.payload;
    },
    handleErasorActivity: (state, action: PayloadAction<boolean>) => {
      state.erasorActive = action.payload;
    },
    setErasorWidth: (state, action: PayloadAction<number>) => {
      state.erasorWidth = action.payload;
    },
    setLineWidth: (state, action: PayloadAction<number>) => {
      state.lineWidth = action.payload;
    },
    setLineColor: (state, action: PayloadAction<string>) => {
      state.lineColor = action.payload;
    },
  },
});

export const {
  handleToolbarOpenClose,
  handleErasorActivity,
  setErasorWidth,
  setLineWidth,
  setLineColor,
} = drawSlice.actions;

export default drawSlice.reducer;
