import React from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { course_data } from "../../data";
import Swal from "sweetalert";
import SortingArea from "../course-filter/compare-sorting-area";
import CourseTypeOne from "../course/course-type-one";
import axios from "axios";
import { NothingFound } from "../no-course-found";
import { Loader } from "../loader";
import { Table } from "semantic-ui-react";
import {
  GLOBAL_URL,
  POST_COMPARE_COURSES,
  POST_COURSE_PARAM,
  POST_DEGREE_TYPES,
  POST_FACULTIES,
  POST_INSTITUTIONS,
} from "../../utils/global";
import {
  DEGREE_TYPES,
  FACULTIES,
  INSTITUTIONS,
} from "../../layout/headers/menu-data";
import { offset } from "@popperjs/core";
import { RiEye2Fill } from "react-icons/ri";
const CompareArea = () => {
  const divRef = useRef(null);
  const scrollToDiv = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    loadSearch(search, faculty, degreeType, institutionId1, institutionId2);
    loadInstitutions();
    loadDegreeTypes();
    loadFaculties();
    // loadFaculties();
    // loadDegreeTypes();
  }, []);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, "error");
  };
  const coursePerView = 8;
  const [next, setNext] = useState(coursePerView);
  const [courses, setCourses] = useState(course_data);
  const [institutions, setInstitutions] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [degreeTypes, setDegreeTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [compareValue, setCompareValue] = useState("");
  const [degreeType, setDegreeType] = useState("");
  const [hasLoaded, setHasLoaded] = useState(true);
  const [faculty, setFaculty] = useState("");
  const [institution, setInstitution] = useState("");
  const [institutionId1, setInstitutionId1] = useState("");
  const [institutionId2, setInstitutionId2] = useState("");
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalFetchedData, setTotalFetchedData] = useState(0);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [institutionOptions, setInstitutionOptions] = useState([]);
  const [degreeTypeOptions, setDegreeTypeOptions] = useState([]);
  const [facultyOptions, setFacultyOptions] = useState([]);
  //InstitutionOptions
  async function loadSearch(
    search,
    faculty,
    degreeType,
    institutionId1,
    institutionId2
  ) {
    setHasLoaded(false);
    const result = await POST_COMPARE_COURSES({
      institutionId1: institutionId1,
      institutionId2: institutionId2,
      offset: 0,
      facultyId: faculty,
      degreeTypeId: degreeType,
      limit: limit,
      search,
    });
    const res = result.data.data;

    setCourses(res);
    setHasLoaded(true);
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

  const handleChange = (e) => {
    const search = e.target.value;
    setSearch(search);

    loadSearch(search, faculty, degreeType, institutionId1, institutionId2);
  };

  const handleCompareChange = (e, { value }) => {
    const search = e.target;
    setCompareValue(value);
    console.log(value);
  };

  const handleOptionChange = (_, event) => {
    const name = event.name;
    const value = event.value;

    if (name == "faculty") {
      setFaculty(value);
    } else if (name == "institution1") {
      setInstitutionId1(value);
    } else if (name == "institution2") {
      setInstitutionId2(value);
    } else if (name == "degreeType") {
      setDegreeType(value);
    }
  };
  const handleSearchBtn = () => {
    if (institutionId1 === institutionId2) {
      showAlert(
        "Invalid Compare",
        "Please kindly compare different institutions"
      );
      return;
    }
    loadSearch(search, faculty, degreeType, institutionId1, institutionId2);
    scrollToDiv();
  };
  return (
    <div className="edu-course-area course-area-1 gap-tb-text">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css"
        integrity="sha512-KXol4x3sVoO+8ZsWPFI/r5KBVB/ssCGB5tsv2nVOKwLg33wTFP3fmnXa47FdSVIshVTgsYk/1734xSk9aFIa4A=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />

      <div ref={divRef} className="container">
        <SortingArea
          course_items={course_data}
          num={courses?.slice(0, next)?.length}
          setCourses={setCourses}
          courses={courses}
          handleChange={handleChange}
          institutions={institutionOptions}
          defaultInstitution={institution}
          defaultFaculty={faculty}
          faculties={facultyOptions}
          degreeTypes={degreeTypeOptions}
          handleOptionChange={handleOptionChange}
          handleSearchBtn={handleSearchBtn}
          handleCompareChange={handleCompareChange}
        />

        <div className="row g-5">
          {!hasLoaded && <Loader />}
          {hasLoaded && courses.length == 0 && (
            <NothingFound>
              <h4>
                No comparison found, two institutions must have something in
                common
              </h4>
            </NothingFound>
          )}
          <br />
          <br />
          {hasLoaded && courses.length > 0 && (
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <Table ref={divRef} celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Course</Table.HeaderCell>
                    <Table.HeaderCell>University</Table.HeaderCell>
                    <Table.HeaderCell>Degree</Table.HeaderCell>
                    <Table.HeaderCell>Tuition Fee</Table.HeaderCell>
                    <Table.HeaderCell>Scholarship</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {courses.slice(0, next)?.map((item) => {
                    return (
                      <>
                        {item.isFirst && (
                          <Table.Row>
                            <Table.Cell positive>
                              <Link href={`/course-details/${item.slug}`}>
                                {item.name}
                              </Link>
                              {compareValue == "Courses" && (
                                <i class="large green check circle icon"></i>
                              )}
                            </Table.Cell>

                            <Table.Cell positive>
                              <a href={`/course-details/${item.slug}`}>
                                {item.uni}
                              </a>
                            </Table.Cell>
                            <Table.Cell positive>
                              <a href={`/course-details/${item.slug}`}>
                                {item.degree}
                              </a>
                            </Table.Cell>
                            <Table.Cell positive>
                              <a href={`/course-details/${item.slug}`}>
                                {item.fee}
                              </a>
                              {compareValue == "Tuition Fees" && (
                                <i class="large green check circle icon"></i>
                              )}
                            </Table.Cell>
                            <Table.Cell positive>
                              <a href={`/course-details/${item.slug}`}>
                                {" "}
                                {item.scholarshipAmount}
                              </a>
                              {compareValue == "Scholarship Amount" && (
                                <i class="large green check circle icon"></i>
                              )}
                            </Table.Cell>
                          </Table.Row>
                        )}
                        {!item.isFirst && (
                          <Table.Row>
                            <Table.Cell warning>
                              <a href={`/course-details/${item.slug}`}>
                                {item.name}
                              </a>
                              {compareValue == "Courses" && (
                                <i class="large blue check circle icon"></i>
                              )}
                            </Table.Cell>

                            <Table.Cell warning>
                              <a href={`/course-details/${item.slug}`}>
                                {item.uni}
                              </a>
                            </Table.Cell>
                            <Table.Cell warning>{item.degree}</Table.Cell>
                            <Table.Cell warning>
                              <a href={`/course-details/${item.slug}`}>
                                {item.fee}
                              </a>
                              {compareValue == "Tuition Fees" && (
                                <i class="large blue check circle icon"></i>
                              )}
                            </Table.Cell>
                            <Table.Cell warning>
                              <a href={`/course-details/${item.slug}`}>
                                {item.scholarshipAmount}{" "}
                                {item.scholarshipAmount}
                              </a>
                              {compareValue == "Scholarship Amount" && (
                                <i class="large blue check circle icon"></i>
                              )}
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default CompareArea;
