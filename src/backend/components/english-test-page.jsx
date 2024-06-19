import React from "react";
import styles from "../admin.module.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import AdminLayout from "../AdminLayout";
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
  POST_ENGLISH_TEST,
  POST_ENGLISH_TEST_SAVE,
  REQUIRED_MSG,
  SIGN_IN_URL,
  TOKEN,
  getCookieAsync,
} from "../../utils/global";
import { useRouter } from "next/router";
function EnglishTestPage({ agentUserId = "" }) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const [score, setScore] = useState("");
  const [userData, setUserData] = useState({});
  const [selectedTestType, setSelectedTestType] = useState("");

  useEffect(() => {
    loadInit();
  }, []);

  async function loadInit() {
    const token = await getCookieAsync(TOKEN);
    if (!token) {
      router.push(SIGN_IN_URL);
    }
    try {
      const result = await POST_ENGLISH_TEST(
        agentUserId ? { userId: agentUserId, isForAgent: true } : {}
      );

      const res = result.data.data;
      setUserData(res);
      if (res) {
        setId(res.id);
        setSelectedTestType(res.name);
        setScore(res.score);
      }
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setHasLoaded(true);
    }
  }

  const handleOptionChange = (_, arg) => {
    const value = arg.value;

    setSelectedTestType(value);
  };
  const handlePrevious = () => {
    router.back();
  };
  const handleChange = (event, data) => {
    const value = data.value;
    setScore(value);
  };
  const testTypeOptions = [
    { key: "0", text: "", value: "" },
    { key: "1", text: "TOEFL", value: "TOEFL" },
    { key: "2", text: "IELTS", value: "IELTS" },
    { key: "3", text: "NONE", value: "NONE" },
  ];
  const handleSubmit = async () => {
    if (!selectedTestType) {
      showAlert(ERROR_TITLE, REQUIRED_MSG("Test type"));
      return;
    }

    if (selectedTestType != "NONE" && !score) {
      showAlert(ERROR_TITLE, REQUIRED_MSG("Test score"));
      return;
    }

    const data = {
      name: selectedTestType,
      score: score,
    };

    if (agentUserId) {
      data.userId = agentUserId;
      data.isForAgent = true;
    }

    setHasSubmitted(false);

    try {
      const result = await POST_ENGLISH_TEST_SAVE(data);

      const res = result.data;
      if (res.error) {
        showAlert("Error", "Could not save ");
      } else {
        if (agentUserId) {
          router.push(`/user/sponsor/${agentUserId}`);
        } else {
          router.push(`/user/sponsor`);
        }
      }
    } catch (err) {
      showAlert("Error", "Could not save ");
    } finally {
      setHasSubmitted(true);
    }
  };

  return (
    <>
      <AdminLayout>
        <h1>English Test</h1>
        <div
          className="scrollable-div"
          style={{ backgroundColor: "#E5E4E2", padding: 20, marginBottom: 100 }}
        >
          <Message
            attached
            header="English Test"
            content="Fill out the form below"
          />
          {/* className="attached fluid segment" */}
          <Form className="attached fluid segment" onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              {hasLoaded && (
                <Form.Field
                  defaultValue={selectedTestType}
                  control={Select}
                  options={testTypeOptions}
                  name="selectedTestType"
                  onChange={handleOptionChange}
                  label={{
                    children: "Test Type",
                    htmlFor: "form-select-control-year",
                  }}
                  placeholder={selectedTestType || "Test Type"}
                  search
                />
              )}
              <br />
              {selectedTestType != "NONE" && (
                <Form.Input
                  value={score}
                  className={styles.txtAdmin}
                  fluid
                  onChange={handleChange}
                  name="score"
                  label="Score"
                  placeholder="Score"
                />
              )}
              <br />
            </Form.Group>

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

export default EnglishTestPage;
