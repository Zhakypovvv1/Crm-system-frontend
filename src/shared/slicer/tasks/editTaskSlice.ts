import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";
import { RootState } from "../../../app/Provider/store/store";

interface EditTaskPayload {
  id: string | undefined;
  formData: Record<string, unknown>;
}

interface EditTaskState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

export const editTaskThunk = createAsyncThunk<
  string,
  EditTaskPayload,
  { rejectValue: string; state: RootState }
>(
  "editTask/editTaskThunk",
  async ({ id, formData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().getToken.token;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.patch(
        `tasks/edit-task/${id}`,
        formData,
        config
      );
      return response.data.editTask;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

const initialState: EditTaskState = {
  status: "idle",
  error: null,
  message: null,
};

const editTaskSlice = createSlice({
  name: "editTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editTaskThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        editTaskThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        editTaskThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || null;
        }
      );
  },
});

export default editTaskSlice.reducer;
