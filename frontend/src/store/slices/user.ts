import { createSlice } from "@reduxjs/toolkit";
import { ROLE, UserDetails } from "../../types/User";

interface AppState {
  user?: UserDetails | null;
  layout: ROLE;
}

const initialState: AppState = {
  user: null,
  layout: "USER",
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUserDetails: (state, action) => {
      state.user = action.payload;
    },
    clearUserDetails: (state) => {
      state.user = null;
    },
    changeLayout: (state, action) => {
      state.layout = action.payload;
    },
  },
});

export const UserReducer = UsersSlice.reducer;
export const { setCurrentUserDetails, clearUserDetails,changeLayout } = UsersSlice.actions;
