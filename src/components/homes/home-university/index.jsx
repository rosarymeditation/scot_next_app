import React from "react";
import { Footer, Header } from "../../../layout";
import CounterArea from "../home-distant-learning/counter-area";
import AboutArea from "./about-area";
import AdBanner from "./ad-banner";
import BrandArea from "./brand-area";
import CategoryArea from "./category-area";
import CollegeCampus from "./college-champus";
import CoursesArea from "./course-area";
import Cta from "./cta";
import EventArea from "./event-area";
import HeroSlider from "./hero-slider";
import Testimonial from "./testimonial";
import VideoArea from "./video-area";

import axios from "axios";
import { useEffect, useState } from "react";
import PopularCourses from "./popular_courses";
import TopCategories from "./top-categories";
import { FACULTIES } from "../../../layout/headers/menu-data";
import { POST_BANNERS } from "../../../utils/global";
const index = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    loadBanners();
  }, []);
  // function loadFaculties() {
  //   setFaculties([...FACULTIES]);
  // }
  async function loadBanners() {
    const result = await POST_BANNERS();
    const res = result.data.data;

    setBanners(res);
  }
  return (
    <div className="sticky-header">
      <div id="main-wrapper" className="main-wrapper">
        <Header />
        <HeroSlider banners={banners} />
        <CategoryArea />
        <AboutArea />
        {/* <CounterArea home_3={true} /> */}
        <TopCategories />
        <CoursesArea />

        <Testimonial />
        <VideoArea />
        <Cta />
        {/* <EventArea /> */}
        {/* <BrandArea /> */}
        <AdBanner />
        <Footer dark_bg={true} />
      </div>
    </div>
  );
};

export default index;
