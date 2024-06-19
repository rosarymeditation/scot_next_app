import React from "react";
import CourseDetailsSidebar from "../common/sidebar/course-details-sidebar";
import CommentFormCourse from "../forms/comment-form-course";
import SingleComment from "./single-comment";
import SingleProgressbar from "../course-details/single-progressbar";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

import {
  RELATED_COURSES,
  default_course_img,
} from "../../layout/headers/menu-data";
import {
  COURSE_ONE,
  GLOBAL_URL,
  POST_RELATED_COURSES,
  setCookieAsync,
} from "../../utils/global";
const CourseDetailsArea = ({ course, relatedCourses }) => {
  return (
    <section className="edu-section-gap course-details-area">
      <div className="container">
        <div className="row row--30">
          <div className="col-lg-8">
            <div className="course-details-content course-details-2">
              <img
                style={{ width: "100%", height: 400, objectFit: "cover" }}
                src={course.url || default_course_img}
              />
              <br />
              <br />
              {course?.degreeTypeId ==
                "1aad6011-8464-4c38-a84e-36442d64911c" && (
                <div className="course-overview">
                  <h3 className="heading-title">Course Description</h3>
                  <p>
                    Undergraduate is a post-secondary school education. An
                    undergraduate degree is a bachelor's or associate's degree.
                    Undergraduate degrees are offered at institutions of higher
                    learning and fall below the level of a master's degree. If
                    you are looking to pursue an undergraduate degree, read on
                    to find out more about the differences between associate's
                    and bachelor's degrees and the type of educational
                    requirements you can expect. Requirements for admission into
                    1st year of university degree and advanced entry (top-up)
                  </p>

                  {/* <p>{course_desc}</p>
                  <p>{course_desc_2}</p> */}
                  <div className="border-box">
                    <h5 className="title">Admission Requirements</h5>
                    <div className="row g-5">
                      <div className="col-lg-12">
                        <ul>
                          <li>Completed application form</li>
                          <li>Copy of passport data page</li>
                          <li>
                            High school/diploma/advance diploma
                            certificates/statement of results
                          </li>
                          <li>2 academic references</li>
                          <li>CV</li>
                          <li>
                            Any other relevant academic/vocational
                            qualifications (if any)
                          </li>
                          <li>
                            Write a personal statement detailing your reasons
                            for choosing the proposed course and benefits to be
                            gained on completion.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-4 show-small">
              <CourseDetailsSidebar course={course} details_2={true} />
            </div>
            <div className="course-details-content course-details-2">
              {course?.degreeTypeId ==
                "ead37f16-9474-4c55-ab96-c798341d60f4" && (
                <div className="course-overview">
                  <h3 className="heading-title">Course Description</h3>
                  <p>
                    Generally, a postgraduate degree is a degree which you study
                    for once you have finished a bachelor's degree. Some
                    postgraduate degrees require the completion of particular
                    bachelor's degree from specified fields, others don't. As a
                    general rule, you need to have completed a bachelor's degree
                    before doing a postgraduate degree (although there are some
                    exceptions). There are four main types of postgraduate
                    degrees: taught courses, research degrees, conversion
                    courses and professional qualifications. Many postgraduate
                    courses are studied at university, but some courses are
                    taught in a commercial environment.
                  </p>

                  <div className="border-box">
                    <h5 className="title">
                      Requirements for admission for masters, masters of
                      research and doctorates.
                    </h5>
                    <div className="row g-5">
                      <div className="col-lg-12">
                        <ul>
                          <li>Completed application form.</li>
                          <li>Copy of passport data page.</li>
                          <li>High school certificate/statement of result.</li>
                          <li>
                            Bachelors degree transcripts & certificate/statement
                            of results
                          </li>
                          <li>2 academic references</li>
                          <li>CV</li>
                          <li>
                            Masters degree certificate/transcript (for Masters
                            research and doctorate degree applicants).
                          </li>
                          <li>
                            Research proposal (for masters of research and
                            doctorate degree applicants).
                          </li>
                        </ul>
                      </div>
                      <h3 className="heading-title">Please Note:</h3>
                      <p>
                        Additional documentations may be required depending on
                        the proposed course i.e Architecture, MBA, Photography,
                        etc
                      </p>
                      <p>An interview may be required in some programmes.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="course-review hide-mobile">
              <div className="comment-area">
                <h3 className="heading-title">Related Courses</h3>
                <div className="comment-list-wrapper">
                  {relatedCourses?.map((item, i) => (
                    <SingleComment key={i} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 hide-mobile">
            <CourseDetailsSidebar course={course} details_2={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsArea;
