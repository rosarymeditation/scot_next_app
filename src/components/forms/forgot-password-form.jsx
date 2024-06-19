import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import useFirebase from "../../hooks/use-firebase";
import { resetSchema } from "../../utils/validation-schema";
import ErrorMsg from "./error-msg";
import { useState, useEffect } from "react";
import {
  LOGIN,
  SUCCESS_TITLE,
  VALIDATION_TITLE,
} from "../../layout/headers/menu-data";
import axios from "axios";
import Swal from "sweetalert";
import { ADMIN_ROLE, GLOBAL_URL } from "../../utils/global";
const ForgotPasswordForm = () => {
  const router = useRouter();
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [showPass, setShowPass] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: resetSchema,
      onSubmit: (values, { resetForm }) => {
        setHasSubmitted(false);
        axios
          .post(`${GLOBAL_URL}forgotPassword`, {
            email: values.email,
          })
          .then((result) => {
            if (result.data.error) {
              showAlert(
                "Successful",
                "Password reset link was sent to your email",
                false
              );
            } else {
              const res = result.data;
              showAlert(
                "Successful",
                "Password reset link was sent to your email",
                false
              );
            }
          })
          .catch((error) => {
            showAlert("Login Error", "Username or password is incorrect");
          })
          .finally(() => {
            setHasSubmitted(true);
          });

        // resetForm();
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="current-log-email">Email*</label>
        <input
          // value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="email"
          placeholder="Email"
        />
        {touched.email && <ErrorMsg error={errors.email} />}
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
  );
};

export default ForgotPasswordForm;
