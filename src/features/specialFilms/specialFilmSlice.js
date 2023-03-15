import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
const initialState = {
  specialFilms: [],
  totalPages: [],
  loading: false,
};

export const getDefoultFilms = createAsyncThunk(
  "specialFilms/getspecialFilms",

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

const specialFilmsSlice = createSlice({
  name: "specialFilms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDefoultFilms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDefoultFilms.fulfilled, (state, action) => {
        state.totalPages = [...Array(action.payload.totalPageCount)];
        state.specialFilms = action.payload.films;
        state.loading = false;
      });
  },
});

export const selectSpecialFilms = (state) => state.specialFilms.specialFilms;
export const selectTotalPages = (state) => state.specialFilms.totalPages;
export const selectLoading = (state) => state.specialFilms.loading;

export default specialFilmsSlice.reducer;
// export const { } = specialFilmsSlice.actions;
