import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tokenSlicer = createSlice({
  name: "token",
  initialState: {
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, clearToken } = tokenSlicer.actions;
export default tokenSlicer.reducer;
