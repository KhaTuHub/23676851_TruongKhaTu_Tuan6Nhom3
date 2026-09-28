import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  login,
  logout,
} from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const {
    user,
    token,
    isLoggedIn,
  } = useSelector(
    (state) => state.auth
  );

  const loginUser = (
    user,
    token
  ) => {
    dispatch(
      login({
        user,
        token,
      })
    );
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isLoggedIn,
    loginUser,
    logoutUser,
  };
};
