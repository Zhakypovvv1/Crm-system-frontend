import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface EditNoteParams {
  id: string | undefined;
  formData: Record<string, unknown>;
}

interface EditNoteState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

export const editNoteThunk = createAsyncThunk<
  string,
  EditNoteParams,
  { rejectValue: string }
>("editNote/editNoteThunk", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(
      `notes/${id}/note-edit`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

const initialState: EditNoteState = {
  status: "idle",
  error: null,
  message: null,
};

const editNoteSlice = createSlice({
  name: "editNote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editNoteThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        editNoteThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        editNoteThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Unknown error";
        }
      );
  },
});

export default editNoteSlice.reducer;
