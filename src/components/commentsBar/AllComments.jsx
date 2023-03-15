export const AllComments = () => {
  return (
    <div className="all-comments mt-5">
      <div className="comment-item mb-4">
        <h5>Author</h5>
        <div className="comment-user-avatar">
          <img
            src="https://p.w3layouts.com/demos/aug-2016/24-08-2016/one_movies/web/images/user.jpg"
            alt=""
          />
        </div>
        <div className="comment-user-text">
          <p>comment.description</p>
          <span>
            Date : <a href="/"> comment.date </a>
          </span>
          <span className="mx-4">
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            {`{comment.positiveRating}`}
          </span>
          <span>
            <i className="fa fa-thumbs-down" aria-hidden="true"></i>
            {`{comment.negativeRating}`}
          </span>
        </div>
      </div>
    </div>
  );
};
