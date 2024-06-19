import React from "react";
import styles from "../../../admin.module.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import AdminLayout from "../../../AdminLayout";
import Link from "next/link";

import {
  Button,
  Checkbox,
  Icon,
  Form,
  Message,
  Segment,
  Select,
  Table,
} from "semantic-ui-react";
import {
  DEFAULT_COLOR,
  DELETE_COURSE,
  DELETE_INSTITUTION,
  POST_COURSE_PARAM,
  POST_COURSE_UPDATE,
  POST_DEGREE_TYPES,
  POST_FACULTIES,
  URL_COURSE_CREATE,
} from "../../../../utils/global";
import { useRouter } from "next/router";
import { POST_INSTITUTIONS } from "../../../../utils/global";
import { Loader } from "../../../../components/loader";
import { NothingFound } from "../../../../components/no-course-found";
function ListPage() {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [courses, setCourses] = useState([]);
  const [institutionId, setInstitutionId] = useState("");
  const [offset, setOffset] = useState(0);
  const [facultyId, setfacultyId] = useState("");
  const [degreeTypeId, setDegreeTypeId] = useState("");
  const [search, setSearch] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedDegreeType, setSelectedDegreeType] = useState("");
  const [institutionOptions, setInstitutionOptions] = useState([]);
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [degreeTypeOptions, setDegreeTypeOptions] = useState([]);
  const [loadingPrev, setLoadingPrev] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);

  const limit = 10;

  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasLoadedContainer, setHasLoadedContainer] = useState(false);

  useEffect(() => {
    loadInit(institutionId, offset, facultyId, degreeTypeId, search);
    loadDegreeTypes();
    loadFaculties();
    loadInstitution();
    setHasLoadedContainer(true);
  }, []);

  async function loadInit(institution, offset, faculty, degreeType, search) {
    try {
      setHasLoaded(false);
      const result = await POST_COURSE_PARAM({
        institutionId: institution,
        offset,
        facultyId: faculty,
        degreeTypeId: degreeType,
        search,
        limit,
      });

      const res = result.data.data;

      if (res) {
        setCourses(res);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setHasLoaded(true);
    }
  }
  const handleSearch = (evt) => {
    const value = evt.target.value;
    setSearch(value);
    setOffset(0);
    loadInit(institutionId, 0, facultyId, degreeTypeId, value);
  };
  async function loadInstitution() {
    const result = await POST_INSTITUTIONS();
    const res = result.data.data;

    const institutionOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setInstitutionOptions(institutionOptions);
  }
  async function loadFaculties() {
    const result = await POST_FACULTIES();
    const res = result.data.data;

    const facultyOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setFacultyOptions(facultyOptions);
  }
  const handleOptionChange = (_, arg) => {
    const value = arg.value;
    const name = arg.name;
    if (name == "selectedInstitution") {
      setSelectedInstitution(value);
      setOffset(0);
      loadInit(value, 0, facultyId, degreeTypeId, search);
    } else if (name == "selectedFaculty") {
      setSelectedFaculty(value);
      setOffset(0);
      loadInit(institutionId, 0, value, degreeTypeId, search);
    } else if (name == "selectedDegreeType") {
      setSelectedDegreeType(value);
      setOffset(0);
      loadInit(institutionId, 0, facultyId, value, search);
    }
  };
  async function loadDegreeTypes() {
    const result = await POST_DEGREE_TYPES();
    const res = result.data.data;

    const degreeTypeOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setDegreeTypeOptions(degreeTypeOptions);
  }
  const handleDelete = (item) => {
    swal({
      title: `Are you sure you want to delete ${item.name}?`,
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      // buttons: true,
      buttons: ["No", "Yes"],

      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await DELETE_COURSE(item.id);
        swal("Course has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Your course is intact!");
      }
    });
  };
  const handleNext = () => {
    const newOffset = offset + limit;

    setOffset(newOffset);

    loadInit(
      selectedInstitution,
      newOffset,
      selectedFaculty,
      selectedDegreeType,
      search
    );
  };
  const handlePrevious = () => {
    setLoadingPrev(true);
    if (offset <= 0) {
      setOffset(0);
      return;
    }
    const newOffset = offset - limit;
    setOffset(newOffset);
    loadInit(
      selectedInstitution,
      newOffset,
      selectedFaculty,
      selectedDegreeType,
      search
    );
    setLoadingPrev(false);
  };
  const handleInputChangeFee = async (index, event) => {
    const newInputValues = [...courses];
    newInputValues[index].fee = event.target.value;
    const data = newInputValues[index];

    setCourses(newInputValues);
    await POST_COURSE_UPDATE(data, data.id);
  };
  const handleInputChangeScholarship = async (index, event) => {
    const newInputValues = [...courses];
    newInputValues[index].scholarshipAmount = event.target.value;
    const data = newInputValues[index];

    setCourses(newInputValues);
    await POST_COURSE_UPDATE(data, data.id);
  };
  return (
    <>
      <AdminLayout>
        {hasLoadedContainer && (
          <>
            <h1>Courses</h1>
            <div
              className="scrollable-div"
              style={{
                backgroundColor: "#E5E4E2",
                padding: 20,
                marginBottom: 100,
              }}
            >
              <Button href={URL_COURSE_CREATE} as="a" primary>
                Create{" "}
              </Button>
              <>
                <Message>
                  <Form>
                    <Form.Group widths="equal">
                      <Form.Field>
                        <label>Search</label>
                        <input
                          onKeyUp={handleSearch}
                          style={{ height: 40 }}
                          placeholder="Search course"
                        />
                      </Form.Field>
                      {/* <Form.Field
                        style={{ height: 40 }}
                        onKeyUp={handleSearch}
                        label={{
                          children: "Search",
                          htmlFor: "form-select-control-search",
                        }}
                      /> */}

                      <Form.Field
                        control={Select}
                        options={institutionOptions}
                        name="selectedInstitution"
                        onChange={handleOptionChange}
                        label={{
                          children: "Institution",
                          htmlFor: "form-select-control-institution",
                        }}
                        placeholder="Institution"
                        search
                        searchInput={{
                          id: "form-select-control-institution",
                        }}
                      />
                      <Form.Field
                        control={Select}
                        options={facultyOptions}
                        name="selectedFaculty"
                        onChange={handleOptionChange}
                        label={{
                          children: "Faculty",
                          htmlFor: "form-select-control-faculty",
                        }}
                        placeholder="Faculty"
                        search
                        searchInput={{ id: "form-select-control-faculty" }}
                      />
                      <Form.Field
                        control={Select}
                        options={degreeTypeOptions}
                        name="selectedDegreeType"
                        onChange={handleOptionChange}
                        label={{
                          children: "DegreeType",
                          htmlFor: "form-select-control-faculty",
                        }}
                        placeholder="Degree Type"
                        search
                        searchInput={{ id: "form-select-control-faculty" }}
                      />
                    </Form.Group>
                  </Form>
                </Message>
                {courses.length == 0 && (
                  <NothingFound>
                    <p>Nothing found</p>
                  </NothingFound>
                )}
                {!hasLoaded && <Loader />}
                {courses.length > 0 && hasLoaded && (
                  <>
                    {" "}
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Name</Table.HeaderCell>
                          <Table.HeaderCell>Institution</Table.HeaderCell>
                          <Table.HeaderCell>Faculty</Table.HeaderCell>
                          <Table.HeaderCell>Fee</Table.HeaderCell>
                          <Table.HeaderCell>Scholarship</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {courses.map((item, index) => {
                          return (
                            <Table.Row style={{ cursor: "pointer" }}>
                              <Table.Cell>
                                <b style={{ color: DEFAULT_COLOR }}>
                                  {item.name}
                                </b>
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
                              <Table.Cell>
                                <input
                                  style={{
                                    border: "2px solid #ccc", // border style
                                    borderRadius: "5px", // border radius
                                    padding: "10px", // padding
                                    color: "#333", // text color
                                    fontSize: "16px", // font size
                                  }}
                                  key={index}
                                  type="text"
                                  value={item.fee}
                                  onChange={(event) =>
                                    handleInputChangeFee(index, event)
                                  }
                                />
                              </Table.Cell>
                              <Table.Cell>
                                <input
                                  style={{
                                    border: "2px solid #ccc", // border style
                                    borderRadius: "5px", // border radius
                                    padding: "10px", // padding
                                    color: "#333", // text color
                                    fontSize: "16px", // font size
                                  }}
                                  key={index}
                                  type="text"
                                  value={item.scholarshipAmount}
                                  onChange={(event) =>
                                    handleInputChangeScholarship(index, event)
                                  }
                                />
                              </Table.Cell>
                              <Table.Cell>
                                <Button
                                  size="mini"
                                  color="green"
                                  href={`/admin/course/update/${item.id}`}
                                  as="a"
                                >
                                  <Icon name="edit" />
                                </Button>
                              </Table.Cell>
                              <Table.Cell>
                                <Button
                                  onClick={() => {
                                    handleDelete(item);
                                  }}
                                  type="button"
                                  size="mini"
                                  color="red"
                                >
                                  <Icon name="trash" />
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                    <Message floating>
                      <Button
                        onClick={handlePrevious}
                        disabled={offset == 0}
                        type="button"
                        color="blue"
                        loading={loadingPrev}
                      >
                        Back
                      </Button>
                      <Button
                        disabled={courses.length < limit}
                        onClick={handleNext}
                        style={{ float: "right" }}
                        type="button"
                        color="blue"
                        loading={loadingNext}
                      >
                        Next
                      </Button>
                    </Message>
                  </>
                )}
              </>

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

export default ListPage;
