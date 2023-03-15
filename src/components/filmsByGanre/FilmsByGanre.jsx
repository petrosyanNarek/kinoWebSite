import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGanreById, selectGaner } from "../../features/genres/genre";
import { MoviesSection } from "../moviesSection/MoviesSection";
import "./FilmsByGanre.scss";
import {
  getDefoultFilms,
  selectLoading,
  selectSpecialFilms,
  selectTotalPages,
} from "../../features/specialFilms/specialFilmSlice";
import { FilteredMovies } from "../filteredMowies/FilteredMovies";
import { PaginationMenuBar } from "../paginationMenu/PaginationMenuBar";
import {
  getCountryById,
  selectCountry,
} from "./../../features/countries/countriesSlice";
import { LoadingSpinner } from "../UI/spinner/Spinner";

export const FilmsByGanre = ({ genreId, countryId, name }) => {
  const dispatch = useDispatch();
  const genre = useSelector(selectGaner);
  const country = useSelector(selectCountry);
  const films = useSelector(selectSpecialFilms);
  const totalPages = useSelector(selectTotalPages);
  const loading = useSelector(selectLoading);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (genreId) {
      dispatch(getGanreById(genreId));
      dispatch(
        getDefoultFilms({ genres: [genreId], page: activePage, limit: 24 })
      );
    } else if (countryId) {
      dispatch(getCountryById(countryId));
      dispatch(
        getDefoultFilms({ countries: [countryId], page: activePage, limit: 24 })
      );
    } else {
      dispatch(
        getDefoultFilms({ filterValue: name, page: activePage, limit: 24 })
      );
    }
    window.scrollTo(0, 0);
  }, [dispatch, genreId, countryId, name, activePage]);
  return (
    <>
      {loading ? (
        <MoviesSection name={"Loading"}>
          <div className="container mb-5 d-flex justify-content-center">
            <div className="ganere-film">
              <LoadingSpinner />
            </div>
          </div>
        </MoviesSection>
      ) : !loading && films.length === 0 ? (
        <MoviesSection name={"Noth Found"}>
          <div className="container mb-5 d-flex justify-content-center">
            <div className="ganere-film">
              <h2>
                No movie found with this
                <span className="text-danger">
                  {name ? ` value : ${name}` : countryId ? "country" : "genre"}
                </span>{" "}
              </h2>
            </div>
          </div>
        </MoviesSection>
      ) : (
        <MoviesSection
          name={genreId ? genre.name : countryId ? country.name : name}
        >
          <div className="container mb-5 d-flex justify-content-center">
            <div className="ganere-film">
              <FilteredMovies specialFilms={films} />
              {totalPages.length > 1 && (
                <PaginationMenuBar
                  totalPages={totalPages}
                  setActivePage={setActivePage}
                  activePage={activePage}
                />
              )}
            </div>
          </div>
        </MoviesSection>
      )}
    </>
  );
};
