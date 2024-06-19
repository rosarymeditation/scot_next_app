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
import {
  ERROR_TITLE,
  GET_QUALIFICATION_YEAR,
  IS_FOR_HIGHEST_QUALIFICATION,
} from "../../layout/headers/menu-data";
import {
  POST_HIGH_SCHOOL,
  POST_HIGH_SCHOOL_SAVE,
  REQUIRED_MSG,
  SIGN_IN_URL,
  TOKEN,
  getCookieAsync,
} from "../../utils/global";
import { useRouter } from "next/router";
function HighSchoolPage({ agentUserId = "" }) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [name, setName] = useState("");
  const [userData, setUserData] = useState({});
  const [selectedProgramYear, setSelectedProgramYear] = useState("");
  let [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    loadInit();
    const year = GET_QUALIFICATION_YEAR();
    setYearOptions(year);
  }, []);

  //  hq_grade,
  //     hq_schoolName,
  //     hq_completed,
  //     hq_programmeYear,
  //     postUserId,
  //     qualificationType,
  async function loadInit() {
    const token = await getCookieAsync(TOKEN);
    if (!token) {
      router.push(SIGN_IN_URL);
    }
    try {
      const result = await POST_HIGH_SCHOOL(
        agentUserId ? { userId: agentUserId, isForAgent: true } : {}
      );
      // highSchoolName,
      // completionYear,
      const res = result.data.data;
      setUserData(res);
      if (res) {
        setId(res.id);
        setName(res.highSchoolName);
        setSelectedProgramYear(res.completionYear);
      }
    } catch (err) {
    } finally {
      setHasLoaded(true);
    }
  }

  const handleOptionChange = (_, arg) => {
    const value = arg.value;
    setSelectedProgramYear(value);
  };

  const handleChange = (event, data) => {
    const name = data.name;
    const value = data.value;

    if (name == "name") {
      setName(value);
    }
  };
  const handleSubmit = async () => {
    if (!selectedProgramYear) {
      showAlert(ERROR_TITLE, REQUIRED_MSG("Program year"));
      return;
    }
    setHasSubmitted(false);

    try {
      const data = {
        highSchoolName: name,
        completionYear: selectedProgramYear,
      };

      if (agentUserId) {
        data.userId = agentUserId;
        data.isForAgent = true;
      }
      const result = await POST_HIGH_SCHOOL_SAVE(data);

      const res = result.data;
      if (res.error) {
        showAlert("Error", "Could not save ");
      } else {
        if (agentUserId) {
          router.push(`/user/english-test/${agentUserId}`);
        } else {
          router.push(`/user/english-test`);
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
      <AdminLayout>
        <h1>High School Qualification</h1>
        <div
          className="scrollable-div"
          style={{ backgroundColor: "#E5E4E2", padding: 20, marginBottom: 100 }}
        >
          <Message
            attached
            header="High School"
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

export default HighSchoolPage;
