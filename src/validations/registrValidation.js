import * as yup from "yup";
export const registerSchema = yup.object().shape({
  fullName: yup.string().required("username is a required !!!"),
  email: yup
    .string()
    .email("Enter valid Email")
    .required("email is a required !!!"),
  password: yup.string().required("Password is required").min(6).max(15),
  phone: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8),
});
