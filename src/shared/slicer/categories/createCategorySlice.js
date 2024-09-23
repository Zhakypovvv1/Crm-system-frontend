import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const createCategoryThunk = createAsyncThunk(
  'createCategory/createCategoryThunk',
  async (newCategories, { rejectWithValue, getState }) => {
    try {
      const token = getState().getToken.token;
      const config = {
        Headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.post(
        `categories/create-category`,
        newCategories,
        config
      );
      return response.data.message;
    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.message || error.message || 'Falied to fetch';
      return rejectWithValue(message);
    }
  }
);

const createCategorySlice = createSlice({
  name: 'createCategory',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createCategoryThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default createCategorySlice.reducer;
