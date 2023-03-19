import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../api";

const initialState = {
  premiresFilm: [],
  film: {},
  similarMovie: [],
  loading: false,
  error: null,
  loadingFilm: false,
  loadingSeries: false,
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

export const addFilmComment = createAsyncThunk(
  "film/addFilmComment",

  async function (comment, { rejectWithValue }) {
    try {
      const item = await api.post("comment/newComment", comment);
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCommentAnwser = createAsyncThunk(
  "film/addCommentAnwser",

  async function (comment, { rejectWithValue }) {
    try {
      const item = await api.post("commentAnwser/newComment", { comment });
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

export const setFilmView = createAsyncThunk(
  "film/setFilmViw",
  async function ({ filmId, seriaId }, { rejectWithValue }) {
    console.log(filmId, seriaId);
    const item = await axios.get("https://api.ipify.org?format=json");
    const ip = item.data.ip;
    if (ip) {
      await api.get("filmview/add", {
        headers: {
          film_id: filmId,
          serial_id: seriaId,
          ip,
        },
      });
    }
  }
);

export const setFilmCommentRating = createAsyncThunk(
  "film/setCommentRating",
  async function (commentRating, { rejectWithValue }) {
    try {
      await api.post("commentRating", commentRating);

    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const premireFilmSlice = createSlice({
  name: "premiresFilm",
  initialState,
  reducers: {
    addComment: (state, action) => {
      const data = new Date();
      state.film.comments.push({
        ...action.payload,
        createdAt: data.toString(),
        positiveRating: 0,
        negativeRating: 0,
        id: Date.now(),
      });
    },
    setCommentRating: (state, action) => {
      const { rating, id, userId } = action.payload
      const newComment = state.film.comments.find(
        (e) => e.id === id
      );
      const ratingCom = newComment.comment_ratings?.find((e => e.userId === userId))
      if (ratingCom) {
        if (ratingCom.commentRating === rating) {
          if (rating) {
            newComment.commentLike -= 1;
          } else {
            newComment.commentDisLike -= 1;
          }
          newComment.comment_ratings = newComment.comment_ratings.filter(e => e.id !== ratingCom.id)
        } else {
          if (rating) {
            newComment.commentLike += 1;
            newComment.commentDisLike -= 1;
          } else {
            newComment.commentLike -= 1;
            newComment.commentDisLike += 1;
          }
          ratingCom.commentRating = !ratingCom.commentRating
        }
      } else {
        if (rating) {
          newComment.commentLike += 1;
        } else {
          newComment.commentDisLike += 1;
        }
        newComment.comment_ratings.push({ userId: userId, commentRating: rating, commentId: newComment.id })
      }
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getPremiresFilms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPremiresFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getPremiresFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.premiresFilm = action.payload.films;
      })
      .addCase(getSimilarFilms.fulfilled, (state, action) => {
        state.similarMovie = action.payload;
      })
      .addCase(getFilmByid.pending, (state, action) => {
        state.loadingFilm = true;
      })
      .addCase(getFilmByid.rejected, (state, action) => {
        state.loadingFilm = false;
        state.error = action.payload.message;
      })
      .addCase(getFilmByid.fulfilled, (state, action) => {
        state.loadingFilm = false;
        state.error = null;
        state.film = action.payload;
      })
      .addCase(getSeriaByid.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSeriaByid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getSeriaByid.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.film = action.payload;
      });
  },
});

export const selectPremireFilms = (state) => state.premireFilms.premiresFilm;
export const selectPremireFilmsloadingFilm = (state) =>
  state.premireFilms.loading;
export const selectPremireFilmsError = (state) => state.premireFilms.error;
export const selectLoadingFilm = (state) => state.premireFilms.loadingFilm;
export const selectFilmsError = (state) => state.premireFilms.error;
export const selectFilm = (state) => state.premireFilms.film;
export const selectSimilarFilm = (state) => state.premireFilms.similarMovie;

export default premireFilmSlice.reducer;
export const { addComment, setCommentRating } = premireFilmSlice.actions;
