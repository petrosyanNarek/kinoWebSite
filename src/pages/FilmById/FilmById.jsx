import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  getFilmByid,
  getSeriaByid,
  getSimilarFilms,
  selectFilm,
} from "../../features/films/premiresFilmSlice";
import { FilmPage } from "./../../components/filmPage/FilmPage";
import { MovieRewiews } from "../../components/movieReviws/MovieReviews";
import { similarFilmsOp } from "../../hooks/createSimilarNowiesOp";
export const FilmById = () => {
  const filmId = useParams().id;
  const [searchParams] = useSearchParams();
  const seriaId = searchParams.get("seriaId");
  const dispatch = useDispatch();
  const film = useSelector(selectFilm);
  console.log(seriaId);
  useEffect(() => {
    if (!seriaId) {
      dispatch(getFilmByid(filmId))
        .unwrap()
        .then((film) => {
          dispatch(getSimilarFilms({ ...similarFilmsOp(film), limit: 15 }));
        });
    } else {
      dispatch(getSeriaByid(seriaId))
        .unwrap()
        .then((film) => {
          dispatch(getSimilarFilms({ ...similarFilmsOp(film), limit: 15 }));
        });
    }
    window.scrollTo(0, 0);
  }, [filmId, dispatch, seriaId]);
  return (
    <>
      <FilmPage film={film} />
      <MovieRewiews />
    </>
  );
};
