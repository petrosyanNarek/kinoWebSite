import { AsideSimilarMovie } from "../AsideSimilarMovie/AsideSimilarMovie";
import { CommentsBar } from "../commentsBar/CommentsBar";
import "./FilmPage.scss";
import { useState } from "react";
import { MoviesSection } from "../moviesSection/MoviesSection";
import { CarouselHomeFilms } from "../carouselHomeFilms/CarouselHomeFilms";
import { FilterMenuBar } from "../FilterMenuBar/FilterMenuBar";
export const FilmPage = ({ film }) => {
  const [videoPlay, setVideoPlay] = useState(false);
  const [isTrailer, setIstrailer] = useState(true);
  const filterManu = [
    {
      name: "Trailer",
      id: 1,
      istrailer: true,
    },
    {
      name: "Video",
      id: 2,
      istrailer: false,
    },
  ];
  console.log(isTrailer);
  return (
    <div className="movies-section mt-5">
      <div className="container mt-5 d-flex justify-content-center">
        <div className="popular-movies">
          <div className="row film-all-bar">
            <div className="col-lg-8 film-play h-50">
              <h1>{film.name}</h1>
              <p className="display-6">
                {film.sezon
                  ? ` Sezon : ${film.sezon}  Part : ${film.part}`
                  : film.part
                  ? `Part : ${film.part}`
                  : ""}
              </p>
              <div className="mx-3">
                <FilterMenuBar
                  filterManu={filterManu}
                  setIstrailer={setIstrailer}
                  setVideoPlay={setVideoPlay}
                />
              </div>
              {isTrailer ? (
                <div className="film-video">
                  {!videoPlay ? (
                    <>
                      <img src={film.cardImg} alt="" className="mt-3" />
                      <button
                        className="play fa-solid fa-circle-play btn"
                        onClick={() => setVideoPlay(true)}
                      ></button>
                    </>
                  ) : (
                    <video
                      width="100%"
                      src={film.trailer}
                      controls={true}
                      autoPlay
                    ></video>
                  )}
                </div>
              ) : (
                <div className="film-video">
                  {!videoPlay ? (
                    <>
                      <img src={film.cardImg} alt="" className="mt-3" />
                      <button
                        className="play fa-solid fa-circle-play btn"
                        onClick={() => setVideoPlay(true)}
                      ></button>
                    </>
                  ) : (
                    <video
                      width="100%"
                      src={film.video}
                      controls={true}
                      autoPlay
                    ></video>
                  )}
                </div>
              )}
              <CommentsBar />
            </div>
            <div className="col-lg-4 aside-similar-movie mt-2">
              <AsideSimilarMovie similarMovie={film} />
            </div>
          </div>
          {film.series && film.series.length && (
            <MoviesSection name={film.name + " series"}>
              <CarouselHomeFilms films={film.series} />
            </MoviesSection>
          )}
        </div>
      </div>
    </div>
  );
};