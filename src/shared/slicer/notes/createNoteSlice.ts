import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface CreateNoteParams {
  taskId: string | undefined;
  newNote: Record<string, unknown>
}

interface CreateNoteResponse {
  message: string;
}

interface CreateNoteState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

export const createNoteThunk = createAsyncThunk<
  CreateNoteResponse,
  CreateNoteParams,
  { rejectValue: string }
>(
  "createNote/createNoteThunk",
  async ({ taskId, newNote }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `notes/${taskId}/create-note`,
        newNote
      );
      return response.data.message;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

const initialState: CreateNoteState = {
  status: "idle",
  error: null,
  message: null,
};

const createNoteSlice = createSlice({
  name: "createNote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNoteThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createNoteThunk.fulfilled,
        (state, action: PayloadAction<CreateNoteResponse>) => {
          state.status = "succeeded";
          state.message = action.payload.message;
        }
      )
      .addCase(
        createNoteThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Unknown error";
        }
      );
  },
});

export default createNoteSlice.reducer;
