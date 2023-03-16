import "./SpecialFilms.scss";
import { MoviesSection } from "../moviesSection/MoviesSection";
import { FilterMenuBar } from "./../FilterMenuBar/FilterMenuBar";
import { useSelector } from "react-redux";
import {
  selectError,
  selectLoading,
  selectSpecialFilms,
} from "../../features/specialFilms/specialFilmSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDefoultFilms } from "./../../features/specialFilms/specialFilmSlice";
import { FilteredMovies } from "../filteredMowies/FilteredMovies";
import { LoadingSpinner } from "../UI/spinner/Spinner";
import { Navigate } from "react-router-dom";
export const SpecialFilms = () => {
  const filterManu = [
    {
      name: "Featured",
      id: 1,
      action: { sortBy: "createdAt", sortOrder: "DESC", limit: 12 },
    },
    {
      name: "Top viewed",
      id: 2,
      action: { sortBy: "views", sortOrder: "DESC", limit: 12 },
    },
    {
      name: "Top Rating",
      id: 3,
      action: { sortBy: "rating", sortOrder: "DESC", limit: 12 },
    },
    {
      name: "Recently Added",
      id: 4,
      action: { sortBy: "createdAt", sortOrder: "DESC", limit: 12 },
    },
  ];

  const specialFilms = useSelector(selectSpecialFilms);
  const specialFilmsLoading = useSelector(selectLoading);
  const specialError = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getDefoultFilms({ sortBy: "createdAt", sortOrder: "DESC", limit: 12 })
    );
  }, [dispatch]);

  return (
    <MoviesSection name="FEATURED MOVIES">
      {specialFilmsLoading ? (
        <LoadingSpinner />
      ) : specialError ? (
        <Navigate to="/error500" replace={true} />
      ) : (
        <div className="container mb-5 d-flex justify-content-center">
          <div className="special-film">
            <FilterMenuBar filterManu={filterManu} getFilms={getDefoultFilms} />
            <FilteredMovies specialFilms={specialFilms} />
          </div>
        </div>
      )}
    </MoviesSection>
  );
};
