import React from "react";
import { useFormik } from "formik";
import useFirebase from "../../hooks/use-firebase";
import { registerSchema } from "../../utils/validation-schema";
import ErrorMsg from "./error-msg";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert";
import { useRouter } from "next/router";
import {
  CREATE_USER,
  REGISTER,
  SUCCESS_TITLE,
  VALIDATION_TITLE,
} from "../../layout/headers/menu-data";
import {
  ADMIN_ROLE,
  IS_ADMIN,
  POST_SIGN_UP,
  ROLE,
  USER_ROLE,
  setCookieAsync,
  SEND_EMAIL_VERIFICATION,
} from "../../utils/global";
const RegisterForm = () => {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (msg, isError = true) => {
    Swal("Validation Error", msg, isError ? "error" : "success");
  };
  const [showPass, setShowPass] = useState(false);
  // register With Email Password
  const { registerWithEmailPassword } = useFirebase();
  // use formik
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        phone: "",
        email: "",
        username: "",
        password: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values, { resetForm }) => {
        //registerWithEmailPassword(values.email, values.password, values.phone);
        try {
          setHasSubmitted(false);
          const result = await POST_SIGN_UP({
            phone: values.phone,
            email: values.email,
            password: values.password,
            username: values.username,
          });

          if (result.data.error) {
            showAlert(VALIDATION_TITLE, result.data.message);
          } else {
            const res = result.data;
            await SEND_EMAIL_VERIFICATION({
              email: values.email,
            });
            await setCookieAsync("email", values.email);
            setCookieAsync(ROLE, res.isAdmin ? ADMIN_ROLE : USER_ROLE);
            await setCookieAsync("token", res.token);
            await setCookieAsync("next_url", "/sign-in");
            await setCookieAsync("user", JSON.stringify(res.data));
            router.push("/verify-email");
          }
          resetForm();
        } catch (err) {
          showAlert(err.response.data.message, VALIDATION_TITLE);
        } finally {
          setHasSubmitted(true);
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="log-email">Username*</label>
        <input
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="username"
          id="log-username"
          placeholder="Username"
        />
        {touched.username && <ErrorMsg error={errors.username} />}
      </div>
      <div className="form-group">
        <label htmlFor="log-email">Email*</label>
        <input
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          name="email"
          id="log-email"
          placeholder="Email"
        />
        {touched.email && <ErrorMsg error={errors.email} />}
      </div>

      <div className="form-group">
        <label htmlFor="log-password">Password*</label>
        <input
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type={showPass ? "text" : "password"}
          name="password"
          id="log-password"
          placeholder="Password"
        />
        <span onClick={() => setShowPass(!showPass)} className="password-show">
          <i className="icon-76"></i>
        </span>
      </div>
      <div className="form-group">
        <label htmlFor="reg-name">Phone*</label>
        <input
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          type="tel"
          name="phone"
          id="reg-name"
          placeholder="Phone"
        />
        {touched.phone && <ErrorMsg error={errors.phone} />}
      </div>

      {/* <div className="form-group chekbox-area">
        <div className="edu-form-check">
          <input
            value={values.terms}
            onChange={handleChange}
            onBlur={handleBlur}
            type="checkbox"
            name="terms"
            id="terms-condition"
          />
          <label htmlFor="terms-condition">
            I agree the User Agreement and
            <Link href="/terms-condition">
              <a>Terms & Condition.</a>
            </Link>
          </label>
        </div>
      </div>
      {touched.terms && <ErrorMsg error={errors.terms?.split("true,")[1]} />} */}

      <div className="form-group">
        <button type="submit" className="edu-btn btn-medium">
          {!hasSubmitted && (
            <span
              class="spinner-border spinner-border-lg"
              role="status"
              aria-hidden="true"
            ></span>
          )}{" "}
          Create Account <i className="icon-4"></i>
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
