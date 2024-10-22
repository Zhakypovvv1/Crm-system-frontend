import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface AddTaskState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

export const addTaskThunk = createAsyncThunk<
  string,
  Record<string, unknown>,
  { rejectValue: string }
>("addTask/addTaskThunk", async (newTask, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("tasks/create-task", newTask);
    return response.data.message;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

const initialState: AddTaskState = {
  status: "idle",
  error: null,
  message: null,
};

const addTaskSlice = createSlice({
  name: "addTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTaskThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        addTaskThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        addTaskThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Неизвестная ошибка";
        }
      );
  },
});

export default addTaskSlice.reducer;
