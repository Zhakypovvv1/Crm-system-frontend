import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

export const createTagThunk = createAsyncThunk<
  string,
  Record<string, unknown>,
  { rejectValue: string }
>("createTag/createTagThunk", async (newTag, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`tags/create-tag`, newTag);
    return response.data.message;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

interface CreateTagState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

const initialState: CreateTagState = {
  status: "idle",
  error: null,
  message: null,
};

const createTagSlice = createSlice({
  name: "createTag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTagThunk.pending, (state: CreateTagState) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(
        createTagThunk.fulfilled,
        (state: CreateTagState, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        createTagThunk.rejected,
        (state: CreateTagState, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to create tag";
        }
      );
  },
});

export default createTagSlice.reducer;
