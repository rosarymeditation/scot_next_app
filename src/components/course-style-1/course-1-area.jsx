import React from "react";
import { useState, useEffect, useRef } from "react";
import { course_data } from "../../data";
import SortingArea from "../course-filter/sorting-area";
import CourseTypeOne from "../course/course-type-one";
import axios from "axios";
import { NothingFound } from "../no-course-found";
import { Loader } from "../loader";
import {
  COURSE_DEGREE_ID,
  COURSE_FACULTY_ID,
  COURSE_INSTITUTION_ID,
  COURSE_OFFSET,
  COURSE_SEARCH,
  POST_COURSE_PARAM,
  POST_DEGREE_TYPES,
  POST_FACULTIES,
  POST_INSTITUTIONS,
  getCookieAsync,
  setCookieAsync,
} from "../../utils/global";

import { Button } from "semantic-ui-react";
import Cookies from "js-cookie";
const CourseArea = ({ institutionId, facultyId }) => {
  const divRef = useRef(null);
  const scrollToDiv = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    loadCookieValues();

    loadInstitutions();
    loadFaculties();
    loadDegreeTypes();
  }, []);
  const coursePerView = 9;
  const [next, setNext] = useState(coursePerView);
  const [courses, setCourses] = useState(course_data);
  const [institutions, setInstitutions] = useState([]);
  const [institutionOptions, setInstitutionOptions] = useState([]);
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [degreeTypeOptions, setDegreeTypeOptions] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [degreeTypes, setDegreeTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [degreeType, setDegreeType] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasLoadedFaculty, setHasLoadedFaculty] = useState(false);
  const [hasLoadedInstitution, setHasLoadedInstitution] = useState(false);
  const [hasLoadedDegreeType, setHasLoadedDegreeType] = useState(false);
  const [faculty, setFaculty] = useState(facultyId || "");

  const [institution, setInstitution] = useState(institutionId || "");
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [totalFetchedData, setTotalFetchedData] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  async function loadSearch(search, faculty, degreeType, institution, offset) {
    console.log(institution);
    console.log("institution");
    setHasLoaded(false);
    const result = await POST_COURSE_PARAM({
      institutionId: institution,
      offset: offset,
      facultyId: faculty,
      degreeTypeId: degreeType,
      search,
      limit: limit,
    });
    const res = result.data.data;

    setCourses(res);
    setHasLoaded(true);
  }
  async function loadCookieValues() {
    console.log();
    //This checks if facultyId and InstitutionId were called from homepage of Institution page as there id will not be empty
    const isIgnoreCookie = facultyId || institutionId;
    const _search = isIgnoreCookie
      ? ""
      : (await getCookieAsync(COURSE_SEARCH)) || "";

    let offset = isIgnoreCookie
      ? 0
      : (await getCookieAsync(COURSE_OFFSET)) || 0;
    offset = parseInt(offset);

    const _institutionId = isIgnoreCookie
      ? institutionId
      : (await getCookieAsync(COURSE_INSTITUTION_ID)) || "";
    setInstitution(_institutionId);
    const _facultyId = isIgnoreCookie
      ? facultyId
      : (await getCookieAsync(COURSE_FACULTY_ID)) || "";
    setFaculty(_facultyId);
    const _degreeTypeId = (await getCookieAsync(COURSE_DEGREE_ID)) || "";
    setDegreeType(_degreeTypeId);
    loadSearch(_search, _facultyId, _degreeTypeId, _institutionId, offset);
    setHasLoadedFaculty(true);
    setHasLoadedInstitution(true);
    setHasLoadedDegreeType(true);
    setOffset(offset);
    setSearch(_search);
  }
  async function loadFaculties() {
    const result = await POST_FACULTIES();
    const res = result.data.data;
    res.unshift({ id: "", name: "All" });
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
    res.unshift({ id: "", name: "All" });
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
    res.unshift({ id: "", name: "All" });
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

  const handleChange = async (e) => {
    const search = e.target.value;

    setSearch(search);
    await setCookieAsync(COURSE_SEARCH, search);
    const newOffset = 0;
    setOffset(newOffset);
    loadSearch(search, faculty, degreeType, institution, newOffset);
  };

  const handleNext = async () => {
    const currentPage = offset + coursePerView;
    setPage(currentPage);
    console.log(`page:${currentPage}`);
    setOffset(currentPage);
    console.log(currentPage);

    loadSearch(search, faculty, degreeType, institution, currentPage);
    await setCookieAsync(COURSE_OFFSET, currentPage);
    scrollToDiv();
  };

  const handlePrevious = async () => {
    if (offset <= 0) {
      setOffset(0);
      return;
    }
    if (offset > 1) {
      scrollToDiv();
      const currentPage = offset - coursePerView;
      //setPage(currentPage);

      loadSearch(search, faculty, degreeType, institution, currentPage);
      if (currentPage < 0) {
        currentPage = 0;
      }

      setOffset(currentPage);
      await setCookieAsync(COURSE_OFFSET, currentPage);
    }
  };

  const handleReset = () => {
    Cookies.remove(COURSE_DEGREE_ID);
    Cookies.remove(COURSE_FACULTY_ID);
    Cookies.remove(COURSE_INSTITUTION_ID);
    Cookies.remove(COURSE_SEARCH);
    Cookies.remove(COURSE_OFFSET);

    window.location.reload();
  };
  const handleOptionChange = async (_, event) => {
    const name = event.name;
    const value = event.value;

    const newOffset = 0;
    setOffset(newOffset);

    if (name == "faculty") {
      await setCookieAsync(COURSE_FACULTY_ID, value);
      loadSearch(search, value, degreeType, institution, newOffset);
      setFaculty(value);
    } else if (name == "institution") {
      await setCookieAsync(COURSE_INSTITUTION_ID, value);
      loadSearch(search, faculty, degreeType, value, newOffset);
      setInstitution(value);
    } else if (name == "degreeType") {
      await setCookieAsync(COURSE_DEGREE_ID, value);
      loadSearch(search, faculty, value, institution, newOffset);
      setDegreeType(value);
    }
    await setCookieAsync(COURSE_OFFSET, newOffset);
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
          hasLoadedDegreeType={hasLoadedDegreeType}
          hasLoadedFaculty={hasLoadedFaculty}
          hasLoadedInstitution={hasLoadedInstitution}
          facultyId={faculty}
          institutionId={institution}
          degreeTypeId={degreeType}
          handleReset={handleReset}
          search={search}
          hasLoaded={hasLoaded}
        />

        <div className="row g-5">
          {!hasLoaded && <Loader />}
          {hasLoaded && courses.length == 0 && (
            <NothingFound>
              <h4>No course found</h4>
            </NothingFound>
          )}
          {hasLoaded &&
            courses.slice(0, next)?.map((course) => {
              return (
                <div key={course.id} className="col-md-6 col-lg-4">
                  <CourseTypeOne data={course} classes="course-box-shadow" />
                </div>
              );
            })}
        </div>
        <br />
        <br />
        {hasLoaded && (
          <div>
            <Button
              onClick={handlePrevious}
              style={{
                float: "left",
              }}
              disabled={offset <= 0}
              type="button"
              primary
              class="btn btn-primary myBtn"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              style={{
                float: "right",
              }}
              disabled={courses < limit}
              type="button"
              primary
              class="btn btn-primary myBtn"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseArea;
