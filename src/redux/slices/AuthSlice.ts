import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interface";

// Define a type for the slice state
export interface ILoginReduxState {
  user?: User;
  access_token?: string;
  isLogin: boolean;
}

// Define the initial state using that type
const initialState: ILoginReduxState = {
  user: undefined,
  access_token: undefined,
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<ILoginReduxState>) => {
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
      state.isLogin = true;
    },
    updateSuccess: (state, action: PayloadAction<ILoginReduxState>) => {
      state.user = action.payload.user;
      state.isLogin = action.payload.isLogin;
    },
    logOut: (state) => {
      state.isLogin = false;
      state.user = undefined;
      state.access_token = undefined;
    },
  },
});

export const { loginSuccess, logOut, updateSuccess } = authSlice.actions;
export default authSlice.reducer;
