import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert";
import Link from "next/link";
import AdminLayout from "../../AdminLayout";
import { MyModal } from "../../../components/my-modal";
import { useRouter } from "next/router";
import ReactWhatsapp from "react-whatsapp";
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
  Menu,
} from "semantic-ui-react";
import {
  DEFAULT_COLOR,
  SEND_EMAIL_VERIFICATION,
  getCookieAsync,
} from "../../../utils/global";
function UserDashboard({
  applications,
  highestQualification,
  previousQualification,
  highSchool,
  englishTest,
  sponsor,
  visaHistory,
  documents,
  userId,
  isEmailVerified,
}) {
  const router = useRouter();
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [agentUsers, setAgentUsers] = useState([]);

  const [open, setOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  //activeIndex
  const handleApply = () => {
    if (isEmailVerified) {
      router.push(`/user/user-info`);
    } else {
      showAlert(
        "Verify Email",
        "To proceed with your application, please verify your email address"
      );
    }
  };
  const handleVerifyEmail = async () => {
    setShowSpinner(true);
    const email = await getCookieAsync("email");

    await SEND_EMAIL_VERIFICATION({ email: email });
    router.push("/verify-email");
  };
  const handleItemClick = (e, { name }) => {
    if (name === "create") {
      router.push(`/user/payment/${userId}`);
    } else if (name == "document") {
      router.push(`/user/upload-document/${userId}`);
    } else if (name == "list") {
      router.push(`/user/payment/list/${userId}`);
    }
  };
  const getStatus = (hasCompleted) => {
    return hasCompleted ? (
      <>
        Completed <Icon color="green" name="checkmark" />
      </>
    ) : (
      <>
        Not Completed <Icon color="red" name="close" />
      </>
    );
  };
  return (
    <>
      <AdminLayout>
        <h1>User Dashboard</h1>

        <div
          className="scrollable-div"
          style={{
            backgroundColor: "#E5E4E2",
            padding: 20,
            marginBottom: 100,
          }}
        >
          <ReactWhatsapp
            style={{ borderColor: "none", border: 0 }}
            number="+44 7424 672038"
            message="Hello I want to make an enquiry"
          >
            {" "}
            <Button color="green">
              {" "}
              Chat Us <Icon name="whatsapp" />
            </Button>
          </ReactWhatsapp>
          <Menu>
            <Menu.Item
              name="create"
              content="Make Payment"
              onClick={handleItemClick}
            />

            <Menu.Item
              name="list"
              content="Payment List"
              onClick={handleItemClick}
            />
            <Menu.Item
              name="document"
              content="Documents"
              onClick={handleItemClick}
            />
          </Menu>
          {applications.length > 0 && (
            <Button onClick={handleApply} fluid primary>
              Create another application
            </Button>
          )}
          {applications.length == 0 && (
            <Button onClick={handleApply} fluid primary>
              Continue with application
            </Button>
          )}
          {!isEmailVerified && (
            <Message
              warning
              header="Verify Your Email"
              content={
                <>
                  {`To proceed with your application, please verify your email address. `}
                  {!showSpinner && (
                    <a
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={handleVerifyEmail}
                    >
                      {"   "}
                      Verify email{" "}
                    </a>
                  )}
                  {showSpinner && (
                    <span
                      class="spinner-border spinner-border-lg"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                </>
              }
            />
          )}
          {applications.length > 0 && documents.length == 0 && (
            <Message
              warning
              header="Document Upload Required!"
              content={
                <>
                  {`Note: For your application to be processed you are required to
                upload your documents .`}
                  <a href={`/user/upload-document/${userId}`}> Upload doc</a>
                </>
              }
            />
          )}
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="3"></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row positive>
                <Table.Cell>User Profile</Table.Cell>
                <Table.Cell>{getStatus(true)}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Label color="orange">Required</Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Highest Qualification</Table.Cell>
                <Table.Cell>{getStatus(highestQualification)}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Label color="orange">Required</Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Previous Qualification</Table.Cell>
                <Table.Cell>{getStatus(previousQualification)}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Label color="green">Not Required</Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>High School</Table.Cell>
                <Table.Cell>{getStatus(highSchool)}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Label color="orange">Required</Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>English Test</Table.Cell>
                <Table.Cell>{getStatus(englishTest)}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Label color="green">Not Required</Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Sponsorship</Table.Cell>
                <Table.Cell>{getStatus(sponsor)}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Label color="orange">Required</Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Visa History</Table.Cell>
                <Table.Cell>{getStatus(visaHistory)}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Label color="orange">Required</Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Documents</Table.Cell>
                <Table.Cell>{getStatus(documents.length > 0)}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Label color="orange">Required</Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Application</Table.Cell>
                <Table.Cell>{getStatus(applications.length > 0)}</Table.Cell>
                <Table.Cell textAlign="right">
                  <Label color="orange">Required</Label>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <br />
          <br />
          <br />
          {applications.length == 0 && (
            <Message floating>
              <h4 style={{ textAlign: "center" }}>
                {" "}
                You have not made any application yet!
              </h4>
            </Message>
          )}
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

export default UserDashboard;
