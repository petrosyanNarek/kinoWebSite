import {
  addCommentAnwser,
  selectFilm,
  setCommentRating,
  setFilmCommentRating,
} from "../../features/films/premiresFilmSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectLoginUser } from "../../features/user/userSlice";
import { useForm } from "react-hook-form";
import { CommentsSchema } from "./AddComents";
import { yupResolver } from "@hookform/resolvers/yup";

export const AllComments = () => {
  const [raply, setRaply] = useState(0);
  const comments = useSelector(selectFilm).comments;
  const dispatch = useDispatch();

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
  });
  return (
    <div className="all-comments mt-5">
      {comments?.map((comment) => {
        return (
          <div className="comment-item mb-4" key={comment.id}>
            <h5>{comment.user.fullName}</h5>
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
                    className={comment.comment_ratings.find((e => e.userId === +localStorage.getItem('id') && e.commentRating)) ? "fa fa-thumbs-up text-primary mx-1" : "fa fa-thumbs-up mx-1"}
                    aria-hidden="true"
                    onClick={() => {
                      const userId = +localStorage.getItem('id')
                      if (userId) {
                        if (!comment.userId) {
                          dispatch(setFilmCommentRating({ user_id: userId, comment_id: comment.id, rating: true }))
                        } else {
                          dispatch(setFilmCommentRating({ user_id: userId, coment_anwser_id: comment.id, rating: true }))
                        }
                        dispatch(
                          setCommentRating({
                            id: comment.id,
                            userId: userId,
                            rating: true,
                          })
                        )
                      }

                    }
                    }
                  ></i>
                  <span>
                    ({comment.commentLike})
                  </span>
                  {/* <div className="reaction-list"></div> */}
                </div>
                <div className="comment-reaction mx-4">
                  <i
                    className={comment?.comment_ratings?.find((e => e.userId === +localStorage.getItem('id') && e.commentRating === false)) ? "fa fa-thumbs-down text-primary mx-1" : "fa fa-thumbs-down mx-1"}
                    aria-hidden="true"
                    onClick={() => {
                      const userId = +localStorage.getItem('id')
                      if (userId) {
                        if (!comment.userId) {
                          dispatch(setFilmCommentRating({ user_id: userId, comment_id: comment.id, rating: false }))
                        } else {
                          dispatch(setFilmCommentRating({ user_id: userId, coment_anwser_id: comment.id, rating: false }))
                        }
                        dispatch(
                          setCommentRating({
                            id: comment.id,
                            userId: userId,
                            rating: false,
                          })
                        )
                      }
                    }
                    }
                  ></i>
                  <span>
                    ({comment.commentDisLike})
                  </span>
                  {/* <div className="reaction-list">
                    {
                      comment?.comment_ratings.map(commentRating => {
                        return <p>{commentRating.user.fullName}</p>
                      })
                    }
                  </div> */}
                </div>
                <button
                  className="btn d-flex align-items-center"
                  onClick={() => setRaply(comment.id)}
                >
                  <i className="fas fa-reply fa-xs"></i>
                  <span className="small mx-1"> reply</span>
                </button>
              </div>
            </div>
            {comment.id === raply && (
              <form className="d-flex align-items-cemter" onSubmit={handleSubmit((value) => {
                dispatch(addCommentAnwser({ ...value, userId: +localStorage.getItem("id"), commentId: comment.id }));
              })}>
                <input type="text" className="input-field m-0" name="message" {...register("message")} />
                <button type="submit" className="send-btn">Send</button>
              </form>
            )}
            {touchedFields.message && errors.message?.message && (
              <div className="errors">{errors.message?.message}</div>
            )}
            {comment.commentsAnwsers.length ? <p>{comment?.commentsAnwsers?.length} Comments</p> : ""}
            <div></div>
          </div>
        );
      })}
    </div>
  );
};
