export const similarFilmsOp = (film) => {
  const {
    categoryId,
    cardImg,
    sliderImg,
    video,
    trailer,
    series,
    id,
    createdAt,
    updatedAt,
    authors,
    actors,
    countries,
    genres,
    views,
    rating,
    ...similarMovie
  } = film;

  return {
    ...similarMovie,
    genres: genres?.map((e) => e.id),
    countries: countries?.map((e) => e.id),
    actors: actors?.map((e) => e.id),
    authors: authors?.map((e) => e.id),
  };
};
