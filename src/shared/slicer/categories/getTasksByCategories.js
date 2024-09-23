import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const getTasksByCategoryThunk = createAsyncThunk(
  'tasksByCategory/getTasksByCategoryThunk',
  async ({ categoryId, page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/categories/${categoryId}/get-tasks-by-category`,
        {
          params: { page, pageSize },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch tasks';
      return rejectWithValue(message);
    }
  }
);

const getTasksByCategory = createSlice({
  name: 'tasksByCategory',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
    pages: 1,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTasksByCategoryThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTasksByCategoryThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = 'succeeded';
        state.tasks = action.payload;
        state.pages = action.payload.pages;
      })
      .addCase(getTasksByCategoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default getTasksByCategory.reducer;
