import React from "react";
import {
  BookLibrary,
  ScholarshipFacility,
  SkilledLecturers,
} from "../../../svg";

const categories = [
  {
    icon: <ScholarshipFacility />,
    title: "Search Courses",
    text: "Find courses online, explore your educational options.",
    color: "color-primary-style",
  },
  {
    icon: <SkilledLecturers />,
    title: "Compare Courses",
    text: "Analyze courses, make informed decisions, choose wisely.",
    color: "color-secondary-style",
  },
  {
    icon: <BookLibrary />,
    title: "Application",
    text: "Apply easily, track progress, stay organized throughout the process.",
    color: "color-extra02-style",
  },
];

const CategoryArea = () => {
  return (
    <div className="features-area-3">
      <div className="container">
        <div className="features-grid-wrap">
          {categories.map((c, i) => (
            <div
              key={i}
              className={`features-box features-style-3 ${c.color} edublink-svg-animate`}
            >
              <div className="icon">{c.icon}</div>
              <div className="content">
                <h4 className="title">{c.title}</h4>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryArea;
