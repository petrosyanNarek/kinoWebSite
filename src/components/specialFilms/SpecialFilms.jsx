import "./SpecialFilms.scss";
import { MoviesSection } from "../moviesSection/MoviesSection";
import { FilterMenuBar } from "./../FilterMenuBar/FilterMenuBar";
import { useSelector } from "react-redux";
import { selectSpecialFilms } from "../../features/specialFilms/specialFilmSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDefoultFilms } from "./../../features/specialFilms/specialFilmSlice";
import { FilteredMovies } from "../filteredMowies/FilteredMovies";
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getDefoultFilms({ sortBy: "createdAt", sortOrder: "DESC", limit: 12 })
    );
  }, [dispatch]);

  return (
    <MoviesSection name="FEATURED MOVIES">
      <div className="container mb-5 d-flex justify-content-center">
        <div className="special-film">
          <FilterMenuBar filterManu={filterManu} getFilms={getDefoultFilms} />
          <FilteredMovies specialFilms={specialFilms} />
        </div>
      </div>
    </MoviesSection>
  );
};
