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
  Table,
  Icon,
  Message,
} from "semantic-ui-react";
import { ERROR_TITLE } from "../../layout/headers/menu-data";
import {
  DELETE_DOCUMENT,
  POST_DOCUMENT,
  POST_DOCUMENT_SAVE,
  REQUIRED_MSG,
  SIGN_IN_URL,
  TOKEN,
  getCookieAsync,
} from "../../utils/global";
import { useRouter } from "next/router";
function DocumentPage({ agentUserId = "" }) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const [score, setScore] = useState("");
  const [documents, setDocuments] = useState([]);
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
      const result = await POST_DOCUMENT(
        agentUserId ? { userId: agentUserId, isForAgent: true } : {}
      );
      const res = result.data.data;
      setDocuments(res);

      // if (res) {
      //   setId(res.id);
      //   setSelectedTestType(res.name);
      //   setScore(res.score);
      // }
    } catch (err) {
      console.log("err");
    } finally {
      setHasLoaded(true);
    }
  }
  const handleFileSelect = (event) => {
    setOriginalName(event.target.files[0].name);
    setSelectedFile(event.target.files[0]);
  };

  const handlePrevious = () => {
    router.back();
  };
  const handleChange = (event, data) => {
    const value = data.value;

    setName(value);
  };
  const handleDeleteFile = (item) => {
    swal({
      title: `Are you sure you want to delete ${item.name}?`,
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      // buttons: true,
      buttons: ["No", "Yes"],

      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await DELETE_DOCUMENT(item.id);
        swal("File has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Your file is intact!");
      }
    });
  };
  const handleSubmit = async () => {
    if (!selectedFile) {
      showAlert(ERROR_TITLE, REQUIRED_MSG("Document"));
      return;
    }

    const formData = new FormData();
    if (agentUserId) {
      formData.append("userId", agentUserId);
      formData.append("isForAgent", true);
    }
    formData.append("docs", selectedFile);
    formData.append("name", name);
    formData.append("originalName", originalName);
    setHasSubmitted(false);

    try {
      const result = await POST_DOCUMENT_SAVE(formData);

      const res = result.data;
      if (res.error) {
        showAlert("Error", "Could not save ");
      } else {
        if (agentUserId) {
          // router.push(`/user/sponsor/${agentUserId}`);
        } else {
          // router.push(`/user/sponsor`);
        }
      }
    } catch (err) {
      showAlert("Error", "Could not save ");
    } finally {
      setHasSubmitted(true);
      window.location.reload();
    }
  };

  return (
    <>
      <AdminLayout>
        <h1>Upload Document</h1>
        <div
          className="scrollable-div"
          style={{ backgroundColor: "#E5E4E2", padding: 20, marginBottom: 100 }}
        >
          <Message
            attached
            header="Upload Document"
            content="Fill out the form below"
          />
          {/* className="attached fluid segment" */}
          <Form className="attached fluid segment" onSubmit={handleSubmit}>
            <Form.Input
              type="file"
              onChange={handleFileSelect}
              className={styles.txtAdmin}
              fluid
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
              //onChange={handleChange}

              label="Document upload"
              placeholder="Document upload"
            />
            <br />
            <br />
            <Form.Input
              className={styles.txtAdmin}
              fluid
              required
              onChange={handleChange}
              name="name"
              label="Document's name"
              placeholder="Document name"
            />

            <br />
            <hr />
            <br />
            <br />
            {/* <Button onClick={handlePrevious} type="button">
              Back
            </Button> */}
            <Button
              style={{ float: "right" }}
              disabled={!hasSubmitted}
              loading={!hasSubmitted}
              type="submit"
              primary
            >
              Upload File
            </Button>
            <br />
            <br />
          </Form>
          <br />
          <br />
          <br />
          <br />
          {documents.length > 0 && (
            <Table unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Document</Table.HeaderCell>
                  <Table.HeaderCell textAlign="right"></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {documents.map((item) => {
                  return (
                    <Table.Row>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>
                        <a target="_blank" href={item.url}>
                          <Icon name="download" />
                        </a>
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <Icon
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteFile(item)}
                          color="red"
                          name="trash"
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default DocumentPage;
