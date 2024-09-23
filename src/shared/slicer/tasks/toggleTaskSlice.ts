import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";
import { RootState } from "../../../app/Provider/store/store";

export const toggleTaskThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: RootState }
>("toggleTask/toggleTaskThunk", async (id, { rejectWithValue, getState }) => {
  try {
    const token = getState().getToken.token;
    const config = {
      Headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axiosInstance.patch(
      `tasks/toggle-status/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

interface ToggleTaskState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

const initialState: ToggleTaskState = {
  status: "idle",
  error: null,
  message: null,
};

const toggleTaskSlice = createSlice({
  name: "toggleTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleTaskThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        toggleTaskThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        toggleTaskThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || null;
        }
      );
  },
});

export default toggleTaskSlice.reducer;
