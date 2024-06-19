import React from "react";
import { Footer, Header } from "../../layout";
import BreadcrumbThree from "../breadcrumb/breadcrumb-3";
import CompareArea from "./compare-area";

const index = () => {
  return (
    <div className="sticky-header">
      <div id="main-wrapper" className="main-wrapper">
        <Header no_top_bar={true} />
        <BreadcrumbThree title="Compare Courses" subtitle="Compare Courses" />
        <CompareArea />
        <Footer dark_bg={true} />
      </div>
    </div>
  );
};

export default index;
