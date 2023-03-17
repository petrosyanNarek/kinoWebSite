import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import {
  addComment,
} from "../../features/films/premiresFilmSlice";
import { selectLoginUser } from "../../features/user/userSlice";
import { useParams, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const CommentsSchema = yup.object().shape({
  message: yup.string().required("Message is a required !!!"),
  // rating: yup.number().min(0.5).max(5).required()
});

export const AddComents = () => {
  const dispatch = useDispatch();
  const filmId = useParams().id;
  const [searchParams] = useSearchParams();
  const seriaId = searchParams.get("seriaId");
  const user = useSelector(selectLoginUser)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors, touchedFields },

  } = useForm({
    resolver: yupResolver(CommentsSchema),
    defaultValues: {
      rating: 0
    }
  });
  const onSubmitHandler = (data) => {
    if (filmId) {
      console.log();
    } else {

      console.log({ ...data, user, seriaId });
    }
    dispatch(addComment({ ...data, user, filmId }))
    reset()
  }
  return (
    <div className="addComents">
      <p>Add New Comments</p>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="group">
          <div className="d-flex align-items-center">
            <p className="mx-2 my-0">Your rate : </p>
            <Controller
              name="rating"
              control={control}
              render={() => {
                return (
                  <>
                    <ReactStars
                      count={5}
                      onChange={(e) => {
                        setValue("rating", +e)
                      }}
                      value={getValues("rating")}
                      size={24}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"

                    />
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="group">
          <div>
            <textarea
              {...register("message")}
              placeholder="Youar Message..."
              name="message"
              className="text-area-field"
            />
            {touchedFields.message &&
              errors.message?.message && (
                <div className="errors">
                  {errors.message?.message}
                </div>
              )}
          </div>
        </div>

        <div className="group">
          <button type="submit" className="send-btn">
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};
