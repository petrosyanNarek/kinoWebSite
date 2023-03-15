import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { News } from "./../pages/News/News";
import { Genres } from "./../pages/Genres/Genres";
import { TvSeries } from "./../pages/TvSeries/TvSeries";
import { ShortCodes } from "./../pages/ShortCodes/ShortCodes";
import { Country } from "./../pages/Country/Country";
import { AfromZ } from "./../pages/AfromZ/AfromZ";
import { SearchFilms } from "../pages/Search/SearchFilms";
import { FilmById } from "../pages/FilmById/FilmById";

export const Routering = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<News />} />
      <Route path="/genres/:id" element={<Genres />} />
      <Route path="/tvseries" element={<TvSeries />} />
      <Route path="/shortCodes" element={<ShortCodes />} />
      <Route path="/countrys/:id" element={<Country />} />
      <Route path="/afromz" element={<AfromZ />} />
      <Route path="/search" element={<SearchFilms />} />
      <Route path="/film" element={<FilmById />} />
      <Route path="/film/:id" element={<FilmById />} />
    </Routes>
  );
};
