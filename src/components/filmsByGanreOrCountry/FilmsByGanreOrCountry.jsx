import { FilteredMovies } from "../filteredMowies/FilteredMovies"
import { MoviesSection } from "../moviesSection/MoviesSection"
import { PaginationMenuBar } from '../paginationMenu/PaginationMenuBar';
import "./FilmsByGanreOrCountry.scss"

export const FilmsByGanreOrCountry = ({id,name,movie,getFilmBy,pagItems}) => {
    return(
        <MoviesSection name={name}>
            <div className="container mb-5 d-flex justify-content-center">
                <div className="ganere-film">
                    <FilteredMovies specialFilms={movie}/>
                    {pagItems.length > 1 && <PaginationMenuBar id={name} getFilmBy={getFilmBy} pagItems={pagItems}/>}
                </div>
            </div>

        </MoviesSection>
    )
}
