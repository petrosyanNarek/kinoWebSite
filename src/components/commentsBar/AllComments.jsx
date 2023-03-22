import {
  addCommentAnwser,
  selectFilm,
  setFilmCommentRating,
} from "../../features/films/premiresFilmSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectLoginUser } from "../../features/user/userSlice";
import { useForm } from "react-hook-form";
import { CommentsSchema } from "./AddComents";
import { yupResolver } from "@hookform/resolvers/yup";
import io from "socket.io-client";
import { useParams, useSearchParams } from "react-router-dom";

const socket = io.connect(process.env.REACT_APP_SOCET_IO_CONNECT);

export const AllComments = () => {
  const filmId = +useParams().id;
  const [searchParams] = useSearchParams();
  const seriesId = +searchParams.get("seria");
  const [raply, setRaply] = useState(0);
  const comments = useSelector(selectFilm).comments;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(CommentsSchema),
  });
  const { email, ...user } = useSelector(selectLoginUser);
  return (
    <div className="all-comments mt-5">
      {comments?.map((comment) => {
        return (
          <div className="comment-item mb-4" key={comment.id}>
            <h5>{comment?.user?.fullName}</h5>
            <div className="comment-user-avatar">
              <img
                src="https://p.w3layouts.com/demos/aug-2016/24-08-2016/one_movies/web/images/user.jpg"
                alt=""
              />
            </div>
            <div className="comment-user-text">
              <p>{comment.message}</p>
              <span>
                Date : <a href="/"> {comment.createdAt} </a>
              </span>
              <div className="d-flex align-items-center p-2">
                <div className="comment-reaction">
                  <i
                    data-bs-toggle={user.id ? "" : "modal"}
                    data-bs-target="#exampleModal"
                    className={
                      comment?.comment_ratings?.find(
                        (e) =>
                          e.userId === +localStorage.getItem("id") &&
                          e.commentRating
                      )
                        ? "fa fa-thumbs-up text-primary mx-1"
                        : "fa fa-thumbs-up mx-1"
                    }
                    aria-hidden="true"
                    onClick={() => {
                      const userId = +localStorage.getItem("id");
                      if (userId) {
                        socket.emit("send_message", {
                          id: comment.id,
                          userId: userId,
                          rating: true,
                          room: filmId ? `film${filmId}` : `seria${seriesId}`,
                        });
                        dispatch(
                          setFilmCommentRating({
                            user_id: userId,
                            comment_id: comment.id,
                            rating: true,
                          })
                        );
                      }
                    }}
                  ></i>
                  <span>({comment.commentLike})</span>
                </div>
                <div className="comment-reaction mx-4">
                  <i
                    data-bs-toggle={user.id ? "" : "modal"}
                    data-bs-target="#exampleModal"
                    className={
                      comment?.comment_ratings?.find(
                        (e) =>
                          e.userId === +localStorage.getItem("id") &&
                          e.commentRating === false
                      )
                        ? "fa fa-thumbs-down text-primary mx-1"
                        : "fa fa-thumbs-down mx-1"
                    }
                    aria-hidden="true"
                    onClick={() => {
                      const userId = +localStorage.getItem("id");
                      if (userId) {
                        socket.emit("send_message", {
                          id: comment.id,
                          userId: userId,
                          rating: false,
                          room: filmId ? `film${filmId}` : `seria${seriesId}`,
                        });
                        dispatch(
                          setFilmCommentRating({
                            user_id: userId,
                            comment_id: comment.id,
                            rating: false,
                          })
                        );
                      }
                    }}
                  ></i>
                  <span>({comment.commentDisLike})</span>
                </div>
                <button
                  className="btn d-flex align-items-center"
                  onClick={() => {
                    if (raply && comment.id === raply) {
                      setRaply("");
                    } else {
                      setRaply(comment.id);
                    }
                  }}
                >
                  <i className="fas fa-reply fa-xs"></i>
                  <span className="small mx-1"> reply</span>
                </button>
              </div>
            </div>
            {comment.id === raply && (
              <form
                className="d-flex align-items-cemter"
                onSubmit={handleSubmit((value) => {
                  dispatch(
                    addCommentAnwser({
                      ...value,
                      userId: +localStorage.getItem("id"),
                      commentId: comment.id,
                    })
                  )
                    .unwrap()
                    .then((com) => {
                      socket.emit("send_message", {
                        ...com,
                        user: user,
                        room: filmId ? `film${filmId}` : `seria${seriesId}`,
                      });
                    });
                  reset();
                })}
              >
                <input
                  data-bs-toggle={user.id ? "" : "modal"}
                  data-bs-target="#exampleModal"
                  type="text"
                  className="input-field m-0"
                  name="message"
                  placeholder={
                    localStorage.getItem("id") ? "Comment.." : "Login"
                  }
                  {...register("message")}
                  disabled={localStorage.getItem("id") ? false : true}
                />
                <button
                  data-bs-toggle={user.id ? "" : "modal"}
                  data-bs-target="#exampleModal"
                  type={user.id ? "submit" : "button"}
                  className="send-btn"
                >
                  Send
                </button>
              </form>
            )}
            {touchedFields.message && errors.message?.message && (
              <div className="errors">{errors.message?.message}</div>
            )}
            {comment?.commentsAnwsers?.length ? (
              <p
                className="comments-answers-count"
                onClick={() => {
                  if (raply && comment.id === raply) {
                    setRaply("");
                  } else {
                    setRaply(comment.id);
                  }
                }}
              >
                {comment?.commentsAnwsers?.length} Comments
              </p>
            ) : (
              ""
            )}
            {comment.id === raply && (
              <div className="comment-answers-list">
                {comment?.commentsAnwsers?.map((commentsAnwser) => {
                  return (
                    <div className="comment-item mb-4" key={commentsAnwser.id}>
                      <h5>{commentsAnwser.user.fullName}</h5>
                      <div className="comment-user-avatar">
                        <img
                          src="https://p.w3layouts.com/demos/aug-2016/24-08-2016/one_movies/web/images/user.jpg"
                          alt=""
                        />
                      </div>
                      <div className="comment-user-text">
                        <p>{commentsAnwser.message}</p>
                        <span>
                          Date : <a href="/"> {commentsAnwser.createdAt} </a>
                        </span>
                        <div className="d-flex align-items-center p-2">
                          <div className="comment-reaction">
                            <i
                              data-bs-toggle={user.id ? "" : "modal"}
                              data-bs-target="#exampleModal"
                              className={
                                commentsAnwser?.comment_ratings?.find(
                                  (e) =>
                                    e.userId === +localStorage.getItem("id") &&
                                    e.commentRating
                                )
                                  ? "fa fa-thumbs-up text-primary mx-1"
                                  : "fa fa-thumbs-up mx-1"
                              }
                              aria-hidden="true"
                              onClick={() => {
                                const userId = +localStorage.getItem("id");
                                if (userId) {
                                  socket.emit("send_message", {
                                    rating: true,
                                    commentsAnwserId: commentsAnwser.id,
                                    userId,
                                    commentId: comment.id,
                                    room: filmId
                                      ? `film${filmId}`
                                      : `seria${seriesId}`,
                                  });
                                  dispatch(
                                    setFilmCommentRating({
                                      user_id: userId,
                                      coment_anwser_id: commentsAnwser.id,
                                      rating: true,
                                    })
                                  );
                                }
                              }}
                            ></i>
                            <span>({commentsAnwser.commentLike})</span>
                          </div>
                          <div className="comment-reaction mx-4">
                            <i
                              data-bs-toggle={user.id ? "" : "modal"}
                              data-bs-target="#exampleModal"
                              className={
                                commentsAnwser?.comment_ratings?.find(
                                  (e) =>
                                    e.userId === +localStorage.getItem("id") &&
                                    e.commentRating === false
                                )
                                  ? "fa fa-thumbs-down text-primary mx-1"
                                  : "fa fa-thumbs-down mx-1"
                              }
                              aria-hidden="true"
                              onClick={() => {
                                const userId = +localStorage.getItem("id");
                                if (userId) {
                                  socket.emit("send_message", {
                                    rating: false,
                                    commentsAnwserId: commentsAnwser.id,
                                    userId,
                                    commentId: comment.id,
                                    room: filmId
                                      ? `film${filmId}`
                                      : `seria${seriesId}`,
                                  });
                                  dispatch(
                                    setFilmCommentRating({
                                      user_id: userId,
                                      coment_anwser_id: commentsAnwser.id,
                                      rating: false,
                                    })
                                  );
                                }
                              }}
                            ></i>
                            <span>({commentsAnwser.commentDisLike})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
