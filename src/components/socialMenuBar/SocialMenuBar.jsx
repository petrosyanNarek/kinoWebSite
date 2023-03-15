import "./SocialMenuBar.scss";
import { Link } from "react-router-dom";
export const SocialMenuBar = () => {
  return (
    <div>
      <nav className="social">
        <ul>
          <li className="social-tw">
            <Link to="https://twitter.com/" target="_blank" rel="noreferrer">
              Twitter <i className="fa fa-twitter"></i>
            </Link>
          </li>
          <li className="social-fb">
            <Link
              to="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook<i className="fa fa-facebook"></i>
            </Link>
          </li>
          <li className="social-dr">
            <Link to="https://dribbble.com/" target="_blank" rel="noreferrer">
              Dribbble<i className="fa fa-dribbble"></i>
            </Link>
          </li>
          <li className="social-gplus">
            <Link
              to="https://myaccount.google.com/profile"
              target="_blank"
              rel="noreferrer"
            >
              Google+<i className="fa fa-google-plus"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
