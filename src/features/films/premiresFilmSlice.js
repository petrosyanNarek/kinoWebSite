import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

const initialState = {
  premiresFilm: [],
  film: {},
  similarMovie: [],
};

export const getPremiresFilms = createAsyncThunk(
  "premiresFilm/getpremiresFilms",

  async function (action, { rejectWithValue }) {
    try {
      const item = await api.post("film/sordAndFilter", action);

      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSimilarFilms = createAsyncThunk(
  "premiresFilm/getSimilarFilms",

  async function (action, { rejectWithValue }) {
    try {
      const item = await api.post("film/sordAndFilter", action);

      return item.data.films;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFilmByid = createAsyncThunk(
  "film/getFilmById",

  async function (id, { rejectWithValue }) {
    try {
      const item = await api.get("film/filmById", {
        headers: {
          id,
        },
      });
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSeriaByid = createAsyncThunk(
  "film/getSeriaById",

  async function (id, { rejectWithValue }) {
    try {
      const item = await api.get("series/getSeriesById", {
        headers: {
          id,
        },
      });
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const premireFilmSlice = createSlice({
  name: "premiresFilm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPremiresFilms.fulfilled, (state, action) => {
        state.premiresFilm = action.payload.films;
      })
      .addCase(getSimilarFilms.fulfilled, (state, action) => {
        state.similarMovie = action.payload;
      })
      .addCase(getFilmByid.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(getFilmByid.rejected, (state, action) => {
        state.film = {};
      })
      .addCase(getSeriaByid.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(getSeriaByid.rejected, (state, action) => {
        state.film = {};
      });
  },
});

export const selectPremireFilms = (state) => state.premireFilms.premiresFilm;
export const selectFilm = (state) => state.premireFilms.film;
export const selectSimilarFilm = (state) => state.premireFilms.similarMovie;

export default premireFilmSlice.reducer;
