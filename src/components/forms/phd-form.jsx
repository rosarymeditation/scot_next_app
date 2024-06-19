import React from "react";
import { useFormik } from "formik";
import useFirebase from "../../hooks/use-firebase";
import { phdSchema } from "../../utils/validation-schema";
import ErrorMsg from "./error-msg";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert";
import { useRouter } from "next/router";
import { VALIDATION_TITLE } from "../../layout/headers/menu-data";
import {
  Button,
  Form,
  Select,
  TextArea,
  Image,
  Message,
} from "semantic-ui-react";
import {
  POST_PHD_APPLICATION_SAVE,
  POST_PHD_QUALIFCATION_TYPES,
} from "../../utils/global";

const PhdForm = () => {
  useEffect(() => {
    loadPhdTypes();
  }, []);
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const [canShowForm, setCanShowForm] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("");
  const [qualificationOptions, setQualificationOptions] = useState([]);
  const [topic, setTopic] = useState("");
  const showAlert = (msg, isError = true) => {
    Swal("Validation Error", msg, isError ? "error" : "success");
  };
  const showAlert2 = (msg) => {
    Swal("Success", msg, "success");
  };
  const [showPass, setShowPass] = useState(false);
  async function loadPhdTypes() {
    const result = await POST_PHD_QUALIFCATION_TYPES();
    const res = result.data.data;

    qualificationOptions = res.map((item) => {
      return {
        key: item.id,
        name: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setQualificationOptions(qualificationOptions);
  }
  const handleOptionChange = (event) => {
    const value = event.target.value;

    setSelectedQualification(value);
  };

  const handleSubmit = async () => {
    if (selectedQualification == "") {
      showAlert(VALIDATION_TITLE, REQUIRED_MSG("Qualification Type"));
      return;
    }

    const data = {
      firstname,
      middlename,
      lastname,
      topic,
      phone,
      email,
      phdQualificationId: selectedQualification,
    };
    setHasSubmitted(false);

    try {
      const result = await POST_PHD_APPLICATION_SAVE(data);

      const res = result.data;
      if (res.error) {
        showAlert("Error", "Could not save ");
      } else {
        setCanShowForm(false);
        showAlert2(
          "Your application has been submitted, we will keep you posted within 3 working days"
        );
      }
    } catch (err) {
    } finally {
      setHasSubmitted(true);
    }
  };
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name == "firstname") {
      setFirstname(value);
    } else if (name == "middlename") {
      setMiddlename(value);
    } else if (name == "lastname") {
      setLastname(value);
    } else if (name == "topic") {
      setTopic(value);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "phone") {
      setPhone(value);
    }
  };
  return (
    <>
      {!canShowForm && (
        <h4 style={{ color: "green", marginTop: 100 }}>
          Application was submitted successfully
        </h4>
      )}
      {canShowForm && (
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="log-email">First Name*</label>
            <input
              onChange={handleChange}
              type="text"
              name="firstname"
              required
              id="log-username"
              placeholder="First name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="log-email">Middle name</label>
            <input
              onChange={handleChange}
              type="middlename"
              name="middlename"
              id="log-email"
              placeholder="Middle name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="log-email">Last Name*</label>
            <input
              onChange={handleChange}
              type="text"
              required
              name="lastname"
              id="log-username"
              placeholder="Last name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-name">Email*</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="reg-name"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-name">Phone*</label>
            <input
              onChange={handleChange}
              type="tel"
              name="phone"
              id="reg-name"
              placeholder="Phone"
              required
            />
          </div>
          <div style={{ marginRight: 10 }} className="edu-sorting">
            <select
              name="selectedQualification"
              style={{ width: "100%" }}
              onChange={handleOptionChange}
              className="edu-select"
            >
              <option value="">{"Degree types"}</option>
              {qualificationOptions.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="reg-name">Proposed Research Topic*</label>
            <TextArea
              style={{ minHeight: 100 }}
              onChange={handleChange}
              className="form-control"
              type="text"
              name="topic"
              placeholder="Proposed Research Topic"
              required
              minLegth="20"
            />
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
              Submit <i className="icon-4"></i>
            </button>
          </div>
        </Form>
      )}
    </>
  );
};

export default PhdForm;
