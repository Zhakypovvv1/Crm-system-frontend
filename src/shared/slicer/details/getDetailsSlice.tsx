import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosConfig";
import { TasksType } from "../../types/Tasks/TasksType";

interface Details {
  id: string;
  text: string;
  task: TasksType
}

interface DetailsState {
  items: Details | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

type GetDetailsResponse = Details;

export const getDetailsThunk = createAsyncThunk<
  GetDetailsResponse,
  string,
  { rejectValue: string }
>("details/getDetailsThunk", async (taskId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/details/${taskId}/get-details`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("Unknown error");
  }
});

const initialState: DetailsState = {
  items: null,
  status: "idle",
  error: null,
};

const getDetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        getDetailsThunk.fulfilled,
        (state, action: PayloadAction<Details>) => {
          console.log(action.payload);
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(
        getDetailsThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || null;
        }
      );
  },
});

export default getDetailsSlice.reducer;
