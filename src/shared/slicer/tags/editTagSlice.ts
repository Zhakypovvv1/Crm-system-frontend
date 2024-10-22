import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface EditTagPayload {
  id: string;
  formData: Record<string, unknown>;
}

export const editTagThunk = createAsyncThunk<
  string,
  EditTagPayload,
  { rejectValue: string }
>("editTag/editTagThunk", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(`tags/edit-tag/${id}`, formData);
    return response.data.editTag;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

interface EditTagState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

const initialState: EditTagState = {
  status: "idle",
  error: null,
  message: null,
};

const editTagSlice = createSlice({
  name: "editTag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editTagThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(
        editTagThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        editTagThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to edit tag";
        }
      );
  },
});

export default editTagSlice.reducer;
