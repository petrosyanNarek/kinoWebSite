import "./modal.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./../../../validations/loginValidation";
import { registerSchema } from "../../../validations/registrValidation";

export const MyModal = () => {
  const [login, sertLogin] = useState(true);

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
      console.log(data, "login");
    } else {
      console.log(data, "register");
    }
    reset();
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
                      sertLogin(!login);
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
                      {touchedFields.fullName && errors.fullName?.message && (
                        <div className="errors">{errors.fullName?.message}</div>
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
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
