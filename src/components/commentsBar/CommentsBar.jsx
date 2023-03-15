import "./CommentsBar.scss"
import { AddComents } from './AddComents';
import { AllComments } from "./AllComments";
export const CommentsBar = () => {
    return(
        <div className="commentsBar">
            <AddComents/>
            <AllComments/>
        </div>
    )
}