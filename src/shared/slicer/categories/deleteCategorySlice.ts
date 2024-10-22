import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

export const deleteCategoryThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("deleteCategory/deleteCategoryThunk", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(
      `categories/delete-category/${id}`
    );
    return response.data.message;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

interface DeleteCategoryState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

const initialState: DeleteCategoryState = {
  status: "idle",
  error: null,
  message: null,
};

const deleteCategorySlice = createSlice({
  name: "deleteCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        deleteCategoryThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        deleteCategoryThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to delete category";
        }
      );
  },
});

export default deleteCategorySlice.reducer;
