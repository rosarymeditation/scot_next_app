import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import useFirebase from "../../hooks/use-firebase";
import { loginSchema } from "../../utils/validation-schema";
import ErrorMsg from "./error-msg";
import { useState, useEffect } from "react";
import {
  LOGIN,
  SUCCESS_TITLE,
  VALIDATION_TITLE,
} from "../../layout/headers/menu-data";
import axios from "axios";
import Swal from "sweetalert";
import Cookies from "js-cookie";
import {
  AGENT_ROLE,
  GLOBAL_URL,
  IS_ADMIN,
  ROLE,
  setCookieAsync,
} from "../../utils/global";
const AgentLoginForm = () => {
  const router = useRouter();
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [showPass, setShowPass] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(true);
  // use firebase
  const { loginWithEmailPassword, resetPassword } = useFirebase();
  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: loginSchema,
      onSubmit: (values, { resetForm }) => {
        setHasSubmitted(false);
        axios
          .post(`${GLOBAL_URL}agentSignIn`, {
            email: values.email,
            password: values.password,
          })
          .then((result) => {
            if (result.data.error) {
              showAlert("Login Error", result.data.message);
            } else {
              const res = result.data;
              setCookieAsync(ROLE, AGENT_ROLE);
              Cookies.set("user", JSON.stringify(res.data));
              Cookies.set("token", res.token);

              router.push("/user/dashboard");
              // showAlert(
              //   SUCCESS_TITLE,
              //   "You have registered successfully",
              //   false
              // );
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

  // handleResetPass
  const handleResetPass = (email) => {
    resetPassword(email);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="current-log-email">Email*</label>
        <input
          // value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          name="email"
          placeholder="Email"
        />
        {touched.email && <ErrorMsg error={errors.email} />}
      </div>

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
        <span onClick={() => setShowPass(!showPass)} className="password-show">
          <i className="icon-76"></i>
        </span>
      </div>
      {touched.password && <ErrorMsg error={errors.password} />}

      {/* <div className="form-group chekbox-area">
        <div className="edu-form-check">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember Me</label>
        </div>
        <a
          href="#"
          onClick={() => handleResetPass(values.email)}
          className="password-reset"
        >
          Lost your password?
        </a>
      </div> */}

      <div className="form-group">
        <button type="submit" className="edu-btn btn-medium">
          {!hasSubmitted && (
            <span
              class="spinner-border spinner-border-lg"
              role="status"
              aria-hidden="true"
            ></span>
          )}{" "}
          Sign in <i className="icon-4"></i>
        </button>
      </div>
    </form>
  );
};

export default AgentLoginForm;
