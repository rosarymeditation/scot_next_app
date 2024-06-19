import React from "react";
import { Footer, Header } from "../../layout";
import BreadcrumbFour from "../breadcrumb/breadcrumb-4";
import AboutArea from "./about-area";

const index = ({ event, type }) => {
  return (
    <div className="sticky-header">
      <div id="main-wrapper" className="main-wrapper">
        <Header no_top_bar={true} />

        <AboutArea type={type} event={event} />
        <Footer dark_bg={true} />
      </div>
    </div>
  );
};

export default index;
