import { Link } from 'react-router-dom';
import "./LinkA.scss"
export const LinkA = ({href,children,...props}) => {
    return(
        <Link {...props} to={href} className="my-a">
            {children}
        </Link>
    )
}