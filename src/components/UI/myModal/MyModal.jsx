import "./modal.scss";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./../../../validations/loginValidation";
import { registerSchema } from "../../../validations/registrValidation";
import { useDispatch } from "react-redux";
import { loginUser, registration } from "../../../features/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const MyModal = ({ setIsLogin }) => {
  const closeBtn = useRef();
  const [login, setLogin] = useState(true);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(login ? loginSchema : registerSchema),
  });
  const onSubmitHandler = (data) => {
    if (login) {
      dispatch(loginUser(data))
        .unwrap()
        .then((r) => {
          if (r.verify) {
            localStorage.setItem("id", r.user.id);
            setIsLogin(true);
            closeBtn.current.click();
          } else {
            setMessage(r.error);
          }
        })
        .catch((e) => {
          toast.error(e.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    } else {
      dispatch(registration(data))
        .unwrap()
        .then((e) => {
          setMessage(e);
          setTimeout(() => {
            reset();
            setLogin(true);
          }, 1500);
        })
        .catch((e) => {
          setMessage(e);
        });
      setTimeout(() => {
        setMessage("");
      }, 2500);
    }
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2
              className="modal-title text-center w-100"
              id="exampleModalLabel"
            >
              {login ? "Sign In" : "Sign Up"}
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeBtn}
            ></button>
          </div>

          <section>
            <div className="modal-body">
              <div className="w3_login_module">
                <div className="module form-module">
                  <div
                    className="toggle"
                    onClick={() => {
                      reset();
                      setLogin(!login);
                    }}
                  >
                    <i
                      className={!login ? "fa fa-times " : "fa  fa-pencil"}
                    ></i>
                  </div>
                  <div className="form">
                    <h3>
                      {login ? "Login to your account" : "Create an account"}
                    </h3>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                      {!login && (
                        <>
                          <input
                            {...register("fullName")}
                            placeholder="Full Name"
                          />
                          {touchedFields.fullName &&
                            errors.fullName?.message && (
                              <div className="errors">
                                {errors.fullName?.message}
                              </div>
                            )}
                          <input
                            {...register("phone")}
                            placeholder="Phone Number"
                          />
                          {touchedFields.phone && errors.phone?.message && (
                            <div className="errors">
                              {errors.phone?.message}
                            </div>
                          )}
                        </>
                      )}
                      <input
                        {...register("email")}
                        placeholder="Email Address"
                      />
                      {touchedFields.email && errors.email?.message && (
                        <div className="errors">{errors.email?.message}</div>
                      )}
                      <input
                        {...register("password")}
                        placeholder="Password"
                        type="password"
                      />
                      {touchedFields.password && errors.password?.message && (
                        <div className="errors">{errors.password?.message}</div>
                      )}
                      <input type="submit" value="submit" />
                    </form>
                    <p className="text-center text-danger fw-bold">{message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ToastContainer />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
