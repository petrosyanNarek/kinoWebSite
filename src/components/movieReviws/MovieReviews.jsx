import { MoviesSection } from "../moviesSection/MoviesSection"
import { CarouselHomeFilms } from './../carouselHomeFilms/CarouselHomeFilms';

export const MovieRewiews = () => {
    return(
        <MoviesSection name={"MOVIE REVIEWS"}>
            <CarouselHomeFilms/>
        </MoviesSection>
    )
}