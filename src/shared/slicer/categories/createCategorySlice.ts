import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface CreateCategoryState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  message: string | null;
}

const initialState: CreateCategoryState = {
  status: "idle",
  error: null,
  message: null,
};

export const createCategoryThunk = createAsyncThunk<
  string,
  Record<string, unknown>,
  { rejectValue: string }
>("createCategory/createCategoryThunk", async (name, { rejectWithValue }) => {
  console.log(name);

  try {
    const response = await axiosInstance.post(
      `categories/create-category`,
      name
    );
    return response.data.message;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

const createCategorySlice = createSlice({
  name: "createCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        createCategoryThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        }
      )
      .addCase(
        createCategoryThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to create category";
        }
      );
  },
});

export default createCategorySlice.reducer;
