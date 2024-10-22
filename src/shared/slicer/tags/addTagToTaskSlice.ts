import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";
import { TasksType } from "../../types/Tasks/TasksType";

interface TaskState {
  items: TasksType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TaskState = {
  items: [],
  status: "idle",
  error: null,
};

export const addTagsToTaskThunk = createAsyncThunk<
  TasksType[],
  { taskId: string; tagIds: string[] },
  { rejectValue: string }
>(
  "tagToTask/addTagsToTask",
  async ({ taskId, tagIds }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/tags/${taskId}/addTag-to-task`,
        {
          tagIds,
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

const addTagsToTaskSlice = createSlice({
  name: "tagToTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTagsToTaskThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addTagsToTaskThunk.fulfilled,
        (state, action: PayloadAction<TasksType[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(
        addTagsToTaskThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to add tags to task";
        }
      );
  },
});

export default addTagsToTaskSlice.reducer;
