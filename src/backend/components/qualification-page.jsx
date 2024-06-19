import React from "react";
import styles from "../admin.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert";
import { useFormik } from "formik";
import { userSchema } from "../../utils/validation-schema";
import Cookies from "js-cookie";
import AdminLayout from "../AdminLayout";

import ErrorMsg from "../../components/forms/error-msg";
import {
  Button,
  Checkbox,
  Form,
  Loader,
  Segment,
  Select,
  Message,
} from "semantic-ui-react";
import {
  ERROR_TITLE,
  GET_QUALIFICATION_YEAR,
  IS_FOR_HIGHEST_QUALIFICATION,
  IS_FOR_PREVIOUS_QUALIFICATION,
} from "../../layout/headers/menu-data";
import {
  NO,
  POST_HIGHEST_QUALIFICATION,
  POST_PREVIOUS_QUALIFICATION,
  POST_QUALIFICATION_SAVE,
  POST_QUALIFICATION_TYPES,
  REQUIRED_MSG,
  SIGN_IN_URL,
  TOKEN,
  YES,
  getCookieAsync,
} from "../../utils/global";
import { useRouter } from "next/router";
function qualificationPage({
  agentUserId = "",
  applicationType = IS_FOR_HIGHEST_QUALIFICATION,
}) {
  const router = useRouter();
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const [selectedQualificationType, setSelectedQualificationType] =
    useState("");
  const [grade, setGrade] = useState("");
  const [selectedCompleted, setSelectedCompleted] = useState("");
  const [name, setName] = useState("");
  const [selectedProgramYear, setSelectedProgramYear] = useState("");

  const [userData, setUserData] = useState({});
  let [yearOptions, setYearOptions] = useState([]);
  let [qualificationOptions, setQualificationOptions] = useState([]);
  const url =
    applicationType == IS_FOR_HIGHEST_QUALIFICATION
      ? "qualification"
      : "previous-qualification";

  useEffect(() => {
    loadQualification();
    loadQualificationTypes();
    const year = GET_QUALIFICATION_YEAR();
    setYearOptions(year);
  }, []);
  async function loadQualificationTypes() {
    const result = await POST_QUALIFICATION_TYPES();
    const res = result.data.data;

    const qualificationOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setQualificationOptions(qualificationOptions);
  }

  async function loadQualification() {
    const token = await getCookieAsync(TOKEN);
    if (!token) {
      router.push(SIGN_IN_URL);
    }
    if (applicationType == IS_FOR_HIGHEST_QUALIFICATION) {
      try {
        const result = await POST_HIGHEST_QUALIFICATION(
          agentUserId ? { userId: agentUserId, isForAgent: true } : {}
        );

        const res = result.data.data;
        setUserData(res);
        if (res) {
          setId(res.id);
          setGrade(res.hq_grade);
          setName(res.hq_schoolName);
          setSelectedProgramYear(res.hq_programmeYear);
          setSelectedCompleted(res.hq_completed);
          setSelectedQualificationType(res.qualificationTypeId);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setHasLoaded(true);
      }
    } else {
      try {
        const result = await POST_PREVIOUS_QUALIFICATION(
          agentUserId ? { userId: agentUserId, isForAgent: true } : {}
        );

        const res = result.data.data;
        setUserData(res);
        if (res) {
          setId(res.id);
          setGrade(res.pq_grade);
          setName(res.pq_schoolName);
          setSelectedProgramYear(res.pq_programmeYear);
          setSelectedCompleted(res.pq_completed);
          setSelectedQualificationType(res.qualificationTypeId);
        }
      } catch (err) {
        console.log(err.response.data);
      } finally {
        setHasLoaded(true);
      }
    }
  }

  const completedOptions = [
    { key: "1", text: "Select one", value: "" },
    { key: "y", text: YES, value: YES },
    { key: "n", text: NO, value: NO },
  ];

  const handleOptionChange = (_, arg) => {
    const name = arg.name;
    const value = arg.value;

    if (name == "qualification") {
      setSelectedQualificationType(value);
    } else if (name == "year") {
      setSelectedProgramYear(value);
    } else if (name == "completed") {
      setSelectedCompleted(value);
    }
  };

  const handleChange = (event, data) => {
    const name = data.name;
    const value = data.value;

    if (name == "name") {
      setName(value);
    } else if (name == "grade") {
      setGrade(value);
    }
  };
  const handleSkip = () => {
    if (agentUserId) {
      router.push(`/user/high-school/${agentUserId}`);
    } else {
      router.push(`/user/high-school`);
    }
  };
  const handleSubmit = async () => {
    if (!selectedProgramYear) {
      showAlert(ERROR_TITLE, REQUIRED_MSG("Program year"));
      return;
    } else if (!selectedQualificationType) {
      showAlert(ERROR_TITLE, REQUIRED_MSG("Qualification type"));
      return;
    } else if (!selectedCompleted) {
      showAlert(ERROR_TITLE, REQUIRED_MSG("Country"));
      return;
    }
    setHasSubmitted(false);
    const data =
      applicationType == IS_FOR_HIGHEST_QUALIFICATION
        ? {
            hq_schoolName: name,
            hq_grade: grade,
            hq_completed: selectedCompleted,
            hq_programmeYear: selectedProgramYear,
          }
        : {
            pq_schoolName: name,
            pq_grade: grade,
            pq_completed: selectedCompleted,
            pq_programmeYear: selectedProgramYear,
          };

    if (agentUserId) {
      data.userId = agentUserId;
      data.isForAgent = true;
    }

    data.qualificationTypeId = selectedQualificationType;
    try {
      const result = await POST_QUALIFICATION_SAVE(data, applicationType);
      console.log(result.data.error);
      const res = result.data;
      if (res.error) {
        showAlert("Error", "Could not save ");
      } else {
        if (applicationType == IS_FOR_HIGHEST_QUALIFICATION) {
          if (agentUserId) {
            router.push(`/user/previous-qualification/${agentUserId}`);
          } else {
            router.push(`/user/previous-qualification`);
          }
        } else {
          if (agentUserId) {
            router.push(`/user/high-school/${agentUserId}`);
          } else {
            router.push(`/user/high-school`);
          }
        }
      }
    } catch (err) {
      showAlert("Error", "Could not save ");
    } finally {
      setHasSubmitted(true);
    }
  };
  const handlePrevious = () => {
    router.back();
  };
  return (
    <>
      {hasLoaded && (
        <AdminLayout>
          <h1>
            {applicationType == IS_FOR_HIGHEST_QUALIFICATION
              ? "Highest Qualification"
              : "Previous Qualification"}
          </h1>
          <div
            className="scrollable-div"
            style={{
              backgroundColor: "#E5E4E2",
              padding: 20,
              marginBottom: 100,
            }}
          >
            <Message
              attached
              header={
                applicationType == IS_FOR_HIGHEST_QUALIFICATION
                  ? "Highest Qualification"
                  : "Previous Qualification"
              }
              content="Fill out the form below"
            />
            {/* className="attached fluid segment" */}
            <Form className="attached fluid segment" onSubmit={handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  required={true}
                  value={name}
                  className={styles.txtAdmin}
                  fluid
                  onChange={handleChange}
                  name="name"
                  label="Name of Institution"
                  placeholder="Name of institution"
                />
                <br />
                <br />

                <Form.Input
                  required={true}
                  className={styles.txtAdmin}
                  fluid
                  onChange={handleChange}
                  name="grade"
                  value={grade}
                  label="Grade"
                  placeholder="Grade"
                />
                <br />
              </Form.Group>
              <br />
              <br />

              <Form.Group widths="equal">
                {hasLoaded && (
                  <Form.Field
                    defaultValue={selectedQualificationType}
                    control={Select}
                    options={qualificationOptions}
                    name="qualification"
                    onChange={handleOptionChange}
                    label={{
                      children: "QualificationType",
                      htmlFor: "form-select-control-qualificationType",
                    }}
                    placeholder="Qualification Type"
                    search
                    searchInput={{
                      id: "form-select-control-qualificationType",
                    }}
                  />
                )}
                <br />
                {hasLoaded && (
                  <Form.Field
                    defaultValue={selectedProgramYear}
                    control={Select}
                    options={yearOptions}
                    name="year"
                    onChange={handleOptionChange}
                    label={{
                      children: "Year",
                      htmlFor: "form-select-control-year",
                    }}
                    placeholder={selectedProgramYear || "Program Year"}
                    search
                  />
                )}
                <br />
                {hasLoaded && (
                  <Form.Field
                    defaultValue={selectedCompleted}
                    control={Select}
                    options={completedOptions}
                    onChange={handleOptionChange}
                    name="completed"
                    label={{
                      children: "Completed",
                      htmlFor: "form-select-control-gender",
                    }}
                    placeholder="Completed"
                    search
                    searchInput={{ id: "form-select-control-completed" }}
                  />
                )}
                <br />
              </Form.Group>
              <br />

              <br />
              <hr />
              <br />
              <br />
              <Button onClick={handlePrevious} type="button">
                Back
              </Button>

              <Button
                style={{ float: "right" }}
                disabled={!hasSubmitted}
                loading={!hasSubmitted}
                type="submit"
                primary
              >
                Save & Continue
              </Button>
              {applicationType == IS_FOR_PREVIOUS_QUALIFICATION && (
                <Button
                  color="green"
                  onClick={handleSkip}
                  style={{ float: "right" }}
                  type="button"
                >
                  Skip
                </Button>
              )}
              {/* <Button
              as="a"
              href={`/user/previous-qualification/${agentUserId}`}
              style={{ float: "right" }}
              type="button"
              primary
            >
              Proceed with application
            </Button> */}
            </Form>
            <br />
            <br />
            <br />
            <br />
          </div>
        </AdminLayout>
      )}
    </>
  );
}

export default qualificationPage;
