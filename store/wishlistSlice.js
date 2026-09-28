import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    toggleWishlist: (state, action) => {
      const bookId = String(action.payload);

      const exists = state.items.includes(bookId);

      if (exists) {
        state.items = state.items.filter(
          (id) => id !== bookId
        );
      } else {
        state.items.push(bookId);
      }
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
