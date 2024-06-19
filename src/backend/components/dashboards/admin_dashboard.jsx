import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert";
import Link from "next/link";
import AdminLayout from "../../AdminLayout";
import { MyModal } from "../../../components/my-modal";
import { useRouter } from "next/router";
import moment from "moment";
import {
  Button,
  Checkbox,
  Form,
  Segment,
  Select,
  Icon,
  Table,
  Modal,
  Label,
  Accordion,
  Message,
} from "semantic-ui-react";
import {
  DEFAULT_COLOR,
  DELETE_APPLICATION,
  POST_FIND_FEMALE,
  POST_GET_AGENCIES,
  POST_GET_ALL_AGENCIES,
  POST_GET_APPLICATIONS_FOR_DASH,
  POST_GET_USERS_FOR_DASH,
  POST_TOTAL_APPLICATIONS,
  POST_TOTAL_FEMALE,
  POST_TOTAL_MALE,
  POST_TOTAL_USERS,
} from "../../../utils/global";
function AdminDashboard() {
  const router = useRouter();
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [agents, setAgents] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  //activeIndex
  useEffect(() => {
    loadAgencies();
    loadApplications();
    loadTotalApplications();
    loadTotalUsers();
    loadUsers();
    loadTotalMale();
    loadTotalFemale();
  }, []);
  const handleCloseModal = (value) => {};
  const loadAgencies = async () => {
    const res = await POST_GET_ALL_AGENCIES();
    setAgents(res.data.data);
  };
  const loadTotalApplications = async () => {
    POST_TOTAL_APPLICATIONS().then((res) => {
      setTotalApplications(res?.data?.data.length);
    });
  };
  const loadTotalUsers = async () => {
    POST_TOTAL_USERS().then((res) => {
      setTotalUsers(res?.data?.data.length);
    });
  };
  const loadTotalMale = async () => {
    POST_TOTAL_MALE().then((res) => {
      setTotalMale(res?.data?.data.length);
    });
  };
  const loadTotalFemale = async () => {
    POST_TOTAL_FEMALE().then((res) => {
      setTotalFemale(res?.data?.data.length);
    });
  };
  const loadUsers = async () => {
    const res = await POST_GET_USERS_FOR_DASH();
    setUsers(res.data.data);
  };
  const handleDelete = (item) => {
    swal({
      title: `Are you sure you want to delete ${item.refNo}?`,
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      // buttons: true,
      buttons: ["No", "Yes"],

      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await DELETE_APPLICATION(item.id);
        swal("Application has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Application is intact!");
      }
    });
  };
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    // const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };
  const loadApplications = async () => {
    const res = await POST_GET_APPLICATIONS_FOR_DASH();

    setApplications(res.data.data);
  };
  const smile = (
    <span>
      {" "}
      Yes{"  "} 
      <img
        style={{ height: 25, width: 25 }}
        src="/assets/images/smile.png"
      ></img>
    </span>
  );
  const sad = (
    <span> 
      No{"  "} 
      <img style={{ height: 25, width: 25 }} src="/assets/images/sad.png"></img>
    </span>
  );
  return (
    <>
      <MyModal open={open} handleCloseModal={handleCloseModal} />
      <AdminLayout>
        <h1>Admin Dashboard</h1>
        <Table color="blue">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Total Users</Table.HeaderCell>
              <Table.HeaderCell>Total Applications</Table.HeaderCell>
              <Table.HeaderCell>Total Male</Table.HeaderCell>
              <Table.HeaderCell>Total Female</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>{totalUsers}</Table.Cell>
              <Table.Cell>{totalApplications}</Table.Cell>
              <Table.Cell>{totalMale}</Table.Cell>
              <Table.Cell>{totalFemale}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Segment style={{ marginTop: 100, marginBottom: 150 }}>
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleClick}
            >
              <Icon name="dropdown" />
              Applications
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              {applications.length > 0 && (
                <>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Ref. No.</Table.HeaderCell>
                        <Table.HeaderCell> Names</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Submission Origin</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {applications.map((item) => {
                        return (
                          <Table.Row
                            key={item.id}
                            style={{ cursor: "pointer" }}
                          >
                            <Table.Cell>
                              <b>{item.refNo}</b>
                            </Table.Cell>
                            <Table.Cell>
                              <b style={{ color: DEFAULT_COLOR }}>
                                {`${item?.User?.firstname || "Unknowm"} ${
                                  item?.User?.middlename || ""
                                } ${item?.User?.lastname || "Unknown"}`}
                              </b>
                            </Table.Cell>
                            <Table.Cell>
                              {moment(item.updatedAt).format(
                                "MMMM DD, YYYY HH:mm:ss"
                              )}
                            </Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                            {item.User.Agent && (
                              <Table.Cell>
                                {item.User.Agent?.agencyName}
                              </Table.Cell>
                            )}
                            {!item.User.Agent && (
                              <Table.Cell>Individual</Table.Cell>
                            )}
                            <Table.Cell>
                              <Button
                                as="a"
                                href={`/user/application-details/${item.id}`}
                                size="mini"
                                color="green"
                              >
                                <Icon name="file" /> View Applications
                              </Button>{" "}
                            </Table.Cell>
                            <Table.Cell>
                              <a onClick={() => handleDelete(item)}>
                                <Icon name="trash" color="red" />
                              </a>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                  <Message>
                    <Button
                      href="/admin/applications"
                      fluid
                      color="blue"
                      as="a"
                    >
                      See All Applications
                    </Button>
                  </Message>
                </>
              )}
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={handleClick}
            >
              <Icon name="dropdown" />
              Users
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              {users.length > 0 && (
                <>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Names</Table.HeaderCell>
                        <Table.HeaderCell> Email</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Country</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Has Applied?</Table.HeaderCell>
                        <Table.HeaderCell>Email Verification</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {users.map((item) => {
                        return (
                          <Table.Row
                            key={item.id}
                            style={{ cursor: "pointer" }}
                          >
                            <Table.Cell>
                              <b style={{ color: DEFAULT_COLOR }}>
                                {`${item?.firstname || "Unknown"} ${
                                  item?.middlename || ""
                                } ${item?.lastname || "Unknown"}`}
                              </b>
                            </Table.Cell>
                            <Table.Cell>
                              <b style={{ color: DEFAULT_COLOR }}>
                                {`${item.email}`}
                              </b>
                            </Table.Cell>
                            <Table.Cell>{item.phone}</Table.Cell>
                            <Table.Cell>
                              {moment(item.updatedAt).format(
                                "MMMM DD, YYYY HH:mm:ss"
                              )}
                            </Table.Cell>

                            <Table.Cell>{item.country?.name}</Table.Cell>
                            <Table.Cell>
                              {item.Agent?.agencyName || "Individual"}
                            </Table.Cell>
                            <Table.Cell>
                              {item?.Applications?.length > 0 ? "YES" : "NO"}
                            </Table.Cell>
                            <Table.Cell>
                              {item.hasEmailVerified ? smile : sad}
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                  <Message>
                    <Button href="/admin/users" fluid color="blue" as="a">
                      See All Users
                    </Button>
                  </Message>
                </>
              )}
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={handleClick}
            >
              <Icon name="dropdown" />
              Agencies
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              {agents.length > 0 && (
                <>
                  {" "}
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Names</Table.HeaderCell>
                        <Table.HeaderCell> Email</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Country</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {agents.map((item) => {
                        return (
                          <Table.Row
                            key={item.id}
                            style={{ cursor: "pointer" }}
                          >
                            <Table.Cell>
                              <b style={{ color: DEFAULT_COLOR }}>
                                {`${item?.agencyName}`}
                              </b>
                            </Table.Cell>
                            <Table.Cell>
                              <b style={{ color: DEFAULT_COLOR }}>
                                {`${item.email}`}
                              </b>
                            </Table.Cell>
                            <Table.Cell>{item.phone}</Table.Cell>
                            <Table.Cell>
                              {moment(item.updatedAt).format(
                                "MMMM DD, YYYY HH:mm:ss"
                              )}
                            </Table.Cell>

                            <Table.Cell>{item.country?.name}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                  <Message>
                    <Button href="/admin/agents" fluid color="blue" as="a">
                      See All Agents
                    </Button>
                  </Message>
                </>
              )}
            </Accordion.Content>
          </Accordion>
        </Segment>
      </AdminLayout>
    </>
  );
}

export default AdminDashboard;
