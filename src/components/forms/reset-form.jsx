import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import useFirebase from "../../hooks/use-firebase";
import { resetPostSchema } from "../../utils/validation-schema";
import ErrorMsg from "./error-msg";
import { useState, useEffect } from "react";
import { LOGIN, VALIDATION_TITLE } from "../../layout/headers/menu-data";
import axios from "axios";

import Swal from "sweetalert";
import Cookies from "js-cookie";
import {
  ADMIN_ROLE,
  GLOBAL_URL,
  POST_RESET_PASSWORD,
  ROLE,
  SIGN_IN_URL,
  TOKEN,
  USER_DATA,
  USER_ROLE,
  setCookieAsync,
} from "../../utils/global";
const ResetPasswordForm = ({ token }) => {
  const router = useRouter();
  useEffect(() => {
    loadInit();
  }, []);
  const loadInit = async () => {
    const result = await POST_RESET_PASSWORD({ token: token });

    const res = result.data;
    if (!res.error) {
      setCanShow(true);
    }
  };
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [canShow, setCanShow] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(true);
  // use firebase
  const { loginWithEmailPassword, resetPassword } = useFirebase();

  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: { password: "", repeatPassword: "" },
      validationSchema: resetPostSchema,
      onSubmit: (values, { resetForm }) => {
        if (values.password != values.repeatPassword) {
          showAlert(
            VALIDATION_TITLE,
            "Password and repeat-password did not match"
          );
          return;
        }
        setHasSubmitted(false);
        axios
          .post(`${GLOBAL_URL}resetPasswordPost`, {
            token: token,
            password: values.password,
          })
          .then((result) => {
            if (result.data.error) {
              showAlert("Error", result.data.message);
            } else {
              router.push(SIGN_IN_URL);
            }
          })
          .catch((error) => {
            showAlert("Server Error", "Password could not be changed");
          })
          .finally(() => {
            setHasSubmitted(true);
          });

        // resetForm();
      },
    });

  // handleResetPass

  return (
    <>
      {!canShow && (
        <div class="alert alert-warning" role="alert">
          Something went wrong! It is either your link has expired or does not
          exist.
        </div>
      )}
      {canShow && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="current-log-password">Password*</label>
            <input
              // value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="password-show"
            >
              <i className="icon-76"></i>
            </span>
          </div>
          {touched.password && <ErrorMsg error={errors.password} />}
          <div className="form-group">
            <label htmlFor="current-log-email">Repeat password*</label>
            <input
              // value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type={showPass ? "text" : "password"}
              name="repeatPassword"
              placeholder="Repeat password"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="password-show"
            >
              <i className="icon-76"></i>
            </span>
            {touched && <ErrorMsg error={errors.repeatPassword} />}
          </div>

          <div className="form-group">
            <button type="submit" className="edu-btn btn-medium">
              {!hasSubmitted && (
                <span
                  class="spinner-border spinner-border-lg"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}{" "}
              Reset <i className="icon-4"></i>
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ResetPasswordForm;
