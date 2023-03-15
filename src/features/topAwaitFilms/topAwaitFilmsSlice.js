import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";
const initialState = {
  topAwaitFilms: [],
};

export const getAwaitFilms = createAsyncThunk(
  "awairFilms/getAwaitFilms",

  async function (_, { rejectWithValue }) {
    try {
      const item = await api.post("film/sordAndFilter", {
        sortBy: "rating",
        sortOrder: "DESC",
      });

      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const topAwaitFilmsSlice = createSlice({
  name: "awaitFilms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAwaitFilms.fulfilled, (state, action) => {
      state.topAwaitFilms = action.payload.films;
    });
  },
});

export const selectAwaitFilms = (state) => state.topAwaitFilms.topAwaitFilms;

export default topAwaitFilmsSlice.reducer;
