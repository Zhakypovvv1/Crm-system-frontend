import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface DeleteNoteResponse {
  message: string;
}

interface DeleteNoteState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

export const deleteNoteThunk = createAsyncThunk<
  DeleteNoteResponse,
  string,
  { rejectValue: string }
>("deleteNote/deleteNoteThunk", async (noteId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`notes/${noteId}/note-delete`);
    return response.data.message;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

const initialState: DeleteNoteState = {
  status: "idle",
  error: null,
  message: null,
};

const deleteNoteSlice = createSlice({
  name: "deleteNote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteNoteThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        deleteNoteThunk.fulfilled,
        (state, action: PayloadAction<DeleteNoteResponse>) => {
          state.status = "succeeded";
          state.message = action.payload.message;
        }
      )
      .addCase(
        deleteNoteThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Unknown error";
        }
      );
  },
});

export default deleteNoteSlice.reducer;
