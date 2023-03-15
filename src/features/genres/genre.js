import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

const initialState = {
  genres: [],
  genre: {},
};

export const getGanreById = createAsyncThunk(
  "ganre/getGenreById",
  async function (id, { rejectWithValue }) {
    try {
      const item = await api.get("genre/getGenreById", {
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

export const getGanres = createAsyncThunk(
  "ganre/getGanres",
  async function (_, { rejectWithValue }) {
    try {
      const item = await api.get("genre/allGenre");

      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const genreSlice = createSlice({
  name: "filmsByGanre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGanres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      .addCase(getGanreById.fulfilled, (state, action) => {
        state.genre = action.payload;
      });
  },
});

export const selectFilmsByGaner = (state) => state.genres.genres;
export const selectGaners = (state) => state.genres.genres;
export const selectGaner = (state) => state.genres.genre;
export default genreSlice.reducer;
