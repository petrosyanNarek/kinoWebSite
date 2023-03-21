import { FilmRating } from "../film/FilmRating";

export const AboutFilm = ({ film }) => {
  return (
    <div className="film-section">
      <h3 className="fw-bold m-4">
        About The{" "}
        {film.categoryId === 1
          ? "Film"
          : film.categoryId === 2
          ? "Tv Series"
          : film.categoryId === 3
          ? "Tv Shows"
          : "Seria"}
      </h3>
      <dl className="row">
        {film.categoryId && (
          <>
            <dt className="col-sm-3">Production year</dt>
            <dd className="col-sm-9">{film.createdYear}</dd>

            <dt className="col-sm-3">Countries</dt>
            <dd className="col-sm-9">
              <p>
                {film.countries?.map((country, i) =>
                  i > 0 ? " | " + country.name : country.name
                )}
              </p>
            </dd>

            <dt className="col-sm-3">Genre(s)</dt>
            <dd className="col-sm-9">
              {film.genres?.map((genre, i) =>
                i > 0 ? " | " + genre.name : genre.name
              )}
            </dd>

            <dt className="col-sm-3 text-truncate">Author(s)</dt>
            <dd className="col-sm-9">
              {film.authors?.map((author, i) =>
                i > 0
                  ? `| ${author.name} ${author.surname}`
                  : `${author.name} ${author.surname}`
              )}
            </dd>

            <dt className="col-sm-3">Actor(s)</dt>
            <dd className="col-sm-9">
              {film.actors?.map((actor, i) =>
                i > 0
                  ? `| ${actor.name} ${actor.surname}`
                  : `${actor.name} ${actor.surname}`
              )}
            </dd>
          </>
        )}
        <dt className="col-sm-3">Short Description</dt>
        <dd className="col-sm-9">{film.shortDescription}</dd>
        <dt className="col-sm-3">Description</dt>
        <dd className="col-sm-9">{film.description}</dd>
        <dt className="col-sm-3">Rating</dt>
        <dd className="col-sm-9">
          <FilmRating rating={film.rating} />
        </dd>
        <dt className="col-sm-3">Views</dt>
        <dd className="col-sm-9">{film.views}</dd>
      </dl>
    </div>
  );
};
