import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
const initialState = {
  popularMowies: [],
  totalPages: 0,
  loadind: false,
  error: null,
};

export const getpopularFilms = createAsyncThunk(
  "popularMowies/getpopularFilms",

  async function (action, { rejectWithValue }) {
    try {
      const item = await api.post("film/sordAndFilter", {
        ...action,
      });

      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const popularMowiesSlice = createSlice({
  name: "popularMowies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getpopularFilms.pending, (state, action) => {
        state.loadind = true;
      })
      .addCase(getpopularFilms.rejected, (state, action) => {
        state.loadind = false;
        state.error = action.payload.message;
      })
      .addCase(getpopularFilms.fulfilled, (state, action) => {
        state.loadind = false;
        state.error = null;
        state.popularMowies = action.payload.films;
        state.totalPages = action.payload.totalPageCount - 1;
      });
  },
});

export const selectpopularMowies = (state) => state.popularMowies.popularMowies;
export const selectpopularMowiesLoading = (state) =>
  state.popularMowies.loadind;
export const selectpopularMowiesError = (state) => state.popularMowies.error;
export const selectTotalPages = (state) => state.popularMowies.totalPages;

export default popularMowiesSlice.reducer;
// export const { } = specialFilmsSlice.actions;
