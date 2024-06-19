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
  Segment,
  Select,
  Message,
} from "semantic-ui-react";
import { ERROR_TITLE } from "../../layout/headers/menu-data";
import {
  NO,
  POST_SPONSOR_SAVE,
  POST_VISA_HISTORY,
  POST_VISA_HISTORY_SAVE,
  REQUIRED_MSG,
  SIGN_IN_URL,
  TOKEN,
  YES,
  getCookieAsync,
} from "../../utils/global";
import { useRouter } from "next/router";
function VisaHistoryPage({ agentUserId = "" }) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedHasApplied, setSelectedHasApplied] = useState("");
  const [selectedHasRefused, setSelectedHasRefused] = useState("");
  const [purpose, setPurpose] = useState("");
  const [reason, setReason] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [userData, setUserData] = useState({});
  let [relationshipOptions, setRelationshipOptions] = useState([]);

  useEffect(() => {
    loadInit();
  }, []);

  const appliedOptions = [
    { key: "1", text: "Select one", value: "" },
    { key: "y", text: YES, value: YES },
    { key: "n", text: NO, value: NO },
  ];

  const refusedOptions = [
    { key: "1", text: "Select one", value: "" },
    { key: "y", text: YES, value: YES },
    { key: "n", text: NO, value: NO },
  ];
  const resetOtherFields = () => {
    setSelectedHasRefused("");
    setMoreInfo("");
    setPurpose("");
    setReason("");
  };
  async function loadInit() {
    const token = await getCookieAsync(TOKEN);
    if (!token) {
      router.push(SIGN_IN_URL);
    }
    try {
      const result = await POST_VISA_HISTORY(
        agentUserId ? { userId: agentUserId, isForAgent: true } : {}
      );

      const res = result.data.data;
      setUserData(res);
      if (res) {
        setId(res.id);
        setSelectedHasApplied(res.hasApplied);
        setSelectedHasRefused(res.hasRefused);
        setPurpose(res.purpose);
        setReason(res.reason);
        setMoreInfo(res.moreInfo);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setHasLoaded(true);
    }
  }

  const handleOptionChange = (_, arg) => {
    const value = arg.value;
    const name = arg.name;
    if (name == "selectedHasApplied") {
      if (value == NO) {
        resetOtherFields();
      }
      setSelectedHasApplied(value);
    } else if (name == "selectedHasRefused") {
      setSelectedHasRefused(value);
    }
  };

  const handleChange = (event, data) => {
    const name = data.name;
    const value = data.value;

    if (name == "purpose") {
      setPurpose(value);
    } else if (name == "reason") {
      setReason(value);
    } else if (name == "moreInfo") {
      setMoreInfo(value);
    }
  };

  const handleSubmit = async () => {
    if (!selectedHasApplied) {
      showAlert(
        ERROR_TITLE,
        "Indicate if you have applied for a UK visa before"
      );
      return;
    }
    if (selectedHasApplied == YES && !purpose) {
      showAlert(ERROR_TITLE, REQUIRED_MSG("Travel purpose"));
      return;
    }
    if (selectedHasApplied == YES && !selectedHasRefused) {
      showAlert(
        ERROR_TITLE,
        "Indicate if you have been refused UK visa before"
      );
      return;
    }
    if (selectedHasApplied == YES && selectedHasRefused == YES && !reason) {
      showAlert(ERROR_TITLE, "Reason for visa refusal is required");
      return;
    }

    const data = {
      hasApplied: selectedHasApplied,
      hasRefused: selectedHasRefused,
      purpose: purpose,
      reason: reason,
      moreInfo: moreInfo,
    };

    if (agentUserId) {
      data.userId = agentUserId;
      data.isForAgent = true;
    }

    setHasSubmitted(false);

    try {
      const result = await POST_VISA_HISTORY_SAVE(data);
      console.log(result.data.error);
      const res = result.data;
      if (res.error) {
        showAlert("Error", "Could not save ");
      } else {
        if (agentUserId) {
          router.push(`/user/application/${agentUserId}`);
        } else {
          router.push(`/user/application`);
        }
      }
    } catch (err) {
      showAlert("Error", "Could not save ");
    } finally {
      setHasSubmitted(true);
    }
  };
  // const handleSubmit = async () => {
  //   if (!selectedHasApplied) {
  //     showAlert(
  //       ERROR_TITLE,
  //       "Indicate if you have applied for a UK visa before"
  //     );
  //     return;
  //   }
  //   if (selectedHasApplied == YES && !purpose) {
  //     showAlert(ERROR_TITLE, REQUIRED_MSG("Travel purpose"));
  //     return;
  //   }
  //   if (selectedHasApplied == YES && !selectedHasRefused) {
  //     showAlert(
  //       ERROR_TITLE,
  //       "Indicate if you have been refused UK visa before"
  //     );
  //     return;
  //   }
  //   if (selectedHasApplied == YES && selectedHasRefused == YES && !reason) {
  //     showAlert(ERROR_TITLE, "Reason for visa refusal is required");
  //     return;
  //   }

  //   const data = {
  //     hasApplied: selectedHasApplied,
  //     hasRefused: selectedHasRefused,
  //     purpose: purpose,
  //     reason: reason,
  //     moreInfo: moreInfo,
  //   };

  //   if (agentUserId) {
  //     data.userId = agentUserId;
  //     data.isForAgent = true;
  //   }

  //   const result = await POST_VISA_HISTORY_SAVE(data);
  //   console.log(result.data);
  // };
  const handlePrevious = () => {
    router.back();
  };
  return (
    <>
      <AdminLayout>
        <h1>VISA HISTORY</h1>
        <div
          className="scrollable-div"
          style={{ backgroundColor: "#E5E4E2", padding: 20, marginBottom: 100 }}
        >
          <Message
            attached
            header="Visa History"
            content="Fill out the form below"
          />
          {/* className="attached fluid segment" */}
          <Form className="attached fluid segment" onSubmit={handleSubmit}>
            {hasLoaded && (
              <Form.Field
                defaultValue={selectedHasApplied}
                control={Select}
                options={appliedOptions}
                name="selectedHasApplied"
                onChange={handleOptionChange}
                label={{
                  children: "Have you applied for a UK visa before?",
                  htmlFor: "form-select-control-qualificationType",
                }}
                placeholder="Have you applied for a UK visa before?"
                search
                searchInput={{ id: "form-select-control-qualificationType" }}
              />
            )}

            {selectedHasApplied == YES && (
              <>
                <Form.Input
                  value={purpose}
                  className={styles.txtAdmin}
                  fluid
                  onChange={handleChange}
                  name="purpose"
                  label="Purpose"
                  placeholder="Purpose"
                />
                <br />
                <br />
                <br />
                {hasLoaded && (
                  <Form.Field
                    defaultValue={selectedHasRefused}
                    control={Select}
                    options={refusedOptions}
                    name="selectedHasRefused"
                    onChange={handleOptionChange}
                    label={{
                      children: "Have you been refused UK visa before",
                      htmlFor: "form-select-control-qualificationType",
                    }}
                    placeholder="Have you been refused UK visa before"
                    search
                    searchInput={{
                      id: "form-select-control-qualificationType",
                    }}
                  />
                )}
                <br />

                {selectedHasRefused == YES && (
                  <>
                    <Form.TextArea
                      value={reason}
                      className={styles.txtAdmin}
                      fluid
                      onChange={handleChange}
                      name="reason"
                      label="Reason of refusal"
                      placeholder="Reason of refusal"
                    />
                    <br />
                    <br />
                    <br />
                  </>
                )}

                <Form.TextArea
                  value={moreInfo}
                  className={styles.txtAdmin}
                  fluid
                  onChange={handleChange}
                  name="moreInfo"
                  label="More info"
                  placeholder="More info"
                />
                <br />
                <br />
              </>
            )}
            <br />
            <br />
            <Button as="a" onClick={handlePrevious} type="button">
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
          </Form>
          <br />
          <br />
          <br />
          <br />
        </div>
      </AdminLayout>
    </>
  );
}
export default VisaHistoryPage;
