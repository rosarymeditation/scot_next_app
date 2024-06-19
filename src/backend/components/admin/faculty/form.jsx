import React from "react";
import styles from "../../../admin.module.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import AdminLayout from "../../../AdminLayout";
import { Button, Form, Select, TextArea, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Loader } from "../../../../components/loader";

import {
  GET_FIND_FACULTY_BY_ID,
  POST_FACULTIES_SAVE,
  POST_FACULTIES_UPDATE,
  URL_FACULTY_LIST,
} from "../../../../utils/global";

function FormPage({ facultyId = "" }) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const [name, setName] = useState("");

  useEffect(() => {
    if (facultyId) {
      loadFaculty();
    } else {
      setHasLoaded(true);
    }
  }, []);

  async function loadFaculty() {
    const result = await GET_FIND_FACULTY_BY_ID(facultyId);
    const res = result.data.data;
    const { name } = res;
    setHasLoaded(true);
    if (res) {
      setName(name);
    }
  }

  const handlePrevious = () => {
    router.back();
  };
  const handleChange = (event, data) => {
    const value = data.value;
    const name = data.name;
    if (name == "name") {
      setName(value);
    }
  };

  const handleSubmit = async () => {
    setHasSubmitted(false);

    try {
      const result = !facultyId
        ? await POST_FACULTIES_SAVE({ name })
        : await POST_FACULTIES_UPDATE({ name, id: facultyId }, facultyId);
   
      const res = result.data;
      if (res.error) {
        showAlert("Error", "Could not save ");
      } else {
        router.push(URL_FACULTY_LIST);
      }
    } catch (err) {
    } finally {
      setHasSubmitted(true);
    }
  };

  return (
    <>
      <AdminLayout>
        {!hasLoaded && <Loader />}
        {hasLoaded && (
          <>
            <h1>{facultyId ? `Update ` : `Create `} Faculty</h1>
            <div
              className="scrollable-div"
              style={{
                backgroundColor: "#E5E4E2",
                padding: 20,
                marginBottom: 100,
              }}
            >
              <Form onSubmit={handleSubmit}>
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  value={name}
                  onChange={handleChange}
                  name="name"
                  label="Name"
                  required
                  placeholder="Name"
                />
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
                  {facultyId ? `Update` : `Save`}
                </Button>
              </Form>
              <br />
              <br />
              <br />
              <br />
            </div>
          </>
        )}
      </AdminLayout>
    </>
  );
}

export default FormPage;
