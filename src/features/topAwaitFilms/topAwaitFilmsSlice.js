import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";
const initialState = {
  topAwaitFilms: [],
  loading: false,
  error: null,
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
    builder
      .addCase(getAwaitFilms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAwaitFilms.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(getAwaitFilms.fulfilled, (state, action) => {
        state.topAwaitFilms = action.payload.films;
        state.loading = false;
        state.error = null;
      });
  },
});

export const selectAwaitFilms = (state) => state.topAwaitFilms.topAwaitFilms;
export const selectAwaitFilmsLoading = (state) => state.topAwaitFilms.loading;
export const selectAwaitFilmsError = (state) => state.topAwaitFilms.error;

export default topAwaitFilmsSlice.reducer;
