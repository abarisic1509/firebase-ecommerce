import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userEmail: null,
  userName: null,
  userId: null,
  redirectPath: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      const { userEmail, userName, userId } = action.payload;
      state.isLoggedIn = true;
      state.userEmail = userEmail;
      state.userName = userName;
      state.userId = userId;
    },
    removeActiveUser: (state, action) => {
      state.isLoggedIn = false;
      state.userEmail = null;
      state.userName = null;
      state.userId = null;
    },
    setRedirectPath: (state, action) => {
      state.redirectPath = action.payload;
    },
  },
});

export const { setActiveUser, removeActiveUser, setRedirectPath } =
  authSlice.actions;

export default authSlice.reducer;
