import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userEmail: null,
  userName: null,
  userId: null,
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
  },
});

export const { setActiveUser, removeActiveUser } = authSlice.actions;

export default authSlice.reducer;
