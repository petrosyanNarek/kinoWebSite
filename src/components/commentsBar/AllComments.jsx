import {
  selectFilm,
  setCommentRating,
} from "../../features/films/premiresFilmSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export const AllComments = () => {
  const [raply, setRaply] = useState(0);
  const comments = useSelector(selectFilm).comments;
  const dispatch = useDispatch();
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
                <p className="my-0">
                  <i
                    className="fa fa-thumbs-up mx-1"
                    aria-hidden="true"
                    onClick={() =>
                      dispatch(
                        setCommentRating({
                          id: comment.id,
                          rating: "positiveRating",
                        })
                      )
                    }
                  ></i>
                  ({comment.positiveRating})
                </p>
                <p className="my-0 mx-4">
                  <i
                    className="fa fa-thumbs-down mx-1"
                    aria-hidden="true"
                    onClick={() =>
                      dispatch(
                        setCommentRating({
                          id: comment.id,
                          rating: "negativeRating",
                        })
                      )
                    }
                  ></i>
                  ({comment.negativeRating})
                </p>
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
              <input type="text" className="input-field" />
            )}
          </div>
        );
      })}
    </div>
  );
};
