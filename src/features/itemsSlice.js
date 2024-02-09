import { createSlice } from "@reduxjs/toolkit";

// slice allows mutating state values

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
  },
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      const index = state.indexOf(action.payload);
      if (index > -1) state.splice(index, 1);
    },
    removeAll: (state, action) => {
      state = state.filter((item) => item !== action.payload);
    },
  },
});

export const { add, remove, removeAll } = itemsSlice.actions;

export const selectItems = (state) => state.items.items;

export default itemsSlice.reducer;
