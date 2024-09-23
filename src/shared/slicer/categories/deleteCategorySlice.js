import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const deleteCategoryThunk = createAsyncThunk(
  'deleteCategory/deleteCategoryThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `categories/delete-category/${id}`
      );
      return response.data.message;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete category';
      return rejectWithValue(message);
    }
  }
);

const deleteCategorySlice = createSlice({
  name: 'deleteCategory',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteCategoryThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default deleteCategorySlice.reducer;
