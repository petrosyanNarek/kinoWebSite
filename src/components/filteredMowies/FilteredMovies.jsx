import { Film } from "../film/Film";

export const FilteredMovies = ({ specialFilms }) => {
  return (
    <div
      className={"row row-cols-2 row-cols-sm-3 row-cols-lg-4  row-cols-xl-6"}
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
