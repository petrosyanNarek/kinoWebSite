import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Genres } from "./../pages/Genres/Genres";
import { TvSeries } from "./../pages/TvSeries/TvSeries";
import { Country } from "./../pages/Country/Country";
import { SearchFilms } from "../pages/Search/SearchFilms";
import { FilmById } from "../pages/FilmById/FilmById";
import { Error500 } from "../components/eror500/Error500";

export const Routering = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/genres/:id" element={<Genres />} />
      <Route path="/tvseries" element={<TvSeries />} />
      <Route path="/countrys/:id" element={<Country />} />
      <Route path="/search" element={<SearchFilms />} />
      <Route path="/film" element={<FilmById />} />
      <Route path="/film/:id" element={<FilmById />} />
      <Route path="error500" element={<Error500 />} />
    </Routes>
  );
};
