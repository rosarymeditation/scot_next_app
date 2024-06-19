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
import {
  ERROR_TITLE,
  GET_QUALIFICATION_YEAR,
  IS_FOR_HIGHEST_QUALIFICATION,
} from "../../layout/headers/menu-data";
import {
  POST_HIGHEST_QUALIFICATION,
  POST_PREVIOUS_QUALIFICATION,
  POST_QUALIFICATION_SAVE,
  POST_RELATIONSHIPS_TYPES,
  POST_SPONSOR,
  POST_SPONSOR_SAVE,
  REQUIRED_MSG,
  SIGN_IN_URL,
  TOKEN,
  getCookieAsync,
} from "../../utils/global";
import { useRouter } from "next/router";
function SponsorPage({
  agentUserId = "",
  applicationType = IS_FOR_HIGHEST_QUALIFICATION,
}) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedRelationship, setSelectedRelationship] = useState("");
  const [occupation, setOccupation] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [userData, setUserData] = useState({});
  let [relationshipOptions, setRelationshipOptions] = useState([]);

  useEffect(() => {
    loadInit();
    loadRelationshipOptions();
  }, []);
  async function loadRelationshipOptions() {
    const result = await POST_RELATIONSHIPS_TYPES();
    const res = result.data.data;

    const relationshipOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setRelationshipOptions(relationshipOptions);
  }

  async function loadInit() {
    const token = await getCookieAsync(TOKEN);
    if (!token) {
      router.push(SIGN_IN_URL);
    }
    try {
      const result = await POST_SPONSOR(
        agentUserId ? { userId: agentUserId, isForAgent: true } : {}
      );

      const res = result.data.data;
      setUserData(res);
      if (res) {
        setId(res.id);
        setSponsor(res.sponsor);
        setName(res.name);
        setBudget(res.budget);
        setOccupation(res.occupation);
        setSelectedRelationship(res.relationshipId);
      }
    } catch (err) {
    } finally {
      setHasLoaded(true);
    }
  }

  const handleOptionChange = (_, arg) => {
    const value = arg.value;
    setSelectedRelationship(value);
  };

  const handleChange = (event, data) => {
    const name = data.name;
    const value = data.value;

    if (name == "name") {
      setName(value);
    } else if (name == "sponsor") {
      setSponsor(value);
    } else if (name == "occupation") {
      setOccupation(value);
    } else if (name == "budget") {
      setBudget(value);
    }
  };
  const handleSubmit = async () => {
    if (!selectedRelationship) {
      showAlert(ERROR_TITLE, REQUIRED_MSG("Relationship type"));
      return;
    }

    const data = {
      name: name,
      sponsor: sponsor,
      relationshipId: selectedRelationship,
      budget: budget,
      occupation: occupation,
    };

    if (agentUserId) {
      data.userId = agentUserId;
      data.isForAgent = true;
    }

    setHasSubmitted(false);

    try {
      const result = await POST_SPONSOR_SAVE(data);

      const res = result.data;
      if (res.error) {
        showAlert("Error", "Could not save ");
      } else {
        if (agentUserId) {
          router.push(`/user/visa-history/${agentUserId}`);
        } else {
          router.push(`/user/visa-history`);
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
        <h1>SPONSOR</h1>
        <div
          className="scrollable-div"
          style={{ backgroundColor: "#E5E4E2", padding: 20, marginBottom: 100 }}
        >
          <Message
            attached
            header="Sponsorship"
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
                label="Sponsor's name"
                placeholder="Sponsor's name"
              />
              <br />

              {hasLoaded && (
                <Form.Field
                  defaultValue={selectedRelationship}
                  control={Select}
                  options={relationshipOptions}
                  name="selectedRelationship"
                  onChange={handleOptionChange}
                  label={{
                    children: "Relationship with sponsor",
                    htmlFor: "form-select-control-qualificationType",
                  }}
                  placeholder="Relationship with sponsor"
                  search
                  searchInput={{ id: "form-select-control-qualificationType" }}
                />
              )}
              <br />
            </Form.Group>
            <br />
            <br />

            <Form.Group widths="equal">
              <Form.Input
                required={true}
                value={occupation}
                className={styles.txtAdmin}
                fluid
                onChange={handleChange}
                name="occupation"
                label="Occupation"
                placeholder="Occupation"
              />
              <br />
              <Form.Input
                required={true}
                value={budget}
                className={styles.txtAdmin}
                fluid
                onChange={handleChange}
                name="budget"
                label="Budget"
                placeholder="Budget"
              />
            </Form.Group>
            <br />
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
export default SponsorPage;
