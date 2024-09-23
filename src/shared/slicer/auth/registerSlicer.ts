import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosNoAuthInstance } from "../../api/axiosConfig";
import { setToken } from "../token/tokenSlicer";
import { AppDispatch, RootState } from "../../../app/Provider/store/store";

interface AuthResponse {
  name: string;
  email: string;
  password: string;
}
export const registerThunk = createAsyncThunk<
  AuthResponse,
  Record<string, unknown>,
  { rejectValue: string; state: RootState; dispatch: AppDispatch }
>("register/registerThunk", async (formData, { rejectWithValue, dispatch }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axiosNoAuthInstance.post(
      "auth/register",
      formData,
      config
    );
    if (response.data.token) {
      dispatch(setToken(response.data.token));
    }
    return response.data.message;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

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

const registerSlicer = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        registerThunk.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        registerThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Неизвестная ошибка";
        }
      );
  },
});

export default registerSlicer.reducer;
