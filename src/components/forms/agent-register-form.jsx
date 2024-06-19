import React from "react";
import { useFormik } from "formik";
import useFirebase from "../../hooks/use-firebase";
import { agentRegisterSchema } from "../../utils/validation-schema";
import ErrorMsg from "./error-msg";
import Link from "next/link";
import { useState, useEffect } from "react";
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
  AGENT_ROLE,
  IS_ADMIN,
  POST_AGENT_SIGN_UP,
  POST_COUNTRIES,
  POST_SIGN_UP,
  REQUIRED_MSG,
  ROLE,
  setCookieAsync,
} from "../../utils/global";
const AgentRegisterForm = () => {
  let [countries, setCountries] = useState([]);
  let [selectedCountry, setSelectedCountry] = useState("");
  useEffect(() => {
    async function fetchData() {
      const result = await POST_COUNTRIES();
      const res = result.data.data;
     

      setCountries(res);
    }
    fetchData();
  }, []);
  const handleOptionChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name == "selectedCountry") {
    
      setSelectedCountry(value);
    }
  };
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (msg, isError = true) => {
    Swal("Validation Error", msg, isError ? "error" : "success");
  };
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agentName, setAgentName] = useState("");
  const [phone, setPhone] = useState("");
  // register With Email Password
  //const { registerWithEmailPassword } = useFirebase();
  //email, password, agencyName, phone, countryId
  // use formik
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name == "agentName") {
      setAgentName(value);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "phone") {
      setPhone(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    //registerWithEmailPassword(values.email, values.password, values.phone);
    try {
      if (selectedCountry == "") {
        showAlert(REQUIRED_MSG("Country of residence"), VALIDATION_TITLE);
        return;
      }

      setHasSubmitted(false);
      const result = await POST_AGENT_SIGN_UP({
        phone: phone,
        email: email,
        password: password,
        agencyName: agentName,
        countryId: selectedCountry,
      });
    
      if (result.data.error) {
        showAlert(VALIDATION_TITLE, result.data.message);
      } else {
        const res = result.data;
      
        setCookieAsync(ROLE, AGENT_ROLE);
        await setCookieAsync("token", res.token);
        await setCookieAsync("user", JSON.stringify(res.data));
        router.push("/user/dashboard");
      }
    } catch (err) {
     

      showAlert(err.response, VALIDATION_TITLE);
    } finally {
      setHasSubmitted(true);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="log-email">Agency*</label>
        <input
          onChange={handleChange}
          type="text"
          required
          name="agentName"
          id="log-username"
          placeholder="Agency"
        />
      </div>
      <div className="form-group">
        <label htmlFor="log-email">Email*</label>
        <input
          onChange={handleChange}
          required
          type="email"
          name="email"
          id="log-email"
          placeholder="Email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="log-password">Password*</label>
        <input
          onChange={handleChange}
          type={showPass ? "text" : "password"}
          name="password"
          required
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
          onChange={handleChange}
          type="tel"
          name="phone"
          required
          id="reg-name"
          placeholder="Phone"
        />
      </div>
      <div style={{ marginRight: 10 }} className="edu-sorting">
        <select
          name="selectedCountry"
          onChange={handleOptionChange}
          className="edu-select"
        >
          <option value="">{"All Countries"}</option>;
          {countries.map((item) => {
            return <option value={item.id}>{item.name}</option>;
          })}
        </select>
        <br />
        <br />
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
          Create Account <i className="icon-4"></i>
        </button>
      </div>
    </form>
  );
};

export default AgentRegisterForm;
