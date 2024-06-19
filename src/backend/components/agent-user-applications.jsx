import React from "react";
import styles from "../admin.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert";
import Link from "next/link";
import { userSchema } from "../../utils/validation-schema";
import Cookies from "js-cookie";
import AdminLayout from "../AdminLayout";
import { MyModal } from "../../components/my-modal";
import ErrorMsg from "../../components/forms/error-msg";
import {
  Button,
  Checkbox,
  Form,
  Segment,
  Select,
  Icon,
  Table,
  Modal,
} from "semantic-ui-react";
import { ERROR_TITLE } from "../../layout/headers/menu-data";
import {
  ADMIN_ROLE,
  AGENT_ROLE,
  DEFAULT_COLOR,
  GLOBAL_URL,
  POST_APPLICATION_LIST,
  POST_COUNTRIES,
  POST_FIND_AGENT_USERS,
  POST_FIND_ALL_APPLICATION_BY_USER,
  POST_PROFILE_SAVE,
  POST_USER_PROFILE,
  ROLE,
  TOKEN,
  USER_ROLE,
  getCookieAsync,
} from "../../utils/global";
function AgentUserApplicationsPage({ agentUserId = "" }) {
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const token = await getCookieAsync(TOKEN);

    if (!token) {
      console.log("Not token ----------------------");
      router.push(SIGN_IN_URL);
    }
    const result = await POST_FIND_ALL_APPLICATION_BY_USER({
      userId: agentUserId,
    });
    const res = result.data.data;

    setUser(res[0].User);
    setApplications(res);
  };

  return (
    <>
      <AdminLayout>
        <br />
        <br />
        <br />
        <br />
        <div
          className="scrollable-div"
          style={{
            backgroundColor: "#E5E4E2",
            padding: 20,
            marginBottom: 100,
          }}
        >
          <h1>
            {user?.firstname} {user?.lastname} Applications
          </h1>
          {applications.length > 0 && (
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Ref. No</Table.HeaderCell>
                  <Table.HeaderCell>Course One</Table.HeaderCell>
                  <Table.HeaderCell>Course Two</Table.HeaderCell>
                  <Table.HeaderCell>Date of Submission</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {applications.map((item) => {
                  return (
                    <Link href={`/user/application-details/${item.id}`}>
                      <Table.Row style={{ cursor: "pointer" }}>
                        <Table.Cell>
                          <b style={{ color: DEFAULT_COLOR }}>{item.refNo}</b>
                        </Table.Cell>
                        <Table.Cell>{item.courseOne}</Table.Cell>
                        <Table.Cell>{item.courseTwo}</Table.Cell>
                        <Table.Cell>{item.createdAt}</Table.Cell>
                      </Table.Row>
                    </Link>
                  );
                })}
              </Table.Body>
            </Table>
          )}
          <br />
          <br />
          <br />
          <br />
        </div>
      </AdminLayout>
    </>
  );
}

export default AgentUserApplicationsPage;
