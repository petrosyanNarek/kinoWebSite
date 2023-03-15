import { HeaderSlider } from "../../components/headerSlider/HeaderSlider";
import { SpecialFilms } from "../../components/specialFilms/SpecialFilms";
import { CarouselHomeFilms } from "./../../components/carouselHomeFilms/CarouselHomeFilms";
import { MostPopularMovies } from "./../../components/mostPopularMovies/MostPopularMovies";

export const Home = () => {
  return (
    <div className="main">
      <HeaderSlider />
      <CarouselHomeFilms />
      <SpecialFilms />
      <MostPopularMovies />
    </div>
  );
};
