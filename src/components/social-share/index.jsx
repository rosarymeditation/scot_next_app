import React from "react";
import {
  facebookUrl,
  linkedInUrl,
  twitterUrl,
} from "../../layout/headers/menu-data";

const social_share = [
  { link: facebookUrl, target: "_blank", icon: "icon-facebook" },
  { link: twitterUrl, target: "_blank", icon: "icon-twitter" },
  { link: linkedInUrl, target: "_blank", icon: "icon-linkedin2" },
];

export const SocialShare = () => {
  return (
    <>
      {social_share.map((social, i) => (
        <li key={i}>
          <a href={social.link} target={social.target ? social.target : ""}>
            <i className={social.icon}></i>
          </a>
        </li>
      ))}
    </>
  );
};
