import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";
const initialState = {
  specialFilms: [],
  totalPages: [],
  loading: false,
  error: null,
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
      .addCase(getDefoultFilms.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(getDefoultFilms.fulfilled, (state, action) => {
        state.totalPages = [...Array(action.payload.totalPageCount)];
        state.specialFilms = action.payload.films;
        state.loading = false;
        state.error = null;
      });
  },
});

export const selectSpecialFilms = (state) => state.specialFilms.specialFilms;
export const selectTotalPages = (state) => state.specialFilms.totalPages;
export const selectLoading = (state) => state.specialFilms.loading;
export const selectError = (state) => state.specialFilms.error;

export default specialFilmsSlice.reducer;
// export const { } = specialFilmsSlice.actions;
