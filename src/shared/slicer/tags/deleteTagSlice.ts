import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

export const deleteTagThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("deleteTag/deleteTagThunk", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`tags/delete-tag/${id}`);
    return response.data.message;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

interface TagsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

const initialState: TagsState = {
  status: "idle",
  error: null,
  message: null,
};

const deleteTagSlice = createSlice({
  name: "deleteTag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTagThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(
        deleteTagThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          console.log(action.payload);
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        deleteTagThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to delete tag";
        }
      );
  },
});

export default deleteTagSlice.reducer;
