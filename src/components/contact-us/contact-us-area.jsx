import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "../../contexts/mouse-move-context";
import ContactUsForm from "../forms/contact-us-form";
import { SocialShare } from "../social-share";
import {
  address,
  email1,
  phone1,
  phone2,
  phone3,
} from "../../layout/headers/menu-data";

const ContactUsArea = () => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <section className="contact-us-area">
      <div className="container">
        <div className="row g-5">
          <div className="col-xl-4 col-lg-6">
            <div className="contact-us-info">
              <h3 className="heading-title">
                {"We're"} Always Eager to Hear From You!
              </h3>
              <ul className="address-list">
                <li>
                  <h5 className="title">Address</h5>
                  <p>{address}</p>
                </li>
                <li>
                  <h5 className="title">Email</h5>
                  <p>
                    <a href={email1}>{email1}</a>
                  </p>
                </li>
                <li>
                  <h5 className="title">Phone</h5>
                  <p>
                    Tel: <a href={phone3}>{phone3}</a>
                  </p>
                  <p>
                    WhatsApp: <a href={phone2}>{phone2}</a>
                  </p>
                </li>
              </ul>
              <ul className="social-share">
                <li>
                  <a href="#">
                    <i className="icon-share-alt"></i>
                  </a>
                </li>
                <SocialShare />
              </ul>
            </div>
          </div>

          <div className="offset-xl-2 col-lg-6">
            <div className="contact-form form-style-2">
              <div className="section-title">
                <h4 className="title">Get In Touch</h4>
                <p>Fill out this form to contact ScotStudy today!.</p>
              </div>
              {/* form start */}
              <ContactUsForm />
              {/* form end */}
              <ul className="shape-group">
                <motion.li
                  className="shape-1 scene"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img src="/assets/images/about/shape-13.png" alt="Shape" />
                </motion.li>
                <motion.li
                  className="shape-2 scene"
                  animate={{
                    x: mouseDirection(30).x,
                    y: mouseDirection(30).y,
                  }}
                >
                  <img
                    src="/assets/images/counterup/shape-02.png"
                    alt="Shape"
                  />
                </motion.li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsArea;
