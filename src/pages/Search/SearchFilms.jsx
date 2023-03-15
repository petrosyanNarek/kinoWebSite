import { useSearchParams } from "react-router-dom";
import { FilmsByGanre } from "./../../components/filmsByGanre/FilmsByGanre";

export const SearchFilms = () => {
  const [searchParams] = useSearchParams();
  const searchKey = searchParams.get("fiter");

  return <FilmsByGanre name={searchKey} genreId={null} countryId={null} />;
};
