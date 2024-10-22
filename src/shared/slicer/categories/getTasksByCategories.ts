import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";
import { TasksType } from "../../types/Tasks/TasksType";

interface GetTasksByCategoryResponse {
  tasks: TasksType[];
  pages: number;
}

interface GetTasksByCategoryParams {
  categoryId: string | undefined;
  page: number;
  pageSize: number;
}

interface GetTasksByCategoryState {
  tasks: TasksType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pages: number;
}

const initialState: GetTasksByCategoryState = {
  tasks: [],
  status: "idle",
  error: null,
  pages: 1,
};

export const getTasksByCategoryThunk = createAsyncThunk<
  GetTasksByCategoryResponse,
  GetTasksByCategoryParams,
  { rejectValue: string }
>(
  "tasksByCategory/getTasksByCategoryThunk",
  async ({ categoryId, page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/categories/${categoryId}/get-tasks-by-category`,
        {
          params: { page, pageSize },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

const getTasksByCategories = createSlice({
  name: "tasksByCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasksByCategoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getTasksByCategoryThunk.fulfilled,
        (state, action: PayloadAction<GetTasksByCategoryResponse>) => {
          console.log(action.payload);
          state.status = "succeeded";
          state.tasks = action.payload.tasks;
          state.pages = action.payload.pages;
        }
      )
      .addCase(
        getTasksByCategoryThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch tasks";
        }
      );
  },
});

export default getTasksByCategories.reducer;
