import React from "react";
import useModal from "../../../hooks/use-modal";
import { Books } from "../../../svg";
import { useRouter } from "next/router";
import VideoModal from "../popup-modal/video-modal";
import { COURSE_ONE, setCookieAsync } from "../../../utils/global";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const CourseDetailsSidebar = ({ course, details_2 = false }) => {
  useEffect(() => {
    console.log(course);
  }, []);
  const router = useRouter();
  const selectCourse = async (course) => {
    Cookies.set(
      COURSE_ONE,
      JSON.stringify({
        name: course.name,
        institution: course.Institution.name,
      })
    );
    // setCookieAsync
    // await setCookieAsync(COURSE_ONE, JSON.stringify(course));
    router.push("/user/dashboard");
  };
  const { videoId } = course || {};
  const { isVideoOpen, setIsVideoOpen } = useModal();
  return (
    <>
      <div
        className={`course-sidebar-3 ${
          details_2 ? "" : "sidebar-top-position"
        }`}
      >
        <div className="edu-course-widget widget-course-summery">
          <div className="inner">
            <div className="thumbnail hide-mobile">
              <img src={`/assets/images/video-img.jpg`} alt="Course Thumb" />
              <a
                onClick={() => setIsVideoOpen(true)}
                style={{ cursor: "pointer" }}
                className="play-btn video-popup-activation"
              >
                <i className="icon-18"></i>
              </a>
            </div>
            <div className="content">
              <h4 className="widget-title">Course Details:</h4>
              <ul className="course-item">
                <li>
                  <span className="label">
                    <i className="icon-60"></i>Price:
                  </span>
                  <span className="value price">{course.fee}</span>
                </li>
                <li>
                  <span className="label">
                    <i className="icon-21"></i>Scholarship:
                  </span>
                  <span className="value">{course.scholarshipAmount}</span>
                </li>
                <li>
                  <span className="label">
                    <i className="icon-49"></i>Deposit:
                  </span>
                  <span className="value">{course?.Institution?.deposit}</span>
                </li>
                <li>
                  <span className="label">
                    <i className="icon-27"></i>Intake:
                  </span>
                  <span className="value">{course.intake}</span>
                </li>

                <li>
                  <span className="label">
                    <i className="icon-61"></i>Duration:
                  </span>
                  <span className="value">{course.duration}</span>
                </li>

                <li>
                  <span className="label">
                    <i className="icon-34"></i>Degree:
                  </span>
                  <span className="value">
                    {course?.DegreeType?.name || course.degreeType}
                  </span>
                </li>

                <li>
                  <span className="label">
                    <i className="icon-59"></i>Language:
                  </span>
                  <span className="value">English</span>
                </li>
              </ul>

              <div className="read-more-btn">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => selectCourse(course)}
                  className="edu-btn"
                >
                  Apply Now <i className="icon-4"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* video modal start */}
      <VideoModal
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={videoId}
      />
      {/* video modal end */}
    </>
  );
};

export default CourseDetailsSidebar;
