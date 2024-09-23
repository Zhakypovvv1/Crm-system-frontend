import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";
import { TasksType } from "../../types/Tasks/TasksType";
import { RootState } from "../../../app/Provider/store/store";
import { AxiosRequestConfig } from "axios";

interface FetchTasksParams {
  page: number;
  pageSize: number;
  search: string;
  sortBy: string;
  sortOrder: string;
}

interface FetchTasksResponse {
  tasks: TasksType[];
  pages: number;
  total: number;
}

interface TasksState {
  items: TasksType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pages: number;
  total: number;
}

export const fetchTasksThunk = createAsyncThunk<
  FetchTasksResponse,
  FetchTasksParams,
  { rejectValue: string; state: RootState }
>(
  "tasks/fetchTasksThunk",
  async (
    { page, pageSize, search = "", sortBy = "createdAt", sortOrder = "desc" },
    { rejectWithValue, getState }
  ) => {
    try {
      const token: string | null = getState().getToken.token;
      const config: AxiosRequestConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: { page, pageSize, search, sortBy, sortOrder },
      };
      const response = await axiosInstance.get("tasks/get-tasks", config);
      return response.data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

const initialState: TasksState = {
  items: [],
  status: "idle",
  error: null,
  pages: 1,
  total: 0,
};

const getTasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchTasksThunk.fulfilled,
        (state, action: PayloadAction<FetchTasksResponse>) => {
          state.status = "succeeded";
          state.items = action.payload.tasks;
          state.pages = action.payload.pages;
          state.total = action.payload.total;
        }
      )
      .addCase(
        fetchTasksThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || null;
        }
      );
  },
});

export default getTasksSlice.reducer;
