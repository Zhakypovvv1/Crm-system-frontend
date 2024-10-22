import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";

interface Tag {
  name: string;
  _id: string;
}

export const getTagsThunk = createAsyncThunk<
  Tag[],
  void,
  { rejectValue: string }
>("tag/getTagsThunk", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`tags/get-tags`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

interface TagsState {
  items: Tag[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TagsState = {
  items: [],
  status: "idle",
  error: null,
};

const getTagsSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTagsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getTagsThunk.fulfilled,
        (state, action: PayloadAction<Tag[]>) => {
          console.log(action.payload);
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(
        getTagsThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch tags";
        }
      );
  },
});

export default getTagsSlice.reducer;
