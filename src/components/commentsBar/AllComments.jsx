import { selectFilm } from "../../features/films/premiresFilmSlice";
import { useSelector } from "react-redux";

export const AllComments = () => {
  const comments = useSelector(selectFilm).comments;
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
              <span className="mx-4">
                <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                {comment.positiveRating}
              </span>
              <span>
                <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                {comment.negativeRating}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
