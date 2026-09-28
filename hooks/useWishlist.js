import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  toggleWishlist,
  clearWishlist,
} from "../store/wishlistSlice";

export const useWishlist = () => {
  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.wishlist.items
  );

  const toggleItem = (bookId) => {
    dispatch(
      toggleWishlist(bookId)
    );
  };

  const isFavorite = (bookId) => {
    return items.includes(
      String(bookId)
    );
  };

  const clear = () => {
    dispatch(clearWishlist());
  };

  return {
    items,
    toggleItem,
    isFavorite,
    clear,
  };
};
