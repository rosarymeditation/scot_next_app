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
import {
  ADMIN_ROLE,
  GLOBAL_URL,
  SEND_EMAIL_VERIFICATION,
  getCookieAsync,
} from "../../utils/global";
const VerifyEmailSuccessForm = () => {
  const router = useRouter();
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [showPass, setShowPass] = useState(false);
  const [url, setUrl] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const [seconds, setSeconds] = useState(60);
  const [canResend, setCanResend] = useState(false);
  useEffect(() => {
    let timer;
    if (canResend) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [canResend]);

  useEffect(() => {
    if (seconds === 0) {
      setCanResend(false);
      setSeconds(60);
    }
  }, [seconds]);
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: { code: "" },
      validationSchema: resetSchema,
      onSubmit: async (values, { resetForm }) => {
        setHasSubmitted(false);

        console.log(result);
      },
    });
  const handleNext = async () => {
    const url = await getCookieAsync("next_url");

    router.push(url);
  };
  return (
    <div>
      <div class="alert alert-success" role="alert">
        Congratulations! Your email has been successfully verified. You're all
        set to explore and enjoy our platform to the fullest. Happy browsing!
      </div>
      <br />
      <br />
      <button type="button" onClick={handleNext} className="edu-btn btn-medium">
        Continue <i className="icon-4"></i>
      </button>
      {/* <a style={{ display: "flex", justifyContent: "center" }} href={url}>
        Continue{" "}
      </a> */}
    </div>
  );
};

export default VerifyEmailSuccessForm;
