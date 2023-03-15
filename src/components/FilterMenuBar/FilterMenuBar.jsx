import "./FilterMenuBar.scss";
import { useDispatch } from "react-redux";
export const FilterMenuBar = ({
  filterManu,
  getFilms,
  setIstrailer,
  setVideoPlay,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="row row-cols-4">
      <ul className="filter-special-films">
        {filterManu.map((menuItem, i) => {
          return (
            <li key={menuItem.id}>
              <button
                id={i === 0 ? "active-menu-item" : ""}
                onClick={(e) => {
                  const lestActive =
                    document.getElementById("active-menu-item");
                  lestActive.removeAttribute("id");
                  e.target.setAttribute("id", "active-menu-item");
                  if (menuItem.action) {
                    dispatch(getFilms(menuItem.action));
                  } else {
                    setVideoPlay(false);
                    setIstrailer(menuItem.istrailer);
                  }
                }}
              >
                {menuItem.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
