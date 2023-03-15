import "./Footer.scss"
import { LinkA } from "../UI/aTag/LinkA";
export const Footer = () => {
    return(
        <div className="footer">
            <div className="container d-flex justify-content-center">
                <div className="footer-contect">
                    <div className="row">
                        <div className="col-lg-12 subscribe-form mb-4">
                            <div className="sub-form-logo">
                                <h2 className="subscribe-title">SUBSCRIBE TO US</h2>
                                <div className="subscribe-us">
                                    <form action="" className="d-flex flex-column">
                                        <input type="email" placeholder="Your email..."/>
                                        <button type="submit">Send</button>
                                    </form>
                                </div>
                            </div>
                            <div className="other-footer-info d-flex justify-content-end align-items-center">
                                <div className="header-slice">
                                    <h3>one <span>movies</span></h3>
                                    <img src="https://p.w3layouts.com/demos/aug-2016/24-08-2016/one_movies/web/images/1.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 d-flex justify-content-center flex-wrap">
                            <div className="w-50 other-info">
                                <p>© 2016 One Movies. All rights reserved | Design by <LinkA to="/">W3layouts</LinkA></p>
                            </div>
                            <div className="w-50">
                                <ul className="d-flex justify-content-between footer-menu-bar flex-wrap">
                                    <li>
                                        <LinkA to={'/'}> MOVIES </LinkA>
                                    </li>
                                    <li>
                                        <LinkA to={"/"}>FAQ</LinkA>
                                    </li>
                                    <li>
                                        <LinkA to={"/"}>ACTION</LinkA>
                                    </li>
                                    <li>
                                        <LinkA to={'/'}>ADVENTURE</LinkA>
                                    </li>
                                    <li>
                                        <LinkA to={"/"}>COMEDY</LinkA>
                                    </li>
                                    <li>
                                        <LinkA to={"/"}>ICONS</LinkA>
                                    </li>
                                    <li>
                                        <LinkA to={"/"}> CONTACT US</LinkA>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}