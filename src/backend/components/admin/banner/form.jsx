import React from "react";
import styles from "../../../admin.module.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import AdminLayout from "../../../AdminLayout";
import { Button, Form, Select, TextArea, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Loader } from "../../../../components/loader";
import {
  POST_BANNER_SAVE,
  POST_FACULTIES,
  POST_GET_BANNER_BY_ID,
  REQUIRED_MSG,
  URL_BANNER_LIST,
} from "../../../../utils/global";
import { VALIDATION_TITLE } from "../../../../layout/headers/menu-data";
import { setLocale } from "yup";
function FormPage({ bannerId = "" }) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedBanner, setSelectedBanner] = useState("");

  useEffect(() => {
    if (bannerId) {
      loadBanner();
    } else {
      setHasLoaded(true);
    }
  }, []);

  async function loadBanner() {
    const result = await POST_GET_BANNER_BY_ID({ id: bannerId });
    const res = result.data.data;
    const { id, title, subTitle, url } = res;
    setHasLoaded(true);
    if (res) {
      setId(id);
      setTitle(title);
      setSubTitle(subTitle);
      setPreviewUrl(url);
    }
  }

  const handlePrevious = () => {
    router.back();
  };
  const handleChange = (event, data) => {
    const value = data.value;
    const name = data.name;
    if (name == "title") {
      setTitle(value);
    } else if (name == "subTitle") {
      setSubTitle(value);
    }
  };
  const handleBannerSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedBanner(selectedFile);
    const imageURL = URL.createObjectURL(selectedFile);
    setPreviewUrl(imageURL);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (!bannerId) {
      if (selectedBanner == "") {
        showAlert(VALIDATION_TITLE, REQUIRED_MSG("Banner"));
        return;
      }
    }

    setHasSubmitted(false);
    formData.append("id", bannerId || "");
    formData.append("url", selectedBanner);
    formData.append("title", title);
    formData.append("subTitle", subTitle);

    try {
      const result = await POST_BANNER_SAVE(formData);

      const res = result.data;
      if (res.error) {
        showAlert("Error", "Could not save ");
      } else {
        router.push(URL_BANNER_LIST);
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
            <h1>{bannerId ? `Update ` : `Create `} Banner</h1>
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
                  value={title}
                  onChange={handleChange}
                  name="title"
                  label="Title"
                  required
                  placeholder="Title"
                />
                <br />
                <br />
                <Form.TextArea
                  className={styles.txtAdmin}
                  fluid
                  value={subTitle}
                  required
                  onChange={handleChange}
                  name="subTitle"
                  label="Sub Title"
                  placeholder="Sub Title"
                />
                <br />
                <br />
                <br />
                <Form.Group widths="equal">
                  <Form.Input
                    type="file"
                    onChange={handleBannerSelect}
                    className={styles.txtAdmin}
                    fluid
                    accept=".png,.jpg,.jpeg,.webp"
                    label={`Upload Banner - Ideal size:Width:1600  and Height:900`}
                    placeholder="Banner upload"
                  />
                </Form.Group>
                <br />
                <br />
                <img
                  style={{ width: "100%", height: 400, objectFit: "fill" }}
                  src={previewUrl || "/assets/images/bg/bg-image-12.jpg"}
                />
                <br />
                <hr />

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
                  {bannerId ? `Update` : `Save`}
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
