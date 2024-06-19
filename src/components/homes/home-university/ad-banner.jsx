import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "../../../contexts/mouse-move-context";

const AdBanner = ({ home_4 }) => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div
      className={`${
        home_4 ? "online-academy-cta-wrapper" : "university-cta-wrapper"
      } edu-cta-banner-area bg-image`}
    >
      <div className="container">
        <div className="edu-cta-banner">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div
                className="section-title section-center"
                data-sal-delay="150"
                data-sal="slide-up"
                data-sal-duration="800"
              >
                <h2 className="title">
                  Apply For your <span className="color-primary">PhD</span>{" "}
                  Today{" "}
                </h2>
                <Link href="/phd-apply">
                  <a className="edu-btn btn-secondary">
                    Apply Now <i className="icon-4"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <ul className="shape-group">
            <motion.li
              className="shape-01 scene"
              animate={{
                x: mouseDirection(25).x,
                y: mouseDirection(25).y,
              }}
            >
              <img src="/assets/images/cta/shape-10.png" alt="shape" />
            </motion.li>
            <motion.li
              className="shape-02 scene"
              animate={{
                x: mouseReverse(25).x,
                y: mouseReverse(25).y,
              }}
            >
              <img src="/assets/images/cta/shape-09.png" alt="shape" />
            </motion.li>
            <motion.li
              className="shape-03 scene"
              animate={{
                x: mouseReverse(25).x,
                y: mouseReverse(25).y,
              }}
            >
              <img src="/assets/images/cta/shape-08.png" alt="shape" />
            </motion.li>
            <motion.li
              className="shape-04 scene"
              animate={{
                x: mouseDirection(25).x,
                y: mouseDirection(25).y,
              }}
            >
              <img src="/assets/images/about/shape-13.png" alt="shape" />
            </motion.li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
