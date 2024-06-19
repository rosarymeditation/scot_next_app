import React from "react";
import { Footer, Header } from "../../layout";
import CourseBreadcrumb from "../breadcrumb/breadcrumb-5";
import CourseDetailsArea from "./course-details-area";
import { Loader } from "../loader";

const index = ({ course, relatedCourses }) => {
  return (
    <div className="sticky-header">
      <div id="main-wrapper" className="main-wrapper">
        <Header no_top_bar={true} />
        {course?.id ? (
          <>
            <CourseBreadcrumb course={course} subtitle="Course Details" />
            <CourseDetailsArea
              course={course}
              relatedCourses={relatedCourses}
            />
          </>
        ) : (
          <Loader />
        )}

        <Footer style_2={"footer-dark bg-image footer-style-2"} />
      </div>
    </div>
  );
};

export default index;
