import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface CreateDetailsArgs {
  id: string | undefined;
  newDetails: Record<string, unknown>;
}

interface CreateDetailsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

export const createDetailsThunk = createAsyncThunk<
  string,
  CreateDetailsArgs,
  { rejectValue: string }
>(
  "createDetails/createDetailsThunk",
  async ({ id, newDetails }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `details/${id}/create-details`,
        newDetails
      );
      return response.data.message;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

const initialState: CreateDetailsState = {
  status: "idle",
  error: null,
  message: null,
};

const createDetailsSlice = createSlice({
  name: "createDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDetailsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createDetailsThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        createDetailsThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || null;
        }
      );
  },
});

export default createDetailsSlice.reducer;
