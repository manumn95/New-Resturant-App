import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./userSlice";
import productSlices from "./productSlice";
export const store = configureStore({
  reducer: {
    user: userSlices,
    product:productSlices
  },
});
