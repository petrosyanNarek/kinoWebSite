import { configureStore } from "@reduxjs/toolkit";
import premiresFilmSlice from "../features/films/premiresFilmSlice";
import topAwaitFilmsSlice from "../features/topAwaitFilms/topAwaitFilmsSlice";
import specailFilmsSlice from "./../features/specialFilms/specialFilmSlice";
import genreSlice from "../features/genres/genre";
import countriesSlice from "../features/countries/countriesSlice";
import popularMowiesSlice from "./../features/popularMowies/popularMowies";
export const store = configureStore({
  reducer: {
    premireFilms: premiresFilmSlice,
    specialFilms: specailFilmsSlice,
    topAwaitFilms: topAwaitFilmsSlice,
    genres: genreSlice,
    countries: countriesSlice,
    popularMowies: popularMowiesSlice,
  },
});
