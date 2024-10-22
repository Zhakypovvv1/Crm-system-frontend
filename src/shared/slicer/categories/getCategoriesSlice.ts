import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface Category {
  _id: string;
  name: string;
  userId: string;
}

interface FetchCategoriesParams {
  page: number;
  pageSize: number;
}

interface CategoriesResponse {
  categories: Category[];
  pages: number;
}

export const getCategoryThunk = createAsyncThunk<
  CategoriesResponse,
  FetchCategoriesParams,
  { rejectValue: string }
>(
  "category/getCategoryThunk",
  async ({ page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`categories/get-categories`, {
        params: { page, pageSize },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown error");
    }
  }
);

interface CategoriesState {
  items: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pages: number;
}

const initialState: CategoriesState = {
  items: [],
  status: "idle",
  error: null,
  pages: 1,
};

const getCategoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getCategoryThunk.fulfilled,
        (state, action: PayloadAction<CategoriesResponse>) => {
          console.log(action.payload);
          state.status = "succeeded";
          state.items = action.payload.categories;
          state.pages = action.payload.pages;
        }
      )
      .addCase(
        getCategoryThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch categories";
        }
      );
  },
});

export default getCategoriesSlice.reducer;
