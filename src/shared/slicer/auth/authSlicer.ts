import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosNoAuthInstance } from "../../api/axiosConfig";
import { setToken } from "../token/tokenSlicer";
import { AppDispatch, RootState } from "../../../app/Provider/store/store";

interface AuthResponse {
  email: string;
  password: string;
}

export const AuthThunk = createAsyncThunk<
  AuthResponse,
  Record<string, unknown>,
  { rejectValue: string; state: RootState; dispatch: AppDispatch }
>(
  "auth/authorizationThunk",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosNoAuthInstance.post(
        "auth/authorization",
        formData
      );
      
      console.log(response.data);
      dispatch(setToken(response.data));
      return response.data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

type LoadingStatus = "idle" | "loading" | "succeeded" | "failed";

interface IState {
  status: LoadingStatus;
  error: null | string;
  message: AuthResponse | null;
}

const initialState: IState = {
  status: "idle",
  error: null,
  message: null,
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AuthThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        AuthThunk.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        AuthThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Неизвестная ошибка";
        }
      );
  },
});

export default authSlicer.reducer;
