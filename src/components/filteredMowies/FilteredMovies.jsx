import { Film } from "../film/Film";

export const FilteredMovies = ({ specialFilms }) => {
  return (
    <div
      className={
        specialFilms.length >= 12
          ? "row row-cols-2 row-cols-sm-3 row-cols-lg-4  row-cols-xl-6 px-2"
          : specialFilms.length < 6
          ? "row row-cols-1 row-cols-sm-1 row-cols-lg-1 row-cols-xl-1 "
          : "row row-cols-2 row-cols-sm-2 row-cols-lg-2 row-cols-xl-3 "
      }
    >
      {specialFilms?.map((film) => {
        return (
          <div className="col film-maket" key={film.id}>
            <Film film={film} />
          </div>
        );
      })}
    </div>
  );
};
