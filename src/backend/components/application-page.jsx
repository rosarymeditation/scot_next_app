import React from "react";
import styles from "../admin.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert";
import { useFormik } from "formik";
import { userSchema } from "../../utils/validation-schema";
import Cookies from "js-cookie";
import AdminLayout from "../AdminLayout";
import ErrorMsg from "../../components/forms/error-msg";
import {
  Button,
  Checkbox,
  Form,
  Segment,
  Message,
  Select,
  Table,
  Label,
  Icon,
} from "semantic-ui-react";
import {
  DEGREE_TYPES,
  ERROR_TITLE,
  FACULTIES,
  GET_QUALIFICATION_YEAR,
  INSTITUTIONS,
} from "../../layout/headers/menu-data";
import {
  COURSE_ONE,
  COURSE_TWO,
  DEFAULT_COLOR,
  POST_APPLICATION_SAVE,
  POST_COURSE_PARAM,
  REQUIRED_MSG,
  getCookieAsync,
  setCookieAsync,
} from "../../utils/global";
import { NothingFound } from "../../components/no-course-found";
function ApplicationPage({ agentUserId = "" }) {
  const router = useRouter();
  const myDivRef = useRef(null);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [name, setName] = useState("");
  const [userData, setUserData] = useState({});
  const [selectedProgramYear, setSelectedProgramYear] = useState("");
  const [page, setPage] = useState(0);
  const [faculty, setFaculty] = useState("");
  const [institution, setInstitution] = useState("");
  const [degreeType, setDegreeType] = useState("");
  const [search, setSearch] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDegreeType, setSelectedDegree] = useState("");
  const [courses, setCourses] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [degreeTypes, setDegreeTypes] = useState([]);
  const [courseOne, setCourseOne] = useState({});
  const [courseTwo, setCourseTwo] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(true);

  useEffect(() => {
    loadInit(institution, page, faculty, degreeType, search);
    loadDegreeTypes();
    loadFaculties();
    loadInstitutions();
  }, []);
  async function loadInstitutions() {
    const res = [...INSTITUTIONS];

    const institutionOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setInstitutions(institutionOptions);
  }
  async function loadFaculties() {
    const courseOne = await getCookieAsync(COURSE_ONE);
    const courseTwo = await getCookieAsync(COURSE_TWO);
   
    if (courseOne) {
      setCourseOne(JSON.parse(courseOne));
    }
    if (courseTwo) {
      setCourseTwo(JSON.parse(courseTwo));
    }

    const res = [...FACULTIES];

    const facultyOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setFaculties(facultyOptions);
  }

  async function loadDegreeTypes() {
    const res = [...DEGREE_TYPES];

    const degreeTypesOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setDegreeTypes(degreeTypesOptions);
  }
  async function loadInit(institution, page, faculty, degreeType, search) {
    try {
      const result = await POST_COURSE_PARAM({
        institutionId: institution,
        offset: page,
        facultyId: faculty,
        degreeTypeId: degreeType,
        limit: 10,
        search: search,
      });

      const res = result.data.data;
      setCourses(result.data.data);
      setUserData(res);
      if (res) {
        // setId(res.id);
        // setName(res.highSchoolName);
        // setSelectedProgramYear(res.completionYear);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setHasLoaded(true);
    }
  }

  const handleOptionChange = (_, arg) => {
    const value = arg.value;
    const name = arg.name;
    if (name == "selectedInstitution") {
      loadInit(value, page, faculty, degreeType, search);
      setInstitution(value);
    } else if (name == "selectedFaculty") {
      loadInit(institution, page, value, degreeType, search);
      setSelectedFaculty(value);
    } else if (name == "selectedDegreeType") {
      setSelectedDegree(value);
      loadInit(institution, page, faculty, value, search);
    }
  };

  const handleChange = (event, data) => {
    const name = data.name;
    const value = data.value;

    if (name == "search") {
      setSearch(value);
      loadInit(institution, page, faculty, degreeType, value);
    }
  };
  const handleSubmit = async () => {
    try {
      setHasSubmitted(false);
      if (!courseOne?.name) {
        showAlert(
          ERROR_TITLE,
          REQUIRED_MSG("Please select at least first course of choice")
        );
        return;
      }

      const data = {
        courseOne: courseOne?.name || "",
        courseTwo: courseTwo?.name || "",
        institutionOne: courseOne?.institution || "",
        institutionTwo: courseTwo?.institution || "",
      };

      if (agentUserId) {
        data.userId = agentUserId;
        data.isForAgent = true;
      }

      const result = await POST_APPLICATION_SAVE(data);
      Cookies.remove(COURSE_ONE);
      Cookies.remove(COURSE_TWO);
      setCourseOne({});
      setCourseTwo({});
      router.push("/user/dashboard");
      
    } catch (err) {
      console.log(err);
    } finally {
      setHasSubmitted(true);
    }
  };
  const scrollToTop = () => {
    myDivRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const selectCourse = async (course, courseType) => {
    if (courseType == COURSE_ONE) {
      setCourseOne({
        name: course.name,
        institution: course.Institution.name,
      });
      await setCookieAsync(
        COURSE_ONE,
        JSON.stringify({
          name: course.name,
          institution: course.Institution.name,
        })
      );
    } else {
      setCourseTwo({
        name: course.name,
        institution: course.Institution.name,
      });
      await setCookieAsync(
        COURSE_TWO,
        JSON.stringify({
          name: course.name,
          institution: course.Institution.name,
        })
      );
    }
    scrollToTop();
  };
  const deselectCourse = (courseType) => {
    if (courseType == COURSE_ONE) {
      setCourseOne({});
      setCourseTwo({});
      Cookies.remove(COURSE_ONE);
      Cookies.remove(COURSE_TWO);
    } else {
      setCourseTwo({});
      Cookies.remove(COURSE_TWO);
    }
  };
  return (
    <>
      {hasLoaded && (
        <AdminLayout>
          <p style={{ paddingLeft: 40 }}>
            <h1>Application</h1>
          </p>

          <div
            ref={myDivRef}
            className="scrollable-div"
            style={{
              backgroundColor: "#E5E4E2",
              padding: 20,
              marginBottom: 100,
            }}
          >
            <Message
              attached
              header="Application"
              content="Fill out the form below"
            />
            {/* className="attached fluid segment" */}

            <Form className="attached fluid segment" onSubmit={handleSubmit}>
              {!courseOne?.name && (
                <Message size="mini" icon>
                  <Icon name="frown" />
                  <Message.Content>
                    <h4> No course has been selected yet.</h4>
                  </Message.Content>
                </Message>
                // <Message floating content="No course has been selected yet.">
                //   {" "}
                //   <Icon style={{ color: "red" }} name="frown" />
                // </Message>
              )}
              {courseOne?.name && (
                <Table celled>
                  <Table.Body>
                    <Table.Row positive>
                      <Table.Cell>
                        <h5>First course of choice</h5>
                      </Table.Cell>
                      <Table.Cell>
                        <h5>
                          {" "}
                          <Icon style={{ color: "green" }} name="checkmark" />
                          {courseOne?.name} |{" "}
                          <span style={{ color: DEFAULT_COLOR }}>
                            {courseOne.institution}
                          </span>
                        </h5>
                      </Table.Cell>
                      <Table.Cell>
                        <h5
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => deselectCourse(COURSE_ONE)}
                        >
                          {" "}
                          Cancel
                          <Icon name="close" />
                        </h5>
                      </Table.Cell>
                    </Table.Row>
                    {courseTwo?.name && (
                      <Table.Row positive>
                        <Table.Cell>
                          <h5>Second course of choice</h5>
                        </Table.Cell>
                        <Table.Cell>
                          <h5>
                            <Icon style={{ color: "green" }} name="checkmark" />
                            {courseTwo?.name} |{" "}
                            <span style={{ color: DEFAULT_COLOR }}>
                              {courseTwo.institution}
                            </span>
                          </h5>
                        </Table.Cell>
                        <Table.Cell>
                          <h5
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => deselectCourse(COURSE_TWO)}
                          >
                            Cancel <Icon name="close" />
                          </h5>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              )}
              <Form.Group widths="equal">
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  onChange={handleChange}
                  label="Search course"
                  name="search"
                  placeholder="Search course"
                />
                {hasLoaded && (
                  <Form.Field
                    defaultValue={""}
                    control={Select}
                    options={institutions}
                    name="selectedInstitution"
                    onChange={handleOptionChange}
                    label={{
                      children: "Institution",
                      htmlFor: "form-select-control-qualificationType",
                    }}
                    placeholder="Institution"
                    search
                    searchInput={{
                      id: "form-select-control-qualificationType",
                    }}
                  />
                )}
                {hasLoaded && (
                  <Form.Field
                    defaultValue={""}
                    control={Select}
                    options={faculties}
                    name="selectedFaculty"
                    onChange={handleOptionChange}
                    label={{
                      children: "Faculty",
                      htmlFor: "form-select-control-qualificationType",
                    }}
                    placeholder="Faculty"
                    search
                    searchInput={{
                      id: "form-select-control-qualificationType",
                    }}
                  />
                )}
                {hasLoaded && (
                  <Form.Field
                    defaultValue={""}
                    control={Select}
                    options={degreeTypes}
                    name="selectedDegreeType"
                    onChange={handleOptionChange}
                    label={{
                      children: "Degree ",
                      htmlFor: "form-select-control-qualificationType",
                    }}
                    placeholder="Degree"
                    search
                    searchInput={{
                      id: "form-select-control-qualificationType",
                    }}
                  />
                )}
              </Form.Group>
              <br />
              <hr />
              {courses.length == 0 && (
                <Message>
                  <p style={{ textAlign: "center" }}>
                    <Icon name="redo" /> No result was found
                  </p>
                </Message>
              )}
              {courses.length > 0 && (
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Institution</Table.HeaderCell>
                      {/* <Table.HeaderCell>Faculty</Table.HeaderCell> */}
                      <Table.HeaderCell>Fee</Table.HeaderCell>
                      <Table.HeaderCell>Scholarship</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  {hasLoaded && courses.length > 0 && (
                    <Table.Body>
                      {courses.map((item) => (
                        <Table.Row key={item.id}>
                          <Table.Cell>
                            {item.name || "No Name Specified"}
                          </Table.Cell>
                          <Table.Cell>
                            {item.Institution?.name || "Unknown"}
                          </Table.Cell>
                          {/* <Table.Cell>
                          {item.Faculty?.name || "Unknown"}
                        </Table.Cell> */}
                          <Table.Cell>
                            <b style={{ color: "red" }}>{item.fee || "None"}</b>
                          </Table.Cell>
                          <Table.Cell>
                            <b style={{ color: "green" }}>
                              {item.scholarshipAmount || "None"}
                            </b>
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              onClick={() => selectCourse(item, COURSE_ONE)}
                              type="button"
                              size="mini"
                              primary
                            >
                              Select Course One
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            {courseOne.name && (
                              <Button
                                onClick={() => selectCourse(item, COURSE_TWO)}
                                type="button"
                                size="mini"
                                primary
                              >
                                Select Course Two
                              </Button>
                            )}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  )}
                </Table>
              )}
              <br />
              <br />

              <Button
                style={{ float: "right" }}
                loading={!hasSubmitted}
                disabled={!hasSubmitted}
                type="submit"
                color="green"
              >
                Submit Application
              </Button>
              <br />
              <br />
              <br />
            </Form>
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

export default ApplicationPage;
