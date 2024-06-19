import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "../../../contexts/mouse-move-context";

const slider_data = [
  {
    id: 1,
    src: "/assets/images/bg/real/banner_one.webp",
    subtitle: "Welcome to ScotStudy",
    title: "2nd Most Popular Study Destination for International Students",
    sm_text:
      "The UK is the 2nd most popular destination in the world for international students to study",
    btn_text: "Find courses",
  },
  {
    id: 2,
    src: "/assets/images/bg/real/banner_two.webp",
    subtitle: "Welcome to ScotStudy",
    title: "Sponsored Study Visas Surge by 16% in 2019",
    sm_text:
      " 276,889 students were granted a sponsored study visa in 2019, which is a 16% increase from the previous year..",
    btn_text: "Find courses",
  },
  {
    id: 3,
    src: "/assets/images/bg/real/banner_three.webp",
    subtitle: "Welcome to ScotStudy",
    title:
      "Outstanding Satisfaction: Scottish Universities Delight International Graduates",
    sm_text:
      "91% of International Graduates are satisfied with their learning at any of our Scottish Universities.",
    btn_text: "Find courses",
  },
  {
    id: 4,
    src: "/assets/images/bg/real/banner_four.webp",
    subtitle: "Welcome to ScotStudy",
    title: "Scottish Education: Promising Prospects",
    sm_text:
      "A Scottish Education provides great prospects for different industries.",
    btn_text: "Find courses",
  },
  {
    id: 5,
    src: "/assets/images/bg/real/banner_five.webp",
    subtitle: "Welcome to ScotStudy",
    title: "Tuition Discounts: Student Benefits",
    sm_text:
      " Tuition Discounts are available to PhD, Masters and Bachelor’s Degree students",
    btn_text: "Find courses",
  },
];

const HeroSlider = ({ banners }) => {
  const [loop, setLoop] = useState(true);
  useEffect(() => setLoop(true), []);
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div className="hero-banner hero-style-3 bg-image">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={loop}
        pagination={false}
        grabCursor={true}
        draggable={true}
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        className="swiper university-activator"
        speed={1000}
        autoplay={{
          delay: 5500,
        }}
        navigation={{
          nextEl: ".slide-next",
          prevEl: ".slide-prev",
        }}
        lazy={{
          loadPrevNext: false,
          loadPrevNextAmount: 1,
        }}
      >
        {banners.map((item) => {
          const { id, title, url, subtitle } = item;
          return (
            <SwiperSlide key={id}>
              <img
                data-transform-origin="center center"
                src={url}
                className="swiper-lazy"
                alt="image"
              />
              <div className="thumbnail-bg-content">
                <div className="container edublink-animated-shape">
                  <div className="row">
                    <div className="col-7">
                      <div className="banner-content">
                        <span
                          className="subtitle"
                          data-sal="slide-up"
                          data-sal-duration="1000"
                        >
                          Welcome to ScotStudy
                        </span>
                        <h1
                          style={{ width: "100%" }}
                          className="title"
                          data-sal-delay="100"
                          data-sal="slide-up"
                          data-sal-duration="1000"
                        >
                          {title}
                        </h1>
                        <p
                          data-sal-delay="200"
                          data-sal="slide-up"
                          data-sal-duration="1000"
                        >
                          {subtitle}
                        </p>
                        <div
                          className="banner-btn"
                          data-sal-delay="400"
                          data-sal="slide-up"
                          data-sal-duration="1000"
                        >
                          <Link href="/courses">
                            <a className="edu-btn btn-secondary">
                              Find courses <i className="icon-4"></i>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        <div className="hero-slider-bg-controls">
          <div className="swiper-slide-controls slide-prev">
            <i className="icon-west"></i>
          </div>
          <div className="swiper-slide-controls slide-next">
            <i className="icon-east"></i>
          </div>
        </div>
      </Swiper>

      <ul className="shape-group">
        <motion.li
          className="shape-1 scene"
          data-sal-delay="1000"
          data-sal="fade"
          data-sal-duration="1000"
          animate={{
            x: mouseReverse(25).x,
            y: mouseReverse(25).y,
          }}
        >
          <img src="/assets/images/others/shape-10.png" alt="Shape" />
        </motion.li>
        <motion.li
          className="shape-2 scene"
          data-sal-delay="1000"
          data-sal="fade"
          data-sal-duration="1000"
          animate={{
            x: mouseDirection(25).x,
            y: mouseDirection(25).y,
          }}
        >
          <img src="/assets/images/others/shape-11.png" alt="Shape" />
        </motion.li>
        <li className="shape-3">
          <img src="/assets/images/others/shape-25.png" alt="Shape" />
        </li>
      </ul>
    </div>
  );
};

export default HeroSlider;
