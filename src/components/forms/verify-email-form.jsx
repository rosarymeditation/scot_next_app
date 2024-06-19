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
  POST_EMAIL_VERIFICATION_FOR_UPDATE,
  getCookieAsync,
} from "../../utils/global";

const VerifyEmailForm = () => {
  const router = useRouter();
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [showPass, setShowPass] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const [seconds, setSeconds] = useState(60);
  const [canResend, setCanResend] = useState(true);
  const [code, setCode] = useState("");
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

  const handleSubmit = async () => {
    const email = await getCookieAsync("email");
    console.log(code);
    if (code == "") {
      showAlert("Alert", "Please enter a 4-digit code");
      return;
    }

    setHasSubmitted(false);

    POST_EMAIL_VERIFICATION_FOR_UPDATE({
      code: code,
      email: email,
    })
      .then((response) => {
        setHasSubmitted(true);
        // Handle successful response
        console.log("Response:", response.data);
        router.push("/verify-email-success");
      })
      .catch((error) => {
        setHasSubmitted(true);
        // Handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Error response:", error.response.data);
          console.log("Status code:", error.response.status);
          console.log("Headers:", error.response.headers);
          if (error.response.status == "400") {
            showAlert("Error", "Invalid code ");
          }
        } else if (error.request) {
          // The request was made but no response was received
          showAlert("Error", "No response from server ");
        } else {
          // Something happened in setting up the request that triggered an error
          showAlert("Error", "No response from server ");
        }
        console.log("Error config:", error.config);
      });
    // .then((result) => {
    //   const res = result.data;
    //   console.log(res);
    //   if (res.error) {
    //     showAlert("Error", "Could not save ");
    //   } else {
    //     router.push("/verify-email-success");
    //   }
    // })
    // .catch((error) => {
    //   console.log("Error response:", error.response.data);
    // })
    // }
  };
  const handleResend = async () => {
    const email = await getCookieAsync("email");
    setCanResend(true);

    const result = await SEND_EMAIL_VERIFICATION({
      email: email,
    });
    console.log(result);
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="current-log-email">Please enter 4 digits code*</label>
        <input
          value={code}
          maxLength={4}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          type="text"
          name="code"
          placeholder="4-digit code"
        />
      </div>
      {canResend && <div>Resend code in : {`${seconds}`} seconds</div>}
      {!canResend && <button onClick={handleResend}> Resend</button>}
      <br /> <br />
      <div className="form-group">
        <button
          type="button"
          onClick={handleSubmit}
          className="edu-btn btn-medium"
        >
          {!hasSubmitted && (
            <span
              class="spinner-border spinner-border-lg"
              role="status"
              aria-hidden="true"
            ></span>
          )}{" "}
          Verify <i className="icon-4"></i>
        </button>
      </div>
    </form>
  );
};

export default VerifyEmailForm;
