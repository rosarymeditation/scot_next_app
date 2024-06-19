import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert";
import Link from "next/link";
import AdminLayout from "../../AdminLayout";
import { MyModal } from "../../../components/my-modal";
import { useRouter } from "next/router";
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
  Dropdown,
  Message,
} from "semantic-ui-react";
import { DEFAULT_COLOR } from "../../../utils/global";
function AgentDashboard({ application }) {
  const router = useRouter();
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [agentUsers, setAgentUsers] = useState([]);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  //activeIndex

  const handleCloseModal = (value) => {
    setOpen(false);
  };

  const handleOnchange = (event, data, id) => {
    const value = data.value;
    if (value == "pay") {
      router.push(`/user/payment/${id}`);
    } else if (value === "list") {
      router.push(`/user/payment/list/${id}`);
    }
  };
  const options = [
    {
      key: "1",
      icon: "credit card outline",
      text: "Make Payment",
      value: "pay",
    },
    { key: "2", icon: "list", text: "Payment List", value: "list" },
  ];

  return (
    <>
      <MyModal open={open} handleCloseModal={handleCloseModal} />
      <AdminLayout>
        <h1>Agent Dashboard</h1>
        <div
          className="scrollable-div"
          style={{
            backgroundColor: "#E5E4E2",
            padding: 20,
            marginBottom: 100,
          }}
        >
          <Button as="a" href="/user/agent-user-info" fluid primary>
            Create a new application
          </Button>
          <hr></hr>
          {application.length > 0 && (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Middle Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Applications</Table.HeaderCell>
                  <Table.HeaderCell>Docs</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {application.map((item) => {
                  return (
                    <Table.Row style={{ cursor: "pointer" }}>
                      <Table.Cell>
                        <b style={{ color: DEFAULT_COLOR }}>{item.firstname}</b>
                      </Table.Cell>
                      <Table.Cell>{item.middlename}</Table.Cell>
                      <Table.Cell>{item.lastname}</Table.Cell>
                      <Table.Cell>
                        {item.Applications.length > 0 && (
                          <a
                            href={
                              item.Applications.length == 1
                                ? `/user/application-details/${item.Applications[0]?.id}`
                                : `/user/agent-user-applications/${item.id}`
                            }
                          >
                            View {item.Applications.length} application(s)
                          </a>
                        )}
                        {item.Applications.length == 0 && (
                          <a>{item.Applications.length}</a>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {item.Documents.length > 0 && (
                          <a>{item.Documents.length} doc(s)</a>
                        )}
                        {item.Documents.length == 0 && (
                          <a>{item.Documents.length}</a>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <Button.Group color="teal">
                          <Button>Payment</Button>
                          <Dropdown
                            onChange={(event, data) =>
                              handleOnchange(event, data, item.id)
                            }
                            className="button icon"
                            floating
                            options={options}
                            trigger={<></>}
                          />
                        </Button.Group>
                      </Table.Cell>

                      <Table.Cell>
                        <Button
                          fluid
                          size="mini"
                          color="orange"
                          as="a"
                          href={`/user/upload-document/${item.id}`}
                        >
                          Upload Docs <Icon name="upload" />
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          fluid
                          size="mini"
                          primary
                          as="a"
                          href={`/user/agent-user-info/${item.id}`}
                        >
                          User Info
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          fluid
                          size="mini"
                          color="green"
                          as="a"
                          href={`/user/qualification/${item.id}`}
                        >
                          {item.Applications.length == 0
                            ? "Continue Application"
                            : "Start another application"}
                        </Button>
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

export default AgentDashboard;
