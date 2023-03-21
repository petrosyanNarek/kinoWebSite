export const FilmRating = ({ rating, color }) => {
  return (
    <div className="rating">
      {[...Array(5)].map((e, i) => {
        if (rating >= i + 1) {
          return (
            <i
              className="fa fa-star"
              aria-hidden="true"
              style={color && { color: color }}
              key={i}
            ></i>
          );
        } else if (rating >= i + 0.5 && rating < i + 1) {
          return (
            <i
              className="fa fa-star-half-o"
              aria-hidden="true"
              style={color && { color: color }}
              key={i}
            ></i>
          );
        } else {
          return (
            <i
              className="fa fa-star-o"
              aria-hidden="true"
              style={color && { color: color }}
              key={i}
            ></i>
          );
        }
      })}
    </div>
  );
};
