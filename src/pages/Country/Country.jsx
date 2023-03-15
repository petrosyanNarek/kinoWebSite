import { useParams } from "react-router-dom";
import { MovieRewiews } from "../../components/movieReviws/MovieReviews";
import { FilmsByGanre } from "./../../components/filmsByGanre/FilmsByGanre";

export const Country = () => {
  const id = +useParams().id;
  return (
    <>
      <FilmsByGanre countryId={id} />
      <MovieRewiews />
    </>
  );
};
