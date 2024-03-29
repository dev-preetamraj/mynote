import { colors } from "@/lib/colors";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DrawState {
  toolbarOpen: boolean;
  erasorActive: boolean;
  erasorWidth: number;
  lineWidth: number;
  lineColor: string;
  canvasHistory: string[];
  currentStep: number;
}

const initialState: DrawState = {
  toolbarOpen: false,
  erasorActive: false,
  erasorWidth: 40,
  lineWidth: 2,
  lineColor: colors.find((item) => item.id === 1)!.hex,
  canvasHistory: [],
  currentStep: -1,
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
    setCanvasHistory: (state, action: PayloadAction<string[]>) => {
      state.canvasHistory = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});

export const {
  handleToolbarOpenClose,
  handleErasorActivity,
  setErasorWidth,
  setLineWidth,
  setLineColor,
  setCanvasHistory,
  setCurrentStep,
} = drawSlice.actions;

export default drawSlice.reducer;
