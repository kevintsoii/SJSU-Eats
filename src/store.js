import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./features/itemsSlice";

export default configureStore({
  reducer: {
    items: itemsReducer,
  },
});
