import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const deleteDetailsThunk = createAsyncThunk(
  'deleteDetails/deleteDetailsThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `details/${id}/delete-details`
      );
      return response.data.message;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to delete details';
      return rejectWithValue(message);
    }
  }
);

const deleteDetailsSlice = createSlice({
  name: 'deleteDetails',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteDetailsThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteDetailsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(deleteDetailsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default deleteDetailsSlice.reducer;
