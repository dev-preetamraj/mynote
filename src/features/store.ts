import { configureStore } from "@reduxjs/toolkit";
import drawReducer from "@/features/draw/drawSlice";

export const store = configureStore({
  reducer: {
    draw: drawReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
