import { Link } from "react-router-dom";
import "./Film.scss";
export const checkFilmName = (film) => {
  if (film?.nameEn) {
    return film?.nameEn.length > 12
      ? film?.nameEn.slice(0, 12) + "..."
      : film?.nameEn;
  } else if (film?.nameRu) {
    return film?.nameRu?.length > 12
      ? film?.nameRu.slice(0, 12) + "..."
      : film?.nameRu;
  } else {
    return film?.nameOriginal.length > 12
      ? film?.nameOriginal.slice(0, 12) + "..."
      : film?.nameOriginal;
  }
};
export const Film = ({ film }) => {
  return (
    <div className="col film">
      <div className="card film-card">
        <div className="card-header">
          <img src={film.cardImg} alt="" className="card-header-img" />
          <div className="overlay">
            <div className="face">
              <Link
                to={
                  film.categoryId
                    ? `/film/${film.id}`
                    : `/film/?seriaId=${film.id}`
                }
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/860/860780.png"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text text-center card-name">{film.name}</p>
          <div className="all-info">
            <p>
              {film.createdYear
                ? film.createdYear
                : film.sezon
                ? ` Sezon : ${film.sezon}  Part : ${film.part}`
                : `Part : ${film.part}`}
            </p>
            <div className="rating">
              {[...Array(5)].map((e, i) => {
                if (film.rating >= i + 1) {
                  return (
                    <i className="fa fa-star" aria-hidden="true" key={i}></i>
                  );
                } else if (film.rating + 0.5 === i + 1) {
                  return (
                    <i
                      className="fa fa-star-half-o"
                      aria-hidden="true"
                      key={i}
                    ></i>
                  );
                } else {
                  return (
                    <i className="fa fa-star-o" aria-hidden="true" key={i}></i>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
