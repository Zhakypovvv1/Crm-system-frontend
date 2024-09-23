import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface UserData {
  name?: string;
  email?: string;
}

interface ProfileState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const updateProfileThunk = createAsyncThunk<
  void,
  UserData,
  { rejectValue: string }
>("profile/updateProfileThunk", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch("user/update-profile", userData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

const initialState: ProfileState = {
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(
        updateProfileThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || null;
        }
      );
  },
});

export default profileSlice.reducer;
