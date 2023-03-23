import "./MenuBar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGanres, selectGaners } from "../../features/genres/genre";
import {
  getCountries,
  selectCountries,
} from "./../../features/countries/countriesSlice";
export const MenuBar = () => {
  const dispatch = useDispatch();
  const ganres = useSelector(selectGaners);
  const countries = useSelector(selectCountries);
  useEffect(() => {
    dispatch(getGanres());
    dispatch(getCountries());
  }, [dispatch]);
  return (
    <div className="menu-bar">
      <ul className="menu-item">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li className="dropDown">
          <p>
            Genres <b className="caret"></b>
          </p>
          <div className="dropdown-menu-item col-lg-12">
            <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-2 row-cols-xl-3 p-4">
              {ganres.map((ganer) => {
                return (
                  <div className="col" key={ganer.id}>
                    <Link to={"genres/" + ganer.id}>{ganer.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </li>
        <li>
          <Link to={"tvseries"}>TV-Series</Link>
        </li>
        <li className="dropDown">
          <p>
            Country <b className="caret"></b>
          </p>
          <div className="dropdown-menu-item col-lg-12 dropdown-menu-countrys">
            <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-2 row-cols-xl-3 p-4">
              {countries.map((countri) => {
                return (
                  <div className="col" key={countri.id}>
                    <Link to={"countrys/" + countri.id}>{countri.name}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
