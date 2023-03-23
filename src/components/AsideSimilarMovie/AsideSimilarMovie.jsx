import { useSelector } from "react-redux";
import { selectSimilarFilm } from "../../features/films/premiresFilmSlice";
import "./AsideSimilarMovie.scss";
import { Link } from "react-router-dom";

export const AsideSimilarMovie = () => {
  const similarFilms = useSelector(selectSimilarFilm);
  return (
    <>
      <h3>Up Next</h3>
      <div className="similar-movies mt-4">
        {similarFilms.length &&
          similarFilms?.map((film) => {
            return (
              <div className="movie-item mb-2" key={film.id}>
                <div className="similar-movie-img">
                  <Link to={"/film/" + film.id}>
                    <img
                      src={process.env.REACT_APP_BACKEND_PATH + film.cardImg}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="similar-movies-info">
                  <a href="/" className="similar-movies-title">
                    {film.name}
                  </a>
                  <ul>
                    {film.authors.map((author) => {
                      return (
                        <li key={author.id}>
                          <a className="similar-movies-author-link" href="/">
                            {`${author.name} ${author.surname}`}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="viws">{film.views} views</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
