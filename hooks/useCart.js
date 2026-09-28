import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.cart.items
  );

  // Tổng số lượng sản phẩm
  const totalQuantity = items.reduce(
    (total, item) => {
      return total + item.quantity;
    },
    0
  );

  const addItem = (bookId) => {
    dispatch(
      addToCart({
        bookId,
      })
    );
  };

  const removeItem = (bookId) => {
    dispatch(
      removeFromCart(bookId)
    );
  };

  const updateItemQuantity = (
    bookId,
    quantity
  ) => {
    dispatch(
      updateQuantity({
        bookId,
        quantity,
      })
    );
  };

  const clear = () => {
    dispatch(clearCart());
  };

  return {
    items,
    totalQuantity,
    addItem,
    removeItem,
    updateItemQuantity,
    clear,
  };
};
