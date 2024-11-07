import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";
import { TasksType } from "../../types/Tasks/TasksType";

interface GetTasksByTagPayload {
  tagId: string | undefined;
  page: number;
  pageSize: number;
}

interface GetTasksByTagResponse {
  tasks: TasksType[];
  pages: number;
}

export const getTasksByTagThunk = createAsyncThunk<
  GetTasksByTagResponse,
  GetTasksByTagPayload,
  { rejectValue: string }
>(
  "tasks/getTasksByTag",
  async ({ tagId, page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`tags/${tagId}/tasksByTag`, {
        params: { page, pageSize },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

interface TasksByTagState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  tasks: TasksType[];
  pages: number;
}

const initialState: TasksByTagState = {
  status: "idle",
  error: null,
  tasks: [],
  pages: 1,
};

const getTasksByTagSlice = createSlice({
  name: "tasksByTag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasksByTagThunk.pending, (state: TasksByTagState) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getTasksByTagThunk.fulfilled,
        (
          state: TasksByTagState,
          action: PayloadAction<GetTasksByTagResponse>
        ) => {
          console.log(action.payload);

          state.status = "succeeded";
          state.tasks = action.payload.tasks;
          state.pages = action.payload.pages;
        }
      )
      .addCase(
        getTasksByTagThunk.rejected,
        (state: TasksByTagState, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch tasks";
        }
      );
  },
});

export default getTasksByTagSlice.reducer;
