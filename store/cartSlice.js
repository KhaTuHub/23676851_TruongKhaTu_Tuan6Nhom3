import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // Thêm sản phẩm
    addToCart: (state, action) => {
      const bookId = String(action.payload.bookId);

      const existingItem = state.items.find(
        (item) => item.bookId === bookId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          bookId: bookId,
          quantity: 1,
        });
      }
    },

    // Xóa sản phẩm
    removeFromCart: (state, action) => {
      const bookId = String(action.payload);

      state.items = state.items.filter(
        (item) => item.bookId !== bookId
      );
    },

    // Cập nhật số lượng
    updateQuantity: (state, action) => {
      const {
        bookId,
        quantity,
      } = action.payload;

      const id = String(bookId);

      const item = state.items.find(
        (item) => item.bookId === id
      );

      if (!item) {
        return;
      }

      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.bookId !== id
        );
      } else {
        item.quantity = quantity;
      }
    },

    // Xóa toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
