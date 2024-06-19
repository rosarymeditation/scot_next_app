import React from "react";
import styles from "../../../admin.module.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import AdminLayout from "../../../AdminLayout";
import { Button, Form, Select, TextArea, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Loader } from "../../../../components/loader";
import {
  POST_GET_TESTIMONY_BY_ID,
  POST_TESTIMONY_SAVE,
  REQUIRED_MSG,
  URL_TESTIMONY_LIST,
} from "../../../../utils/global";
import { VALIDATION_TITLE } from "../../../../layout/headers/menu-data";
import { setLocale } from "yup";
function FormPage({ testimonyId = "" }) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [firstname, setFirstname] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [previewAvatarURL, setPreviewAvatarURL] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (testimonyId) {
      loadTestimony();
    } else {
      setHasLoaded(true);
    }
  }, []);

  async function loadTestimony() {
    const result = await POST_GET_TESTIMONY_BY_ID({ id: testimonyId });
    const res = result.data.data;
    const { id, title, content, firstname, url } = res;
    setHasLoaded(true);
    if (res) {
      setTitle(title);
      setContent(content);
      setFirstname(firstname);
      setPreviewAvatarURL(url);
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
    } else if (name == "firstname") {
      setFirstname(value);
    } else if (name == "content") {
      setContent(value);
    }
  };

  const handleAvatarSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedAvatar(selectedFile);
    const imageURL = URL.createObjectURL(selectedFile);
    setPreviewAvatarURL(imageURL);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (!testimonyId) {
      if (selectedAvatar == "") {
        showAlert(VALIDATION_TITLE, REQUIRED_MSG("User Avatar"));
        return;
      }
    }

    setHasSubmitted(false);
    formData.append("id", testimonyId || "");
    formData.append("title", title);
    formData.append("content", content);
    formData.append("firstname", firstname);
    formData.append("url", selectedAvatar);

    try {
      const result = await POST_TESTIMONY_SAVE(formData);
      
      const res = result.data;
      if (res.error) {
        showAlert("Error", "Could not save ");
      } else {
        router.push(URL_TESTIMONY_LIST);
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
            <h1>{testimonyId ? `Update ` : `Create `} Testimony</h1>
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
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  value={firstname}
                  onChange={handleChange}
                  name="firstname"
                  label="First name"
                  required
                  placeholder="First name"
                />
                <br />
                <br />
                <Form.Group widths="equal">
                  <Form.Input
                    type="file"
                    onChange={handleAvatarSelect}
                    className={styles.txtAdmin}
                    fluid
                    accept=".png,.jpg,.jpeg,.webp"
                    label={`Upload Logo`}
                    placeholder="Banner upload"
                  />
                  <Image
                    circular
                    size="mini"
                    style={{ width: 80, height: 80, objectFit: "fill" }}
                    src={previewAvatarURL || "/assets/default_school_logo.png"}
                  />
                </Form.Group>

                <br />
                <hr />
                <Form.TextArea
                  className={styles.txtAdmin}
                  fluid
                  value={content}
                  required
                  onChange={handleChange}
                  name="content"
                  label="Content"
                  placeholder="Content"
                />
                <br />
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
                  {testimonyId ? `Update` : `Save`}
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
