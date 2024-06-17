import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  username: string | null;
  role: string | null;
  //   isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  username: null,
  role: null,
  //   isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; username: string; role: string }>
    ) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.role = action.payload.role;
      // console.log("===== State Login=====");
      // console.log(state.token);
      // console.log(state.username);
      // console.log(state.role);
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.role = null;
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      // console.log("===== State Logout=====");
      // console.log(state.token);
      // console.log(state.username);
      // console.log(state.role);
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
