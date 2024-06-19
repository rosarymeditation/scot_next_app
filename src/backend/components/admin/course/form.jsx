import React from "react";
import styles from "../../../admin.module.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import AdminLayout from "../../../AdminLayout";
import {
  Button,
  Form,
  Select,
  TextArea,
  Table,
  Checkbox,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import { Loader } from "../../../../components/loader";
import {
  DEFAULT_COLOR,
  GET_COURSE,
  POST_COURSE_PARAM,
  POST_COURSE_SAVE,
  POST_COURSE_UPDATE,
  POST_DEGREE_TYPES,
  POST_FACULTIES,
  POST_INSTITUTIONS,
  REQUIRED_MSG,
  URL_COURSE_CREATE,
  URL_COURSE_LIST,
} from "../../../../utils/global";
import { VALIDATION_TITLE } from "../../../../layout/headers/menu-data";
import { setLocale } from "yup";
function FormPage({ courseId = "" }) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const [name, setName] = useState("");
  const [fee, setFee] = useState("");
  const [intake, setIntake] = useState("");
  const [duration, setDuration] = useState("");
  const [scholarshipAmount, setScholarshipAmount] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDegreeType, setSelectedDegreeType] = useState("");
  const [isPopular, setIsPopular] = useState("");
  let [degreeTypeOptions, setDegreeTypeOptions] = useState([]);
  let [facultyOptions, setFacultyOptions] = useState([]);
  let [institutionOptions, setInstitutionOptions] = useState([]);
  let [courses, setCourses] = useState([]);
  const offset = 0;
  const limit = 4;
  useEffect(() => {
    loadInstitutions();
    loadFaculties();
    loadDegreeTypes();
    if (courseId) {
      loadCourse();
    } else {
      setHasLoaded(true);
    }
  }, []);

  async function loadDegreeTypes() {
    const result = await POST_DEGREE_TYPES();
    const res = result.data.data;

    degreeTypeOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setDegreeTypeOptions(degreeTypeOptions);
  }
  async function loadFaculties() {
    const result = await POST_FACULTIES();
    const res = result.data.data;

    facultyOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setFacultyOptions(facultyOptions);
  }

  async function loadInstitutions() {
    const result = await POST_INSTITUTIONS();
    const res = result.data.data;

    institutionOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setInstitutionOptions(institutionOptions);
  }
  async function loadDegreeTypes() {
    const result = await POST_DEGREE_TYPES();
    const res = result.data.data;

    degreeTypeOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setDegreeTypeOptions(degreeTypeOptions);
  }
  async function loadCourses(search) {
    try {
      //setHasLoaded(false);
      const result = await POST_COURSE_PARAM({
        institutionId: selectedInstitution,
        offset: offset,
        facultyId: selectedFaculty,
        degreeTypeId: selectedDegreeType,
        search,
        limit: limit,
      });

      const res = result.data.data;

      if (res) {
        setCourses(res);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setHasLoaded(true);
    }
  }
  async function loadCourse() {
    const result = await GET_COURSE(courseId);
    const res = result.data.data;
    const {
      name,
      fee,
      scholarshipAmount,
      duration,
      intake,
      institutionId,
      facultyId,
      degreeTypeId,
      isPopular,
    } = res;
    setHasLoaded(true);
    if (res) {
      setName(name);
      setScholarshipAmount(scholarshipAmount);
      setDuration(duration);
      setIsPopular(isPopular);
      setIntake(intake);
      setFee(fee);
      setSelectedInstitution(institutionId);
      setSelectedFaculty(facultyId);
      setSelectedDegreeType(degreeTypeId);
    }
  }

  const handleOptionChange = (_, arg) => {
    const value = arg.value;
    const name = arg.name;
    if (name == "selectedInstitution") {
      setSelectedInstitution(value);
    } else if (name == "selectedFaculty") {
      setSelectedFaculty(value);
    } else if (name == "selectedDegreeType") {
      setSelectedDegreeType(value);
    }
  };
  const handleSearch = (arg) => {
    const value = arg.target.value;
   
    loadCourses(value);
  };
  const handlePrevious = () => {
    router.back();
  };
  const handleChange = (event, data) => {
    const value = data.value;
    const name = data.name;
    if (name == "name") {
      setName(value);
    } else if (name == "fee") {
      setFee(value);
    } else if (name == "intake") {
      setIntake(value);
    } else if (name == "duration") {
      setDuration(value);
    } else if (name == "scholarshipAmount") {
      setScholarshipAmount(value);
    }
  };
  const onChangeCheckbox = (e, data) => {
    let checked = data.checked;
    setIsPopular(checked);
  };

  const handleSubmit = async () => {
    if (selectedInstitution == "") {
      showAlert(VALIDATION_TITLE, REQUIRED_MSG("Institution"));
      return;
    }
    if (selectedFaculty == "") {
      showAlert(VALIDATION_TITLE, REQUIRED_MSG("Faculty"));
      return;
    }

    if (selectedDegreeType == "") {
      showAlert(VALIDATION_TITLE, REQUIRED_MSG("Degree Type"));
      return;
    }

    setHasSubmitted(false);
    const data = {
      name,
      fee,
      duration,
      intake,
      isPopular,
      institutionId: selectedInstitution,
      facultyId: selectedFaculty,
      degreeTypeId: selectedDegreeType,
      scholarshipAmount,
    };
    if (courseId) {
      data.id = courseId;
    }

    try {
      const result = courseId
        ? await POST_COURSE_UPDATE(data, courseId)
        : await POST_COURSE_SAVE(data);
      
      const res = result.data;
      if (res.error) {
        showAlert("Error", "Could not save ");
      } else {
        router.push(URL_COURSE_LIST);
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
            <h1>{courseId ? `Update ` : `Create `} Course</h1>
            <div
              className="scrollable-div"
              style={{
                backgroundColor: "#E5E4E2",
                padding: 20,
                marginBottom: 100,
              }}
            >
              {courses.length > 0 && (
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Institution</Table.HeaderCell>
                      <Table.HeaderCell>Faculty</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {courses.map((item) => {
                      return (
                        <Table.Row style={{ cursor: "pointer" }}>
                          <Table.Cell>
                            <b style={{ color: DEFAULT_COLOR }}>{item.name}</b>
                          </Table.Cell>
                          <Table.Cell>
                            <b style={{ color: DEFAULT_COLOR }}>
                              {item.Institution.name}
                            </b>
                          </Table.Cell>
                          <Table.Cell>
                            <b style={{ color: DEFAULT_COLOR }}>
                              {item.Faculty.name}
                            </b>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                  {hasLoaded && (
                    <Form.Field
                      defaultValue={selectedInstitution}
                      control={Select}
                      options={institutionOptions}
                      name="selectedInstitution"
                      onChange={handleOptionChange}
                      label={{
                        children: "Institution",
                        htmlFor: "form-select-control-city",
                      }}
                      placeholder="Institution"
                      search
                      searchInput={{ id: "form-select-control-city" }}
                    />
                  )}
                </Form.Group>
                <Form.Group widths="equal">
                  {hasLoaded && (
                    <Form.Field
                      defaultValue={selectedFaculty}
                      control={Select}
                      options={facultyOptions}
                      name="selectedFaculty"
                      onChange={handleOptionChange}
                      label={{
                        children: "Faculty",
                        htmlFor: "form-select-control-city",
                      }}
                      placeholder="Faculty"
                      search
                      searchInput={{ id: "form-select-control-city" }}
                    />
                  )}
                </Form.Group>
                <Form.Group widths="equal">
                  {hasLoaded && (
                    <Form.Field
                      defaultValue={selectedDegreeType}
                      control={Select}
                      options={degreeTypeOptions}
                      name="selectedDegreeType"
                      onChange={handleOptionChange}
                      label={{
                        children: "Degree Types",
                        htmlFor: "form-select-control-city",
                      }}
                      placeholder="CDegree Typesity"
                      search
                      searchInput={{ id: "form-select-control-city" }}
                    />
                  )}
                </Form.Group>
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  onKeyUp={handleSearch}
                  value={name}
                  onChange={handleChange}
                  name="name"
                  label="Name"
                  required
                  placeholder="Name"
                />
                <br />
                <br />
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  value={fee}
                  onChange={handleChange}
                  name="fee"
                  label="Fee"
                  required
                  placeholder="Fee"
                />
                <br />
                <br />
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  value={scholarshipAmount}
                  onChange={handleChange}
                  name="scholarshipAmount"
                  label="Scholarship Amount"
                  required
                  placeholder="Scholarship Amount"
                />
                <br />
                <br />
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  value={duration}
                  onChange={handleChange}
                  name="duration"
                  label="Duration"
                  required
                  placeholder="Duration"
                />
                <br />
                <br />
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  value={intake}
                  onChange={handleChange}
                  name="intake"
                  label="Intake"
                  required
                  placeholder="Intake"
                />
                <br />
                <br />
                <Checkbox
                  checked={isPopular}
                  name="isPopular"
                  onChange={onChangeCheckbox}
                  label={isPopular ? "Popular" : "Not Popular"}
                  toggle
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
                  {courseId ? `Update` : `Save`}
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
