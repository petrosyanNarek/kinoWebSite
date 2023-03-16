import { Film } from "../film/Film";
import "./CarouselHomeFilms.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getPremiresFilms,
  selectPremireFilms,
  selectPremireFilmsError,
  selectPremireFilmsloadingFilm,
} from "../../features/films/premiresFilmSlice";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper";
import "swiper/css";
import { LoadingSpinner } from "../UI/spinner/Spinner";
import { Navigate } from "react-router-dom";

function returnElementCount(width, film) {
  return film
    ? width >= 1900
      ? 4
      : width >= 1500
      ? 3
      : width >= 950
      ? 2
      : 1
    : width >= 1900
    ? 5
    : width >= 1500
    ? 4
    : width >= 950
    ? 3
    : width >= 500
    ? 2
    : 1;
}

export const CarouselHomeFilms = (props) => {
  const dispatch = useDispatch();
  const films = useSelector(selectPremireFilms);
  const filmsLoading = useSelector(selectPremireFilmsloadingFilm);
  const filmsError = useSelector(selectPremireFilmsError);
  const [windowWidth, setWindowWhith] = useState(window.innerWidth);
  const updateWindowDimensions = () => {
    const newWidth = window.innerWidth;
    setWindowWhith(newWidth);
  };
  useEffect(() => {
    dispatch(getPremiresFilms());
  }, [dispatch]);
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="container  mb-5 d-flex justify-content-center">
        <div className="film-slider-maket">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6 text-right d-flex justify-content-end"></div>
            <div className="col-12">
              <div
                id="carouselHomeControls"
                className="carousel slide"
                data-ride="carousel"
              >
                {filmsLoading ? (
                  <LoadingSpinner />
                ) : filmsError ? (
                  <Navigate to="/error500" replace={true} />
                ) : (
                  <Swiper
                    slidesPerView={returnElementCount(windowWidth, props.films)}
                    spaceBetween={0}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay, FreeMode, Pagination]}
                    id="my-swiper-home"
                  >
                    <div data-bs-interval="1000">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-3 row-cols-xl-6">
                            {props.films
                              ? props.films.map((movItem) => {
                                  return (
                                    <SwiperSlide key={movItem.id}>
                                      <Film film={movItem} />
                                    </SwiperSlide>
                                  );
                                })
                              : films.map((movItem) => {
                                  return (
                                    <SwiperSlide key={movItem.id}>
                                      <Film film={movItem} />
                                    </SwiperSlide>
                                  );
                                })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
