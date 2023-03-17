import "./CommentsBar.scss";
import { AddComents } from "./AddComents";
import { AllComments } from "./AllComments";
export const CommentsBar = () => {
  return (
    <div className="film-section">
      <AddComents />
      <p className="mt-4">Comments</p>
      <hr />
      <AllComments />
    </div>
  );
};
