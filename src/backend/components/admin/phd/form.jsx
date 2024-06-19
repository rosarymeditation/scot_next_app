import React from "react";
import styles from "../../../admin.module.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import AdminLayout from "../../../AdminLayout";
import { Button, Form, Select, TextArea, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Loader } from "../../../../components/loader";
import {
  GET_PHD_APPLICATION_BY_ID,
  POST_BANNER_SAVE,
  POST_FIND_BY_ID_BANNER,
  POST_PHD_APPLICATIONS,
  REQUIRED_MSG,
  URL_BANNER_LIST,
} from "../../../../utils/global";
import { VALIDATION_TITLE } from "../../../../layout/headers/menu-data";
import { setLocale } from "yup";
import { setLazyProp } from "next/dist/server/api-utils";
function FormPage({ id = "" }) {
  const router = useRouter();

  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [hasSubmitted, setHasSubmitted] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("");
  const [qualificationOptions, setQualificationOptions] = useState([]);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    if (id) {
      loadInit();
    } else {
      setHasLoaded(true);
    }
  }, []);

  async function loadInit() {
    const result = await GET_PHD_APPLICATION_BY_ID({ id: id });
    const res = result.data.data;
    const {
      firstname,
      middlename,
      lastname,
      phone,
      email,
      topic,
      phdQualificationId,
    } = res;
    setHasLoaded(true);
    if (res) {
      setFirstname(firstname);
      setMiddlename(middlename);
      setLastname(lastname);
      setPhone(phone);
      setEmail(email);
      setTopic(topic);
      setSelectedQualification(phdQualificationId);
    }
  }

  const handlePrevious = () => {
    router.back();
  };

  const handleBannerSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedBanner(selectedFile);
    const imageURL = URL.createObjectURL(selectedFile);
    setPreviewUrl(imageURL);
  };

  return (
    <>
      <AdminLayout>
        {!hasLoaded && <Loader />}
        {hasLoaded && (
          <>
            <h1>{`${firstname} ${middlename} ${lastname}`} Application</h1>
            <div
              className="scrollable-div"
              style={{
                backgroundColor: "#E5E4E2",
                padding: 20,
                marginBottom: 100,
              }}
            >
              <Form>
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  value={firstname}
                  readOnly
                  label="Fist name"
                  required
                  placeholder="First name"
                />
                <br />
                <br />
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  placeholder="Middle name"
                  value={middlename}
                  required
                  label="Middle name"
                  readOnly
                />
                <br />
                <br />
                <br />
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  label="Last name"
                  value={lastname}
                  required
                  readOnly
                />
                <br />
                <br />
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  label="Email"
                  value={email}
                  required
                  readOnly
                />
                <br />
                <br />
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  label="Phone"
                  value={phone}
                  required
                  readOnly
                />
                <br />
                <br />
                <Form.TextArea
                  label="Topic"
                  style={{ height: 200 }}
                  readOnly
                  className={styles.txtAdmin}
                  fluid
                  value={topic}
                />
                <br />
              </Form>
              <br />
              <br />
              <br />
              <br />
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
