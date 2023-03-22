import { useSelector } from "react-redux";
import {
  selectAwaitFilms,
  selectAwaitFilmsError,
  selectAwaitFilmsLoading,
} from "../../features/topAwaitFilms/topAwaitFilmsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getAwaitFilms } from "./../../features/topAwaitFilms/topAwaitFilmsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "./HeaderSlider.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay } from "swiper";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import { Link, Navigate } from "react-router-dom";
import { LoadingSpinner } from "../UI/spinner/Spinner";

export const HeaderSlider = () => {
  const progressCircle = useRef(null);
  const [animationChek, setAnimationChek] = useState(false);
  const onAutoplayTimeLeft = (s, time, progress) => {
    try {
      if (progress < 1) {
        setAnimationChek(true);
      } else {
        setAnimationChek(false);
      }
    } catch {}
  };
  const awaitFilms = useSelector(selectAwaitFilms);
  const awaitFilmsLoading = useSelector(selectAwaitFilmsLoading);
  const awaitFilmsError = useSelector(selectAwaitFilmsError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAwaitFilms());
  }, [dispatch]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="header-slider">
      {awaitFilmsLoading ? (
        <LoadingSpinner />
      ) : awaitFilmsError ? (
        <Navigate to="/error500" replace={true} />
      ) : (
        <Swiper
          spaceBetween={10}
          // freeMode={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Autoplay, FreeMode, Navigation, Thumbs, Pagination]}
          className="mySwiper2"
        >
          {awaitFilms?.map((film, i) => {
            return (
              <SwiperSlide key={film.id}>
                <div className="main-slider">
                  <img
                    src={process.env.REACT_APP_BACKEND_PATH + film.cardImg}
                    alt=""
                  />
                  <div className="slider-content">
                    <div className="time-slider">
                      <div
                        className={"animation-start"}
                        style={
                          animationChek
                            ? { animationName: "timing" }
                            : { animationName: "none" }
                        }
                        ref={progressCircle}
                      ></div>
                    </div>
                    <Link to={"film/" + film.id}>{film.name}</Link>
                    <p className="film-desc">{film.shortDescription}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <div className="aside-items">
        {!awaitFilmsError && (
          <Swiper
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            slidesPerView={5}
            direction={"vertical"}
            onSwiper={setThumbsSwiper}
            spaceBetween={2}
            watchSlidesProgress={true}
            modules={[Autoplay, FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {awaitFilms?.map((filmItem, i) => {
              return (
                <SwiperSlide key={filmItem.id}>
                  <div className="d-flex w-100 h-100">
                    <div className="aside-items-img">
                      <img
                        src={
                          process.env.REACT_APP_BACKEND_PATH + filmItem.cardImg
                        }
                        alt=""
                      />
                    </div>
                    <div className="aside-item-info">
                      <h6>{filmItem.name}</h6>
                      <p>{filmItem.shortDescription}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};
