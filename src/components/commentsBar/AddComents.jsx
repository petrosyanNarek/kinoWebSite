import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import {
  addFilmComment,
  updateFilmRating,
  updateSeriesRating,
} from "../../features/films/premiresFilmSlice";
import { getUser, selectLoginUser } from "../../features/user/userSlice";
import { useParams, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectFilm } from "./../../features/films/premiresFilmSlice";
import io from "socket.io-client";

export const CommentsSchema = yup.object().shape({
  message: yup.string().required("Message is a required !!!"),
});

const socket = io.connect(process.env.REACT_APP_SOCET_IO_CONNECT);
export const AddComents = () => {
  const dispatch = useDispatch();
  const filmId = +useParams().id;
  const [searchParams] = useSearchParams();
  const seriesId = +searchParams.get("seria");
  const { email, ...user } = useSelector(selectLoginUser);
  const film = useSelector(selectFilm);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(CommentsSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const onSubmitHandler = (data) => {
    if (localStorage.getItem("id")) {
      dispatch(getUser(localStorage.getItem("id")))
        .unwrap()
        .then((user) => {
          if (filmId) {
            dispatch(addFilmComment({ ...data, filmId, userId: user.id }))
              .unwrap()
              .then((com) => {
                const { userId, ...newCom } = com;
                socket.emit("send_message", {
                  ...newCom,
                  rating: (film.rating + data.rating) / 2,
                  id: com.id,
                  user,
                  filmId,
                  room: `film${filmId}`,
                });
              });

            dispatch(
              updateFilmRating({
                id: filmId,
                rating: (film.rating + data.rating) / 2,
              })
            );
          } else {
            dispatch(addFilmComment({ ...data, seriesId, userId: user.id }))
              .unwrap()
              .then((com) => {
                const { userId, ...newCom } = com;
                socket.emit("send_message", {
                  rating: (film.rating + data.rating) / 2,
                  ...newCom,
                  user,
                  seriesId,
                  room: `seria${seriesId}`,
                });
              });

            dispatch(
              updateSeriesRating({
                id: seriesId,
                rating: (film.rating + data.rating) / 2,
              })
            );
          }
        });
      reset();
    } else {
      toast.error("Sign in to add a comment", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="addComents">
      <p>Add New Comments</p>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="group">
          <div className="d-flex align-items-center">
            <p className="mx-2 my-0">Your rate : </p>
            <Controller
              name="rating"
              control={control}
              render={() => {
                return (
                  <>
                    <ReactStars
                      key={getValues("rating")}
                      count={5}
                      onChange={(e) => {
                        setValue("rating", +e);
                      }}
                      value={getValues("rating")}
                      size={24}
                      isHalf={true}
                      emptyIcon={<i className="fa fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ff8d1b"
                    />
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="group">
          <div>
            <textarea
              placeholder={
                user.id ? "Youar Message..." : "Login to add comment!"
              }
              data-bs-toggle={user.id ? "" : "modal"}
              data-bs-target="#exampleModal"
              {...register("message")}
              name="message"
              className="text-area-field"
            />
            {touchedFields.message && errors.message?.message && (
              <div className="errors">{errors.message?.message}</div>
            )}
          </div>
        </div>

        <div className="group">
          <button
            type={user.id ? "submit" : "button"}
            className="send-btn"
            data-bs-toggle={user.id ? "" : "modal"}
            data-bs-target="#exampleModal"
          >
            SEND
          </button>
        </div>
      </form>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};
