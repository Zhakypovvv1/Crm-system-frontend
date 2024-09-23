import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosConfig';

export const createTagThunk = createAsyncThunk(
  'createTag/createTagThunk',
  async (newTag, { rejectWithValue, getState }) => {
    try {
      const token = getState().getToken.token;
      const config = {
        Headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosInstance.post(
        `tags/create-tag`,
        newTag,
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

const createTagSlice = createSlice({
  name: 'createTag',
  initialState: {
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createTagThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createTagThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(createTagThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default createTagSlice.reducer;
