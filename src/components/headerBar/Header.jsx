/* eslint-disable react-hooks/exhaustive-deps */
import "./HeaderBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MyModal } from "../UI/myModal/MyModal";
import { logOut } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
export const Header = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState("");
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <div className="header">
        <div className="header-items">
          <Link to={"/"}>
            <div className="header-slice">
              <h3>
                one <span>movies</span>
              </h3>
              <img
                src="https://p.w3layouts.com/demos/aug-2016/24-08-2016/one_movies/web/images/1.jpg"
                alt=""
              />
            </div>
          </Link>
          <div className="header-slice">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchParams.length > 2) {
                  navigate({
                    pathname: "/search",
                    search: `?fiter=${searchParams}`,
                  });
                }
              }}
            >
              <input
                type="search"
                placeholder="Search"
                value={searchParams}
                onChange={(e) => setSearchParams(e.target.value)}
              />
              <input type="submit" value={"GO"} />
            </form>
          </div>
          <div className="header-slice contact-us-tel">
            <div className="tel-number">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25453.png"
                alt=""
              />
              <span>(+000) 123 345 653</span>
            </div>
            {isLogin ? (
              <button
                onClick={() => {
                  localStorage.clear("id");
                  dispatch(logOut());
                  setIsLogin(false);
                }}
              >
                LOGOUT
              </button>
            ) : (
              <button data-bs-toggle="modal" data-bs-target="#exampleModal">
                LOGIN
              </button>
            )}
          </div>
        </div>
      </div>
      <MyModal setIsLogin={setIsLogin} />
    </>
  );
};
