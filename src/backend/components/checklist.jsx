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
  Accordion,
  Message,
} from "semantic-ui-react";
import { ERROR_TITLE } from "../../layout/headers/menu-data";
import { POST_FIND_ALL_APPLICATION_BY_USER } from "../../utils/global";
function ChecklistPage({ agentUserId = "" }) {
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    //  const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);

    // this.setState({ activeIndex: newIndex });
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
          <Message
            attached
            header="Checklist"
            content="The Scotstudy Checklist is a valuable tool designed to assist international students in navigating the enrollment process for Scottish universities. It serves as a comprehensive guide, ensuring that students cover all the necessary steps and requirements to successfully apply and register for their desired courses. Here is a brief description of the Scotstudy Checklist:"
          />
          <Form className="attached fluid segment">
            <Accordion fluid styled>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Admission Stage
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <p>
                  Admission stage includes checking student’s eligibility to be
                  sure they are qualified for the proposed courses they are
                  interested in. After the eligibility check, students are to
                  provide the requirements stated in the course and application
                  will then be processed for offer of admission.
                </p>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Visa Stage
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <p>
                  Visa is a stage where students have been issued an
                  unconditional offer letter or Confirmation of Acceptance of
                  Studies (CAS) and they are ready to apply for visa or waiting
                  visa decision.
                </p>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Pre-departure Stage
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                <p>
                  Pre-departure is a stage where a student has been issued a
                  study visa and they are preparing to depart from their country
                  of residence to their study destination. Scot-Study organises
                  pre-departure event and Union every enrolment window for
                  students networking, short lecture on immigration regulations,
                  how to apply for professional jobs prior to the end of their
                  studies.
                </p>
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 3}
                index={3}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Enrolment Stage
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 3}>
                <p>
                  Enrolment is the final stage where students arrive at their
                  selected institutions to enrol for their studies and begin
                  classes.
                </p>
              </Accordion.Content>
            </Accordion>
          </Form>

          <br />
        </div>
      </AdminLayout>
    </>
  );
}

export default ChecklistPage;
