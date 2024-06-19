import Link from "next/link";
import Swal from "sweetalert";
import FooterSocial from "./component/footer-social";
import {
  VALIDATION_TITLE,
  address,
  email1,
  phone1,
  phone2,
  phone3,
} from "../headers/menu-data";
import { useState, useEffect, useRef } from "react";
import { POST_NEWSLETTER_SAVE } from "../../utils/global";
const footer_contents = {
  logoLight: "/assets/images/logo/logo-dark.png",
  logoDark: "/assets/images/logo/logo-white.png",
  desc: "Scot-Study offers a seamless technological process to assist international students in pursuing their studies in Scotland.",
  add: `${address}`,
  call: `${phone3}`,
  email: `${email1}`,
  widgets: [
    {
      col: "3",
      class: "explore-widget",
      widget_title: "Links",
      footer_links: [
        { link: "/about-us", title: "About" },
        { link: "/courses", title: "Courses" },
        { link: "/compare", title: "Compare Courses" },
        { link: "/institutions", title: "Institutions" },
        { link: "/contact-us", title: "Contact Us" },

        { link: "/conversion", title: "Convert Currency" },
      ],
    },
    {
      col: "2",
      class: "quick-link-widget",
      widget_title: "Others",
      footer_links: [
        { link: "/sign-in", title: "Sign In" },
        { link: "/agent-sign-in", title: "Agent Sign In" },
        { link: "/sign-up", title: "Sign Up" },
        { link: "/agent-sign-up", title: "Agent Sign Up" },
        { link: "/privacy", title: "Privacy Policy" },
        { link: "/terms-condition", title: "Terms & Conditions" },
      ],
    },
  ],
};

const { logoDark, logoLight, desc, add, call, email, widgets } =
  footer_contents;

const Footer = ({ style_2, dark_bg, home_4 }) => {
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      showAlert(VALIDATION_TITLE, "A valid email is required!");
      return;
    }

    if (!email) {
      return;
    } else {
      const result = await POST_NEWSLETTER_SAVE({ email, name: "user" });

      const res = result.data;

      if (res.error) {
        showAlert(
          VALIDATION_TITLE,
          "You had already subscribed to our newsletter"
        );
      } else {
        setEmail("");
        showAlert("SUCCESS", "You have subscribed to our newsletter", false);
      }
    }
  };
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  return (
    <footer
      className={`edu-footer ${
        style_2
          ? style_2
          : dark_bg
          ? "footer-dark bg-image footer-style-3"
          : "footer-lighten bg-image footer-style-1"
      }`}
    >
      <div className={`footer-top ${style_2 ? "footer-top-2" : ""}`}>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="edu-footer-widget">
                <div className="logo">
                  <Link href={"/"}>
                    <a>
                      {!dark_bg && (
                        <>
                          {!style_2 && (
                            <img
                              className="logo-light"
                              src={logoLight}
                              alt="Corporate Logo"
                            />
                          )}
                          <img
                            className="logo-dark"
                            src={logoDark}
                            alt="Corporate Logo"
                          />
                        </>
                      )}
                    </a>
                  </Link>

                  <Link href={"/"}>
                    <a>
                      {dark_bg && (
                        <img
                          className="logo-light"
                          src={
                            home_4
                              ? "/assets/images/logo/f-logo 2.png"
                              : "/assets/images/logo/f-logo 2.png"
                          }
                          alt="Corporate Logo"
                        />
                      )}
                    </a>
                  </Link>
                </div>

                <p className="description">{desc}</p>
                <div className="widget-information">
                  <ul className="information-list">
                    <li>
                      <span>Add:</span>
                      {add}
                    </li>
                    <li>
                      <span>Call:</span>
                      <a href={`tel:${phone3}`}>{phone3}</a>
                    </li>
                    <li>
                      <span>Email:</span>
                      <a
                        href={`mailto:${email1}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {email1}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {widgets.map((w, i) => (
              <div key={i} className={`col-lg-${w.col} col-sm-6`}>
                <div className={`edu-footer-widget ${w.class}`}>
                  <h4 className="widget-title">{w.widget_title}</h4>
                  <div className="inner">
                    <ul className="footer-link link-hover">
                      {w.footer_links.map((l, i) => (
                        <li key={i}>
                          <Link href={`/${l.link}`}>
                            <a>{l.title}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-lg-4 col-md-6">
              <div className="edu-footer-widget">
                <h4 className="widget-title">Contacts</h4>
                <div className="inner">
                  <p className="description">
                    Enter your email address to register to our newsletter
                    subscription
                  </p>
                  <div className="input-group footer-subscription-form">
                    <input
                      type="email"
                      required
                      value={email}
                      className="form-control"
                      placeholder="Your email"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setEmail(e.target.value);
                      }}
                    />
                    <button
                      onClick={handleSubmit}
                      className={`edu-btn ${
                        dark_bg && !home_4 ? "btn-secondary" : ""
                      } btn-medium`}
                      type="button"
                    >
                      Subscribe <i className="icon-4"></i>
                    </button>
                  </div>
                  <ul className="social-share icon-transparent">
                    <FooterSocial />
                  </ul>
                  <a
                    style={{ marginLeft: -30 }}
                    href="https://play.google.com/store/apps/details?id=com.scotstudymobile.app&hl=en_GB&gl=US"
                    target="_blank"
                  >
                    <img
                      style={{ width: 200 }}
                      alt="Masters Degree in Dundee"
                      src="assets/images/download_scotstudy_android.png"
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/gb/app/scotstudy/id1583428226"
                    target="_blank"
                  >
                    <img
                      style={{ width: 150 }}
                      alt="Masters in Scotland"
                      src="assets/images/download_scotstudy_ios.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner text-center">
                <p>
                  Copyright {new Date().getFullYear()}{" "}
                  <a href="" rel="noreferrer" target="_blank">
                    Scotia World
                  </a>{" "}
                  Designed By{" "}
                  <a
                    href="https://softnergy.com"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Softnergy Limited
                  </a>
                  . All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
