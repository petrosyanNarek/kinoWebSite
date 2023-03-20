import { Link } from "react-router-dom";
import "./Film.scss";
import { FilmRating } from "./FilmRating";
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
                    : `/film/?seria=${film.id}`
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
            <FilmRating rating={film.rating} />
          </div>
        </div>
      </div>
    </div>
  );
};
