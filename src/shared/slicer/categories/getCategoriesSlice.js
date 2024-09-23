import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const getCategoryThunk = createAsyncThunk(
  'category/getCategoryThunk',
  async ({ page, pageSize }, { rejectWithValue, getState }) => {
    try {
      const token = getState().getToken.token;
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.get(
        `categories/get-categories`,
        {
          params: { page, pageSize },
        },
        config
      );
      return response.data;
    } catch (error) {
      const message = error.message || 'Failed to fetch';
      return rejectWithValue(message);
    }
  }
);

const getCategoriesSlice = createSlice({
  name: 'category',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    pages: 1,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategoryThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCategoryThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = 'succeeded';
        state.items = action.payload.categories;
        state.pages = action.payload.pages;
      })
      .addCase(getCategoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default getCategoriesSlice.reducer;
