import { Field, Form, Formik } from "formik";
import * as yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CommentsSchema = yup.object().shape({
  name: yup.string().required("Name is a required !!!"),
  email: yup
    .string()
    .email("Type must been email type")
    .required("Email is a required !!!"),
  phone: yup.string().min(8).matches(phoneRegExp, "Phone number is not valid"),
  message: yup.string().required("Message is a required !!!"),
});
export const AddComents = () => {
  return (
    <div className="addComents">
      <p>Comments</p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          message: "",
        }}
        validationSchema={CommentsSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="group">
              <div>
                <Field
                  placeholder="Name..."
                  name="name"
                  className="input-field"
                />
                {touched.name && errors.name && (
                  <div className="errors-validate">{errors.name}</div>
                )}
              </div>
            </div>
            <div className="group">
              <div>
                <Field
                  placeholder="Email"
                  name="email"
                  className="input-field"
                />
                {touched.email && errors.email && (
                  <div className="errors-validate">{errors.email}</div>
                )}
              </div>
            </div>
            <div className="group">
              <div>
                <Field
                  placeholder="Phone(77-123-456)"
                  name="phone"
                  className="input-field"
                />
                {touched.phone && errors.phone && (
                  <div className="errors-validate">{errors.phone}</div>
                )}
              </div>
            </div>
            <div className="group">
              <div>
                <Field name="message">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
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
