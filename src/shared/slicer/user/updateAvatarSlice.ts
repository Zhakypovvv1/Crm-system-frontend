import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosUserInstance } from "../../api/axiosConfig";

export const updateAvatarThunk = createAsyncThunk<
  void,
  FormData,
  { rejectValue: string }
>("avatar/updateAvatarThunk", async (formData, { rejectWithValue }) => {
  try {
    console.log(formData);
    const response = await axiosUserInstance.patch(
      "user/upload-avatar",
      formData
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

interface AvatarState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AvatarState = {
  status: "idle",
  error: null,
};

const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAvatarThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateAvatarThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(
        updateAvatarThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to update avatar";
        }
      );
  },
});

export default avatarSlice.reducer;
