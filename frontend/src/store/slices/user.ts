import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isAdmin: boolean;
}

const initialState: AppState = {
  isAdmin: false,
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAdminStatus: (state) => {
      state.isAdmin = !state.isAdmin;
    },
  },
});

export const UserReducer = UsersSlice.reducer;
export const {setAdminStatus} = UsersSlice.actions;
