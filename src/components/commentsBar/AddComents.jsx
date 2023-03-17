import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  addComment,
  addFilmComment,
} from "../../features/films/premiresFilmSlice";
import { getUser } from "../../features/user/userSlice";
import { useParams } from "react-router-dom";
const CommentsSchema = yup.object().shape({
  message: yup.string().required("Message is a required !!!"),
});
export const AddComents = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  console.log(id);
  return (
    <div className="addComents">
      <p>Comments</p>
      <Formik
        initialValues={{
          message: "",
        }}
        validationSchema={CommentsSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          dispatch(getUser(localStorage.getItem("id")))
            .unwrap()
            .then((e) => {
              dispatch(addComment({ ...values, ...e }));
              // dispatch(addFilmComment({ ...values }));
            });
          resetForm();
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="group">
              <div>
                <Field name="message">
                  {({ field, form: { touched, errors } }) => (
                    <div>
                      <textarea
                        placeholder="Message"
                        {...field}
                        className="text-area-field"
                      />
                      {touched.message && errors.message && (
                        <div className="errors-validate">{errors.message}</div>
                      )}
                    </div>
                  )}
                </Field>
              </div>
            </div>

            <div className="group">
              <button type="submit" className="send-btn">
                SEND
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
