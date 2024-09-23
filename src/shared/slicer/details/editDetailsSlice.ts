import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface EditDetailsPayload {
  id: string | undefined;
  formData: Record<string, unknown>;
}

interface EditDetailsResponse {
  message: string;
}

export const editDetailsThunk = createAsyncThunk<
  EditDetailsResponse,
  EditDetailsPayload,
  { rejectValue: string }
>(
  "editDetails/editDetailsThunk",
  async ({ id, formData }, { rejectWithValue }) => {
    console.log(id, formData);

    try {
      const response = await axiosInstance.patch(
        `details/${id}/edit-details`,
        formData
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

interface EditDetailsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

const initialState: EditDetailsState = {
  status: "idle",
  error: null,
  message: null,
};

const editDetailsSlice = createSlice({
  name: "editDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editDetailsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        editDetailsThunk.fulfilled,
        (state, action: PayloadAction<EditDetailsResponse>) => {
          state.status = "succeeded";
          state.message = action.payload.message;
        }
      )
      .addCase(
        editDetailsThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || null;
        }
      );
  },
});

export default editDetailsSlice.reducer;
