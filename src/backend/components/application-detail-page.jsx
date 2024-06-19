import React from "react";
import styles from "../admin.module.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import Link from "next/link";
import { userSchema } from "../../utils/validation-schema";
import Cookies from "js-cookie";
import AdminLayout from "../AdminLayout";
import { useRouter } from "next/router";
import ErrorMsg from "../../components/forms/error-msg";
import {
  Button,
  Checkbox,
  Form,
  Segment,
  Select,
  Icon,
  Table,
  Accordion,
  Message,
} from "semantic-ui-react";
import { ERROR_TITLE } from "../../layout/headers/menu-data";
import {
  ADMIN_ROLE,
  NO,
  POST_APPLICATION_ID,
  POST_DECISION_UPDATE,
  POST_DOCUMENT,
  POST_ENGLISH_TEST,
  POST_HIGHEST_QUALIFICATION,
  POST_HIGH_SCHOOL,
  POST_PREVIOUS_QUALIFICATION,
  POST_SPONSOR,
  POST_USER_PROFILE,
  POST_VISA_HISTORY,
  POST_VISA_STATUS_LIST,
  ROLE,
  SIGN_IN_URL,
  TOKEN,
  YES,
  getCookieAsync,
} from "../../utils/global";
function ApplicationDetailPage({ id }) {
  const router = useRouter();
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [profile, setProfile] = useState({});
  const [qualification, setQualification] = useState({});
  const [previousQualification, setPreviousQualification] = useState({});
  const [highSchool, setHighSchool] = useState({});
  const [englisTest, setEnglishTest] = useState({});
  const [sponsor, setSponsor] = useState({});
  const [visaHistory, setVisaHistory] = useState({});
  const [data, setData] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState("");
  const [selectedVisaStatus, setSelectedVisaStatus] = useState("");
  const [hasPaid, setHasPaid] = useState(false);
  const [hasCAS, setHasCAS] = useState(false);
  const [visaList, setVisaList] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [eligibilityCheck, setEligibilityCheck] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const decisionOptions = [
    { key: "0", text: "", value: "" },
    {
      key: "1",
      text: "Rejected",
      value: "4375e178-416c-46c7-b654-85039636b617",
      id: "4375e178-416c-46c7-b654-85039636b617",
    },
    {
      key: "2",
      text: "Unconditional Offer",
      value: "ead37f16-9474-4c55-ab96-c798341d60f4",
      id: "ead37f16-9474-4c55-ab96-c798341d60f4",
    },
    {
      key: "3",
      text: "Conditional Offer",
      value: "erd43f16-9474-4c55-ab96-c798341d60f4",
      id: "erd43f16-9474-4c55-ab96-c798341d60f4",
    },
    {
      key: "4",
      text: "Pending",
      value: "d3938e2d2327-9474-4c55-ab96-c798341d60f4",
      id: "d3938e2d2327-9474-4c55-ab96-c798341d60f4",
    },
  ];
  const onChangeCheckbox = (e, data) => {
    let checked = data.checked;
    let name = data.name;
    if (name == "hasCAS") {
      setHasCAS(checked);
    } else if (name == "hasPaid") {
      setHasPaid(checked);
    } else if (name == "eligibilityCheck") {
      setEligibilityCheck(checked);
    }
  };
  useEffect(() => {
    if (id) {
      POST_APPLICATION_ID(id).then((result) => {
        const res = result.data.data;

        loadRole();
        setData(res);
        setSelectedVisaStatus(res.visaApplyStatusId);
        setHasCAS(res.hasCAS);
        setHasPaid(res.hasPaid);
        setEligibilityCheck(res.eligibilityCheck);
        setSelectedDecision(res.decisionId);
        const userId = res.userId;
        loadProfile(userId);
        loadQualification(userId);
        loadPreviousQualification(userId);
        loadHighSchool(userId);
        loadEnglisTest(userId);
        loadSponsor(userId);
        loadVisaHistory(userId);
        loadDocuments(userId);
        loadVisaTypes();
        setHasData(true);
      });
    }
  }, [id]);
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    //const { activeIndex } = this.state;

    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);

    // this.setState({ activeIndex: newIndex });
  };
  const loadRole = async () => {
    const token = await getCookieAsync(TOKEN);
    if (!token) {
      router.push(SIGN_IN_URL);
    }
    const role = await getCookieAsync(ROLE);
    if (role == ADMIN_ROLE) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };
  const loadProfile = async (id) => {
    try {
      const result = await POST_USER_PROFILE({
        userId: id,
        isForAgent: true,
      });

      setProfile(result.data);
    } catch (err) {
      console.log(err);
    }

    // setApplications(result.data.data);
  };
  const loadQualification = async (id) => {
    try {
      const result = await POST_HIGHEST_QUALIFICATION({
        userId: id,
        isForAgent: true,
      });
      // console.log("Qualification");
      // console.log(result.data.data);
      setQualification(result.data.data);
    } catch (err) {
      console.log(err);
    }

    // setApplications(result.data.data);
  };
  const loadDocuments = async (id) => {
    try {
      const result = await POST_DOCUMENT({
        userId: id,
      });
      // console.log("Qualification");
      // console.log(result.data.data);
      setDocuments(result.data.data);
    } catch (err) {
      console.log(err);
    }

    // setApplications(result.data.data);
  };
  const loadEnglisTest = async (id) => {
    try {
      const result = await POST_ENGLISH_TEST({
        userId: id,
        isForAgent: true,
      });
      // console.log("eglish teset");
      // console.log(result.data.data);
      setEnglishTest(result.data.data);
    } catch (err) {
      console.log(err);
    }

    // setApplications(result.data.data);
  };
  const handleOptionChange = (_, arg) => {
    const value = arg.value;
    const name = arg.name;
    console.log(value);

    if (name == "selectedVisaStatus") {
      setSelectedVisaStatus(value);
    } else if (name == "selectedDecision") {
      console.log(value);
      setSelectedDecision(value);
    }
  };
  const loadPreviousQualification = async (id) => {
    try {
      const result = await POST_PREVIOUS_QUALIFICATION({
        userId: id,
        isForAgent: true,
      });
      // console.log("Previous Qualification");
      // console.log(result.data.data);
      setPreviousQualification(result.data.data);
      // setApplications(result.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadHighSchool = async (id) => {
    try {
      const result = await POST_HIGH_SCHOOL({
        userId: id,
        isForAgent: true,
      });
      // console.log("High School");
      // console.log(result.data.data);
      setHighSchool(result.data.data);
    } catch (err) {
      console.log(err);
    }

    // setApplications(result.data.data);
  };
  const loadSponsor = async (id) => {
    try {
      const result = await POST_SPONSOR({
        userId: id,
        isForAgent: true,
      });
      // console.log("Sponsor");
      // console.log(result.data.data);
      setSponsor(result.data.data);
    } catch (err) {
      console.log(err);
    }

    // setApplications(result.data.data);
  };

  const loadVisaHistory = async (id) => {
    try {
      const result = await POST_VISA_HISTORY({
        userId: id,
        isForAgent: true,
      });

      setVisaHistory(result?.data?.data);
    } catch (err) {
      console.log(err);
    }

    // setApplications(result.data.data);
  };
  async function loadVisaTypes() {
    const result = await POST_VISA_STATUS_LIST();
    const res = result.data.data;

    const visaListOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setVisaList(visaListOptions);
  }
  const handleSubmit = async () => {
    const data = {
      id,
      hasPaid,
      eligibilityCheck,
      hasCAS,
      hasDecided: selectedDecision,
      decisionId: selectedDecision,
      visaApplyStatusId: selectedVisaStatus,
    };
    const save = await POST_DECISION_UPDATE(data);
  };
  return (
    <>
      {hasData && (
        <AdminLayout>
          <h1>Application Details</h1>
          <div
            className="scrollable-div"
            style={{
              backgroundColor: "#E5E4E2",
              padding: 20,
              marginBottom: 100,
            }}
          >
            <Accordion fluid styled>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Application
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                {isAdmin && (
                  <Form onSubmit={handleSubmit}>
                    <Table celled>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>Course One</Table.Cell>
                          <Table.Cell>
                            <b>
                              {data.courseOne} | {data.institutionOne}
                            </b>
                          </Table.Cell>
                        </Table.Row>
                        {data.courseTwo && (
                          <Table.Row>
                            <Table.Cell>Course Two</Table.Cell>
                            <Table.Cell>
                              <b>
                                {data.courseTwo} | {data.institutionTwo}
                              </b>
                            </Table.Cell>
                          </Table.Row>
                        )}
                        <Table.Row>
                          <Table.Cell>Application Status</Table.Cell>

                          <Table.Cell>
                            <b>SUBMITTED</b>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Eligibility Check</Table.Cell>

                          <Table.Cell>
                            <b>{eligibilityCheck ? "Passed" : NO}</b>
                          </Table.Cell>
                          <Table.Cell>
                            <Checkbox
                              checked={eligibilityCheck}
                              name="eligibilityCheck"
                              onChange={onChangeCheckbox}
                              label={eligibilityCheck ? "Passed" : "Not Passed"}
                              toggle
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Decision</Table.Cell>

                          <Table.Cell>
                            <b>
                              {data.Decision?.name || (
                                <>
                                  Pending <Icon loading name="sync alternate" />
                                </>
                              )}
                            </b>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Field
                              defaultValue={selectedDecision}
                              control={Select}
                              options={decisionOptions}
                              name="selectedDecision"
                              onChange={handleOptionChange}
                              label={{
                                children: "Decision",
                                htmlFor: "form-select-control-year",
                              }}
                              placeholder={"Decision"}
                              search
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Has Issued CAS?</Table.Cell>

                          <Table.Cell>
                            <b>
                              {hasCAS
                                ? "CAS Issued"
                                : "CAS not Issued" || (
                                    <>
                                      Pending{" "}
                                      <Icon loading name="sync alternate" />
                                    </>
                                  )}
                            </b>
                          </Table.Cell>
                          <Table.Cell>
                            <Checkbox
                              checked={hasCAS}
                              name="hasCAS"
                              onChange={onChangeCheckbox}
                              label={hasCAS ? "Issued" : "Not Issued"}
                              toggle
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Has Paid Tuition?</Table.Cell>

                          <Table.Cell>
                            <b>
                              {hasPaid ? (
                                "Paid"
                              ) : (
                                <>
                                  Pending <Icon loading name="sync alternate" />
                                </>
                              )}
                            </b>
                          </Table.Cell>
                          <Table.Cell>
                            <Checkbox
                              checked={hasPaid}
                              name="hasPaid"
                              onChange={onChangeCheckbox}
                              label={hasPaid ? "Paid" : "Not Paid"}
                              toggle
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Visa Status</Table.Cell>

                          <Table.Cell>
                            <b>
                              {data?.VisaApplyStatus?.name || (
                                <>
                                  Pending <Icon loading name="sync alternate" />
                                </>
                              )}
                            </b>
                          </Table.Cell>
                          {visaList.length > 0 && (
                            <Table.Cell>
                              <Form.Field
                                defaultValue={selectedVisaStatus}
                                control={Select}
                                options={visaList}
                                name="selectedVisaStatus"
                                onChange={handleOptionChange}
                                label={{
                                  children: "Visa Status",
                                  htmlFor: "form-select-control-year",
                                }}
                                placeholder={"Visa Status"}
                                search
                              />
                            </Table.Cell>
                          )}
                        </Table.Row>
                      </Table.Body>
                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell colSpan="3">
                            <Button
                              type="submit"
                              primary
                              style={{ float: "right" }}
                            >
                              Update
                            </Button>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer>
                    </Table>
                  </Form>
                )}
                {!isAdmin && (
                  <Form onSubmit={handleSubmit}>
                    <Table celled>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>Course One</Table.Cell>
                          <Table.Cell>
                            <b>
                              {data.courseOne} | {data.institutionOne}
                            </b>
                          </Table.Cell>
                        </Table.Row>
                        {data.courseTwo && (
                          <Table.Row>
                            <Table.Cell>Course Two</Table.Cell>
                            <Table.Cell>
                              <b>
                                {data.courseTwo} | {data.institutionTwo}
                              </b>
                            </Table.Cell>
                          </Table.Row>
                        )}
                        <Table.Row>
                          <Table.Cell>Application Status</Table.Cell>

                          <Table.Cell>
                            <b>SUBMITTED</b>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Eligibility Check</Table.Cell>

                          <Table.Cell>
                            <b>{eligibilityCheck ? "Passed" : NO}</b>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Decision</Table.Cell>

                          <Table.Cell>
                            <b>
                              {data.Decision?.name || (
                                <>
                                  Pending <Icon loading name="sync alternate" />
                                </>
                              )}
                            </b>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Has Issued CAS?</Table.Cell>

                          <Table.Cell>
                            <b>
                              {hasCAS
                                ? "CAS Issued"
                                : "CAS not Issued" || (
                                    <>
                                      Pending{" "}
                                      <Icon loading name="sync alternate" />
                                    </>
                                  )}
                            </b>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Has Paid Tuition?</Table.Cell>

                          <Table.Cell>
                            <b>
                              {hasPaid ? (
                                "Paid"
                              ) : (
                                <>
                                  Pending <Icon loading name="sync alternate" />
                                </>
                              )}
                            </b>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>Visa Status</Table.Cell>

                          <Table.Cell>
                            <b>
                              {data?.VisaApplyStatus?.name || (
                                <>
                                  Pending <Icon loading name="sync alternate" />
                                </>
                              )}
                            </b>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Form>
                )}
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                User Profile
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <Table celled>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Username</Table.Cell>
                      <Table.Cell>
                        <b>{profile.username}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>First Name</Table.Cell>
                      <Table.Cell>
                        <b>{profile.firstname}</b>
                      </Table.Cell>
                    </Table.Row>
                    {profile.middlename && (
                      <Table.Row>
                        <Table.Cell>Middle Name</Table.Cell>
                        <Table.Cell>
                          <b>{profile.middlename}</b>
                        </Table.Cell>
                      </Table.Row>
                    )}
                    <Table.Row>
                      <Table.Cell>Last Name</Table.Cell>
                      <Table.Cell>
                        <b>{profile.lastname}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Email</Table.Cell>
                      <Table.Cell>
                        <b>{profile.email}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Phone</Table.Cell>
                      <Table.Cell>
                        <b>{profile.phone}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Gender</Table.Cell>
                      <Table.Cell>
                        <b>{profile.gender}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Marital</Table.Cell>
                      <Table.Cell>
                        <b>{profile.marital}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Country</Table.Cell>
                      <Table.Cell>
                        <b>{profile?.country?.name}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Home Address</Table.Cell>
                      <Table.Cell>
                        <b>{profile.homeAddress}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Postal Address</Table.Cell>
                      <Table.Cell>
                        <b>{profile.postalAddress}</b>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Highest Qualification
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                <Table celled>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Institution Name</Table.Cell>
                      <Table.Cell>
                        <b>{qualification.hq_schoolName} </b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Grade</Table.Cell>
                      <Table.Cell>
                        <b>{qualification.hq_grade}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Programme Year</Table.Cell>
                      <Table.Cell>
                        <b>{qualification.hq_programmeYear}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Has Completed</Table.Cell>
                      <Table.Cell>
                        <b>{qualification.hq_completed}</b>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 3}
                index={3}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Previous Qualification
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 3}>
                <Table celled>
                  {!previousQualification?.highSchoolName && (
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Institution Name</Table.Cell>
                        <Table.Cell>
                          <b>{previousQualification.pq_schoolName} </b>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  )}
                  {previousQualification?.highSchoolName && (
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Institution Name</Table.Cell>
                        <Table.Cell>
                          <b>{previousQualification.pq_schoolName} </b>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Grade</Table.Cell>
                        <Table.Cell>
                          <b>{previousQualification.pq_grade}</b>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Programme Year</Table.Cell>
                        <Table.Cell>
                          <b>{previousQualification.pq_programmeYear}</b>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Has Completed</Table.Cell>
                        <Table.Cell>
                          <b>{previousQualification.pq_completed}</b>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  )}
                </Table>
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 4}
                index={4}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                High School
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 4}>
                <Table celled>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>School Name</Table.Cell>
                      <Table.Cell>
                        <b>{highSchool.highSchoolName} </b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Year</Table.Cell>
                      <Table.Cell>
                        <b>{highSchool.completionYear}</b>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 5}
                index={5}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                English Test
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 5}>
                <Table celled>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Test Name</Table.Cell>
                      <Table.Cell>
                        <b>{englisTest.name} </b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Score</Table.Cell>
                      <Table.Cell>
                        <b>{englisTest.score}</b>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 6}
                index={6}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Sponsorship
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 6}>
                <Table celled>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Sponsor Name</Table.Cell>
                      <Table.Cell>
                        <b>{sponsor.name} </b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Relationship</Table.Cell>
                      <Table.Cell>
                        <b>{sponsor?.Relationship?.name}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Occupation</Table.Cell>
                      <Table.Cell>
                        <b>{sponsor.occupation}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Budget</Table.Cell>
                      <Table.Cell>
                        <b>{sponsor.budget}</b>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 7}
                index={7}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Visa History
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 7}>
                <Table celled>
                  {visaHistory?.hasApplied == NO && (
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Has Applied for Visa</Table.Cell>
                        <Table.Cell>
                          <b>{visaHistory?.hasApplied} </b>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  )}
                  {visaHistory?.hasApplied == YES && (
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Has Applied for Visa</Table.Cell>
                        <Table.Cell>
                          <b>{visaHistory?.hasApplied} </b>
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Purpose of Visa</Table.Cell>
                        <Table.Cell>
                          <b>{visaHistory?.purpose}</b>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Has Visa Been Refused?</Table.Cell>
                        <Table.Cell>
                          <b>{visaHistory.hasRefused}</b>
                        </Table.Cell>
                      </Table.Row>
                      {visaHistory.hasRefused == YES && (
                        <Table.Row>
                          <Table.Cell>Reason</Table.Cell>
                          <Table.Cell>
                            <b>{visaHistory.reason}</b>
                          </Table.Cell>
                        </Table.Row>
                      )}
                      <Table.Row>
                        <Table.Cell>More Information</Table.Cell>
                        <Table.Cell>
                          <b>{visaHistory.moreInfo}</b>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  )}
                  {!visaHistory && (
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Has Applied for Visa</Table.Cell>
                        <Table.Cell>
                          <b>No </b>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  )}
                </Table>
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 8}
                index={8}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                Documents
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 8}>
                <Table celled>
                  <Table.Body>
                    {documents.map((item) => {
                      return (
                        <Table.Row>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>
                            <b>
                              <a target="_blank" href={item.url}>
                                <Icon name="download" />
                              </a>
                            </b>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
                {documents.length == 0 && <Message>No documents </Message>}
              </Accordion.Content>
            </Accordion>
            <br />
            <br />
            <br />
            <br />
          </div>
        </AdminLayout>
      )}
    </>
  );
}

export default ApplicationDetailPage;
