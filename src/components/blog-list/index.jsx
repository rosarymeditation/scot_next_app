import React from "react";
import { Footer, Header } from "../../layout";
import BreadcrumbThree from "../breadcrumb/breadcrumb-3";
import AdBanner from "../homes/home/ad-banner";
import ListArea from "./list-area";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Loader } from "../loader";
import { INSTITUTIONS } from "../../layout/headers/menu-data";
const index = () => {
  useEffect(() => {
    loadInstitutions();
  }, []);

  const [institutions, setInstitutions] = useState([]);
  function loadInstitutions() {
    setInstitutions(INSTITUTIONS);
  }
  return (
    <div className="sticky-header">
      <div id="main-wrapper" className="main-wrapper">
        <Header no_top_bar={true} />
        <BreadcrumbThree title="Institutions" subtitle="Institutions" />
        {institutions.length == 0 && <Loader />}
        {institutions.length > 0 && <ListArea institutions={institutions} />}

        <Footer style_2={"footer-dark bg-image footer-style-2"} />
      </div>
    </div>
  );
};

export default index;
