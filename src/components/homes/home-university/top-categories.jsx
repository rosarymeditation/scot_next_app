import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FACULTIES } from "../../../layout/headers/menu-data";
function Category({ delay, color, icon, icon_class, title, course, id }) {
  return (
    <div
      className="col-lg-4 col-md-6"
      data-sal-delay={delay}
      data-sal="slide-up"
      data-sal-duration="800"
    >
      <div
        className={`categorie-grid categorie-style-4 ${color} edublink-svg-animate`}
      >
        <div className="icon">
          <i className={`${icon} ${icon_class ? icon_class : ""}`}></i>
        </div>
        <div className="content">
          <Link href={id ? `/faculty-courses/${id}` : "/courses"}>
            <a>
              <h5 className="title">{title}</h5>
            </a>
          </Link>
          <span className="course-count">{course} Courses</span>
        </div>
      </div>
    </div>
  );
}

const TopCategories = () => {
  const [faculties, setFaculties] = useState([]);
  useEffect(() => {
    loadFaculties();
  }, []);
  function loadFaculties() {
    setFaculties([...FACULTIES]);
  }
  return (
    <div className="edu-categorie-area categorie-area-4 edu-section-gap">
      <div className="container">
        <div
          className="section-title section-center"
          data-sal-delay="150"
          data-sal="slide-up"
          data-sal-duration="800"
        >
          <h2 className="title"> Faculties</h2>
          <span className="shape-line">
            <i className="icon-19"></i>
          </span>
          <p>Discover a wide range of courses offered by faculty</p>
        </div>

        <div className="row g-5">
          <Category
            id="36f19d62-ca16-4392-afc3-f6253d2da620"
            delay="50"
            color="color-primary-style"
            icon="icon-58"
            title="Engineering & Built Environment"
            course="183+"
          />

          <Category
            id="7fb12650-7615-4614-bbf2-797d885c7c40"
            delay="100"
            color="color-secondary-style"
            icon="icon-25"
            icon_class="art-design"
            title="Nursing & Midwifery"
            course="400+"
          />

          <Category
            id="3ef55fdd-6c8e-419f-9196-6053794b4095"
            delay="150"
            color="color-extra01-style"
            icon="icon-1"
            icon_class="personal-development"
            title="Life Sciences & Health"
            course="670+"
          />

          <Category
            id="4d9d1262-450a-4eb9-a6a4-cff838af42d1"
            delay="50"
            color="color-tertiary-style"
            icon="icon-12"
            icon_class="health-fitness"
            title="Medicine & Surgery"
            course="90+"
          />

          <Category
            id="a2059529-8766-4dd4-9bbb-dfa8f2540cc5"
            delay="150"
            color="color-extra03-style"
            icon="icon-9"
            title="Social Sciences & Humanities"
            course="788+"
          />

          <Category
            id="250d2d75-7e69-49fa-8234-1cd565f57376"
            delay="50"
            color="color-extra04-style"
            icon="icon-15"
            title="Business & Management"
            course="599+"
          />

          <Category
            id="8d246951-4b16-44f6-8cfa-8bd736742825"
            delay="100"
            color="color-extra05-style"
            icon="icon-16"
            icon_class="Sciences & Computing"
            title="Computer Science"
            course="178+"
          />

          <Category
            id="48478e98-42a6-4f08-9e49-8317870bfb44"
            delay="150"
            color="color-extra06-style"
            icon="icon-17"
            icon_class="video-photography"
            title="Media & Design"
            course="220+"
          />

          <Category
            id=""
            delay="200"
            color="color-extra02-style"
            icon="icon-1"
            icon_class="data-science"
            title="All Courses"
            course="3000+"
          />
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
