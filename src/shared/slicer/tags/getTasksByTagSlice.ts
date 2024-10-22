import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";
import { TasksType } from "../../types/Tasks/TasksType";

interface GetTasksByTagPayload {
  tagId: string | undefined;
  page: number;
  pageSize: number;
}

export const getTasksByTagThunk = createAsyncThunk<
  TasksType[],
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
        (state: TasksByTagState, action: PayloadAction<TasksType[]>) => {
          console.log(action.payload);

          state.status = "succeeded";
          state.tasks = action.payload;
          state.pages = 1;
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
