import { createSlice } from "@reduxjs/toolkit";

// slice allows mutating state values

export const itemsSlice = createSlice({
  name: "items",
  initialState: {},
  reducers: {
    add: (state, action) => {
      state[action.payload] = (state[action.payload] || 0) + 1;
    },
    remove: (state, action) => {
      if (state[action.payload] > 1) {
        state[action.payload] -= 1;
      } else {
        delete state[action.payload];
      }
    },
    removeAll: (state, action) => {
      delete state[action.payload];
    },
    clear: () => {
      return {};
    },
  },
});

export const { add, remove, removeAll, clear } = itemsSlice.actions;

export const selectItems = (state) => state.items;
export const selectSize = (state) =>
  Object.values(state.items).reduce(
    (accumulator, current) => accumulator + current,
    0
  );

export default itemsSlice.reducer;
