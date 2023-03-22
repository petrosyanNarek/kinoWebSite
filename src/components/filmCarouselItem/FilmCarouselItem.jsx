export const FilmCarouselItem = ({ film, active }) => {
  return (
    <div
      className={
        active === true ? "carousel-item h-100 active " : "carousel-item h-100"
      }
      style={{
        backgroundImage: `url(${
          process.env.REACT_APP_BACKEND_PATH + film.posterUrlPreview
        })`,
      }}
    >
      <div className="carousel-caption film-slid-desc">
        <h6>{film.nameEn ? film.nameEn : film.nameRu}</h6>
        <p>{film.shortDescription}</p>
      </div>
    </div>
  );
};
