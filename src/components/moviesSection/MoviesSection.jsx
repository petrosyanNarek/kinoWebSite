import "./MoviesSection.scss";
export const MoviesSection = (props) => {
    return(
        <div className="movies-section mt-5">
            <h4>{props.name}</h4>
            <div className="container mt-5 mb-5 d-flex justify-content-center">
                {props.children}
            </div>
        </div>
    )
}