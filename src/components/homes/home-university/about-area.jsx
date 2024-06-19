import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "../../../contexts/mouse-move-context";

const tabs = {
  title: [
    {
      active: true,
      target: "about-edu",
      title: "About ScotStudy",
    },
    {
      target: "about-mission",
      title: "Our Mission",
    },
    {
      target: "about-vision",
      title: "Our Vision",
    },
  ],
  content: [
    {
      show: true,
      id: "about-edu",
      desc: "Scot-Study offers a seamless technological process to assist international students in pursuing their studies in Scotland. Their mobile app, Scot-Study, provides information, application support, and networking opportunities. They also organize tours for West African tourists to explore Scottish culture and heritage.",
      feature_list: [
        "Top-ranked institutions",
        "Mobile app convenience",
        "Cultural tours offered",
      ],
    },
    {
      id: "about-mission",
      desc: "Empowering international students to achieve their dreams of studying in Scotland through seamless technology, comprehensive support, and immersive cultural experiences, while fostering a sense of belonging and academic success.",
      feature_list: [
        "Seamless study journey",
        "Top-ranked institutions",
        "Mobile app convenience",
        "Cultural immersion experiences+",
      ],
    },
    {
      id: "about-vision",
      desc: "Our vision at Scot-Study is to become the leading global platform that connects international students with educational opportunities in Scotland, revolutionizing the study abroad experience through seamless technology and exceptional support services..",
      feature_list: [
        "Global study connections",
        "Transforming study abroad",
        "Seamless education access",
        "Exceptional support services",
      ],
    },
  ],
};

const AboutArea = () => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div className="edu-about-area about-style-3">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div
            className="col-lg-6"
            data-sal-delay="50"
            data-sal="slide-up"
            data-sal-duration="800"
          >
            <div className="about-content">
              <div className="section-title section-left">
                <span className="pre-title">About Us</span>
                <h2 className="title">
                  We Provide Best{" "}
                  <span className="color-primary">Education</span> Services For
                  You
                </h2>
                <span className="shape-line">
                  <i className="icon-19"></i>
                </span>
              </div>
              <ul className="nav nav-tabs" role="tablist">
                {tabs.title.map((t, i) => (
                  <li key={i} className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${t.active ? "active" : ""}`}
                      data-bs-toggle="tab"
                      data-bs-target={`#${t.target}`}
                      type="button"
                      role="tab"
                      tabIndex={"-1"}
                      aria-selected={t.active ? "true" : "false"}
                    >
                      {" "}
                      {t.title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="tab-content">
                {tabs.content.map((item, i) => {
                  const { desc, feature_list, id, show } = item;
                  return (
                    <div
                      key={id}
                      className={`tab-pane fade ${show ? "show active" : ""}`}
                      id={id}
                      role="tabpanel"
                    >
                      <p>{desc}</p>
                      <ul className="features-list">
                        {" "}
                        {feature_list.map((l, i) => (
                          <li key={i}>{l}</li>
                        ))}{" "}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-image-gallery">
              <img
                className="main-img-1"
                data-sal-delay="100"
                data-sal="slide-up"
                data-sal-duration="800"
                src="/assets/images/about/scot_study_team.jpeg"
                alt="About Image"
              />
              <img
                className="main-img-2"
                data-sal-delay="100"
                data-sal="slide-left"
                data-sal-duration="800"
                src="/assets/images/about/about-5.jpg"
                alt="About Image"
              />
              <ul className="shape-group">
                <motion.li
                  className="shape-1 scene"
                  data-sal-delay="500"
                  data-sal="fade"
                  data-sal-duration="200"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img src="/assets/images/about/shape-13.png" alt="Shape" />
                </motion.li>
                <motion.li
                  className="shape-2 scene"
                  data-sal-delay="500"
                  data-sal="fade"
                  data-sal-duration="200"
                  animate={{
                    x: mouseDirection(30).x,
                    y: mouseDirection(30).y,
                  }}
                >
                  <img src="/assets/images/about/shape-39.png" alt="Shape" />
                </motion.li>
                <motion.li
                  className="shape-3 scene"
                  data-sal-delay="500"
                  data-sal="fade"
                  data-sal-duration="200"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img src="/assets/images/about/shape-07.png" alt="Shape" />
                </motion.li>
                <li
                  className="shape-4"
                  data-sal-delay="500"
                  data-sal="fade"
                  data-sal-duration="200"
                >
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ul className="shape-group">
        <li className="shape-5">
          <img
            className="rotateit"
            src="/assets/images/about/shape-13.png"
            alt="Shape"
          />
        </li>
        <li className="shape-6">
          <span></span>
        </li>
      </ul>
    </div>
  );
};

export default AboutArea;
