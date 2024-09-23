import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface GetNotesParams {
  taskId: string | undefined;
  page: number;
  pageSize: number;
}

interface Note {
  _id: string;
  taskId: string;
  text: string;
  createdAt: string;
}

interface GetNotesResponse {
  notes: Note[];
  pages: number;
}

interface GetNotesState {
  items: Note[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pages: number;
}

export const getNoteThunk = createAsyncThunk<
  GetNotesResponse,
  GetNotesParams,
  { rejectValue: string }
>(
  "notes/getNoteThunk",
  async ({ taskId, page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`notes/${taskId}/get-notes`, {
        params: { page, pageSize },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

const initialState: GetNotesState = {
  items: [],
  status: "idle",
  error: null,
  pages: 1,
};

const getNoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNoteThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getNoteThunk.fulfilled,
        (state, action: PayloadAction<GetNotesResponse>) => {
          state.status = "succeeded";
          state.items = action.payload.notes;
          state.pages = action.payload.pages;
        }
      )
      .addCase(
        getNoteThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Unknown error";
        }
      );
  },
});

export default getNoteSlice.reducer;
