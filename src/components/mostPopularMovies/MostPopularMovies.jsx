import { MoviesSection } from "../moviesSection/MoviesSection";
import "./MostPopularMovies.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getpopularFilms,
  selectpopularMowies,
  selectpopularMowiesError,
  selectTotalPages,
} from "../../features/popularMowies/popularMowies";
import { Film } from "../film/Film";
import { Link, Navigate } from "react-router-dom";
import { selectpopularMowiesLoading } from "./../../features/popularMowies/popularMowies";
import { LoadingSpinner } from "../UI/spinner/Spinner";
import { FilmRating } from "../film/FilmRating";
export const MostPopularMovies = () => {
  const dispatch = useDispatch();
  const [videoPlay, setVideoPlay] = useState(false);

  const [page, setPage] = useState(1);
  const popularMovies = useSelector(selectpopularMowies);
  const totalPages = useSelector(selectTotalPages);
  const loading = useSelector(selectpopularMowiesLoading);
  const error = useSelector(selectpopularMowiesError);
  useEffect(() => {
    dispatch(
      getpopularFilms({
        sortBy: "views",
        sortOrder: "DESC",
        limit: 7,
        page,
      })
    );
  }, [dispatch, page]);
  return (
    <MoviesSection name="Most Popular Movies">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Navigate to="/error500" replace={true} />
      ) : (
        <div className="container  mb-5 d-flex justify-content-center">
          <div className="popular-movies">
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6 text-right d-flex justify-content-end">
                <button
                  className="prev-and-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                  onClick={() => {
                    page !== 1 ? setPage(page - 1) : setPage(totalPages);
                    setVideoPlay(false);
                  }}
                ></button>
                <button
                  className="prev-and-next next-icon"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                  onClick={() => {
                    page < totalPages ? setPage(page + 1) : setPage(1);
                    setVideoPlay(false);
                  }}
                ></button>
              </div>
              <div className="col-12">
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div
                      className={"carousel-item active"}
                      key={popularMovies[0]?.id}
                    >
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <div className="card">
                            <div className="movie row row-cols-1 row-cols-sm-1 row-cols-lg-1 row-cols-xl-2">
                              <div className="col movies-vidio film-video">
                                {!videoPlay ? (
                                  <>
                                    <img
                                      src={popularMovies[0]?.cardImg}
                                      alt=""
                                      className="w-100"
                                    />
                                    <button
                                      className="play fa-solid fa-circle-play btn"
                                      onClick={() => setVideoPlay(true)}
                                    ></button>
                                  </>
                                ) : (
                                  <video
                                    width="100%"
                                    src={popularMovies[0]?.video}
                                    controls={true}
                                    autoPlay
                                  ></video>
                                )}
                              </div>
                              <div className="col movies-info">
                                <div className="info">
                                  <Link to={"film/" + popularMovies[0]?.id}>
                                    <p className="movies-name">
                                      {popularMovies[0]?.name}
                                    </p>
                                  </Link>

                                  <p className="movies-story">
                                    <span className="movies-title">Year :</span>
                                    <span className="movies-des">
                                      {popularMovies[0]?.createdYear}
                                    </span>
                                  </p>
                                  <p className="movies-story">
                                    <span className="movies-title">
                                      Genres :
                                    </span>
                                    <span className="movies-genre">
                                      {popularMovies[0]?.genres?.map(
                                        (ganre) => {
                                          return ganre.name + " | ";
                                        }
                                      )}
                                    </span>
                                  </p>
                                  <div className="movies-story">
                                    <span className="movies-title">
                                      Rating :
                                    </span>
                                    <span className="movies-des">
                                      <FilmRating
                                        rating={popularMovies[0]?.rating}
                                        color={"white"}
                                      />
                                    </span>
                                  </div>
                                  <p className="movies-story">
                                    <span className="movies-title">
                                      Short Description :
                                    </span>
                                    <span className="movies-des">
                                      {popularMovies[0]?.shortDescription}
                                      Lorem ipsum, dolor sit amet consectetur
                                      adipisicing elit. Tempora, soluta porro
                                      ratione doloremque vitae quaerat
                                      architecto ab ipsum? Accusantium sint
                                      mollitia fuga asperiores quidem vel esse
                                      quisquam, excepturi dolorum aspernatur sit
                                      adipisci eaque enim suscipit voluptatum.
                                      Minima error fugiat iste maiores amet
                                      similique, laudantium a distinctio hic, ut
                                      praesentium recusandae aut nemo libero
                                      porro eum mollitia voluptatem,
                                      reprehenderit impedit sequi accusantium!
                                      Impedit in quis deleniti delectus iusto
                                      sequi reiciendis rem veniam, et voluptatum
                                      earum. Minus sint suscipit quae itaque,
                                      exercitationem nemo nam fugiat qui
                                      facilis. Aperiam veritatis quidem,
                                      repudiandae molestiae repellendus modi,
                                      velit error voluptas corporis, deserunt
                                      incidunt illum assumenda!
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-3 row-cols-xl-6">
                            {popularMovies?.map((movies, i) => {
                              if (i > 0) {
                                return (
                                  <div
                                    className="col mb-3 film-carousel-card"
                                    key={movies.id}
                                  >
                                    <Film film={movies} />
                                  </div>
                                );
                              } else {
                                return "";
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MoviesSection>
  );
};
