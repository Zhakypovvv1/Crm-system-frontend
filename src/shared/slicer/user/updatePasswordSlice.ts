import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

interface UpdatePasswordState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const updatePasswordThunk = createAsyncThunk<
  void,
  UpdatePasswordPayload,
  { rejectValue: string }
>(
  "updatePassword/updatePasswordThunk",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      console.log(currentPassword, newPassword);
      const response = await axiosInstance.patch("user/update-password", {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

const initialState: UpdatePasswordState = {
  status: "idle",
  error: null,
};

const updatePasswordSlice = createSlice({
  name: "updatePassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePasswordThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePasswordThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(
        updatePasswordThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || null;
        }
      );
  },
});

export default updatePasswordSlice.reducer;
