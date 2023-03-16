import { FilterMenuBar } from "../FilterMenuBar/FilterMenuBar";
import { MoviesSection } from "../moviesSection/MoviesSection";
import "./TvSeries.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FilteredMovies } from "../filteredMowies/FilteredMovies";
import {
  getDefoultFilms,
  selectError,
  selectLoading,
  selectSpecialFilms,
} from "../../features/specialFilms/specialFilmSlice";
import { LoadingSpinner } from "../UI/spinner/Spinner";
import { Navigate } from "react-router-dom";

export const TvSeriesDashBoard = () => {
  const filterManu = [
    {
      name: "Featured",
      id: 1,
      action: {
        sortBy: "createdAt",
        sortOrder: "DESC",
        categoryId: 2,
        limit: 12,
      },
    },
    {
      name: "Top viewed",
      id: 2,
      action: { sortBy: "views", sortOrder: "DESC", categoryId: 2, limit: 12 },
    },
    {
      name: "Top Rating",
      id: 3,
      action: { sortBy: "rating", sortOrder: "DESC", categoryId: 2, limit: 12 },
    },
    {
      name: "Recently Added",
      id: 4,
      action: {
        sortBy: "createdAt",
        sortOrder: "DESC",
        categoryId: 2,
        limit: 12,
      },
    },
  ];

  const dispatch = useDispatch();
  const specialFilms = useSelector(selectSpecialFilms);
  const specialFilmsLoading = useSelector(selectLoading);
  const specialFilmsError = useSelector(selectError);
  useEffect(() => {
    dispatch(
      getDefoultFilms({ sortBy: "createdAt", sortOrder: "DESC", categoryId: 2 })
    );
  }, [dispatch]);
  return (
    <MoviesSection name="Tv Series">
      <div className="container mb-5 d-flex justify-content-center">
        <div className="tv-series">
          <FilterMenuBar filterManu={filterManu} getFilms={getDefoultFilms} />
          {specialFilmsLoading ? (
            <LoadingSpinner />
          ) : specialFilmsError ? (
            <Navigate to="/error500" replace={true} />
          ) : (
            <FilteredMovies specialFilms={specialFilms} />
          )}
        </div>
      </div>
    </MoviesSection>
  );
};
