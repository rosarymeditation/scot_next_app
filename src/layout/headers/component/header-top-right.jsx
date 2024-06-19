import Link from "next/link";
import React from "react";
import {
  email1,
  facebookUrl,
  instagramUrl,
  linkedInUrl,
  phone1,
  phone3,
  twitterUrl,
} from "../menu-data";

const social_share = [
  { link: facebookUrl, target: "_blank", icon: "icon-facebook" },
  { link: twitterUrl, target: "_blank", icon: "icon-twitter" },
  { link: linkedInUrl, target: "_blank", icon: "icon-linkedin2" },
  { link: instagramUrl, target: "_blank", icon: "icon-instagram" },
];

const HeaderTopRight = () => {
  return (
    <ul className="header-info">
      <li>
        <Link href="/sign-in">
          <a>Login</a>
        </Link>
      </li>
      <li>
        <Link href="/sign-up">
          <a>Register</a>
        </Link>
      </li>
      <li>
        <a href={`tel:${phone1}`}>
          <i className="icon-phone"></i>Call: {phone3}{" "}
        </a>
      </li>
      <li>
        <a href={`mailto:${email1}`} rel="noreferrer" target="_blank">
          <i className="icon-envelope"></i>Email: {email1}
        </a>
      </li>
      <li className="social-icon">
        {social_share.map((social, i) => (
          <a
            key={i}
            href={social.link}
            target={social.target ? social.target : ""}
            className={`${social.color}`}
          >
            <i className={social.icon}></i>
          </a>
        ))}
      </li>
    </ul>
  );
};

export default HeaderTopRight;
