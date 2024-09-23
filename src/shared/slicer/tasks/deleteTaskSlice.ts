import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

export const deleteTaskThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("deleteTask/deleteTaskThunk", async (taskId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`tasks/delete-task/${taskId}`);
    return response.data.message;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

interface DeleteTaskState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

const initialState: DeleteTaskState = {
  status: "idle",
  error: null,
  message: null,
};

const deleteTaskSlice = createSlice({
  name: "deleteTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTaskThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        deleteTaskThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        deleteTaskThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || null;
        }
      );
  },
});

export default deleteTaskSlice.reducer;
