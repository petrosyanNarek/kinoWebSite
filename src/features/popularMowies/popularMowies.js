import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
const initialState = {
  popularMowies: [],
  totalPages: 0,
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
    builder.addCase(getpopularFilms.fulfilled, (state, action) => {
      state.popularMowies = action.payload.films;
      state.totalPages = action.payload.totalPageCount - 1;
    });
  },
});

export const selectpopularMowies = (state) => state.popularMowies.popularMowies;
export const selectTotalPages = (state) => state.popularMowies.totalPages;

export default popularMowiesSlice.reducer;
// export const { } = specialFilmsSlice.actions;
