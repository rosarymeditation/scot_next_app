import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "../../../contexts/mouse-move-context";
import Link from "next/link";
import { shop_data } from "../../../data";

const contents = {
  pre_title: "Testimonials",
  title: (
    <>
      What Our Students <br /> Have To Say
    </>
  ),
  desc: "Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod tempor incidid unt labore dolore magna aliquaenim minim.",
  testimonial_items: [
    {
      logo: "/assets/images/testimonial/logo-01.png",
      desc: "Lorem ipsum dolor amet consectur elit adicing elit sed do umod tempor ux incididunt enim ad minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix.",
      ratings: [1, 2, 3, 4, 5],
      img: "/assets/images/testimonial/testimonial-01.png",
      name: "Ray Sanchez",
      title: "Student",
    },
    {
      logo: "/assets/images/testimonial/logo-02.png",
      desc: "Lorem ipsum dolor amet consectur elit adicing elit sed do umod tempor ux incididunt enim ad minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix.",
      ratings: [1, 2, 3, 4, 5],
      img: "/assets/images/testimonial/testimonial-02.png",
      name: "Thomas Lopez",
      title: "Designer",
    },
    {
      logo: "/assets/images/testimonial/logo-03.png",
      desc: "Lorem ipsum dolor amet consectur elit adicing elit sed do umod tempor ux incididunt enim ad minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix.",
      ratings: [1, 2, 3, 4, 5],
      img: "/assets/images/testimonial/testimonial-03.png",
      name: "Amber Page",
      title: "Developer",
    },
    {
      logo: "/assets/images/testimonial/logo-02.png",
      desc: "Lorem ipsum dolor amet consectur elit adicing elit sed do umod tempor ux incididunt enim ad minim veniam quis nosrud citation laboris nisiste aliquip comodo perspiatix.",
      ratings: [1, 2, 3, 4, 5],
      img: "/assets/images/testimonial/testimonial-04.png",
      name: "Robert Tapp",
      title: "Content Creator",
    },
  ],
};

const { desc, pre_title, testimonial_items, title } = contents;

const PopularCourses = ({ about_p_2 }) => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  const [loop, setLoop] = useState(false);
  useEffect(() => setLoop(true), []);
  return (
    <div
      className={`testimonial-area-2 ${
        about_p_2 ? "edu-section-gap" : "section-gap-large"
      }`}
    >
      <div className="">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div
              className="section-title section-center"
              data-sal-delay="150"
              data-sal="slide-up"
              data-sal-duration="800"
            >
              <span className="pre-title">{pre_title}</span>
              <h2 className="title">{title}</h2>
              <span className="shape-line">
                <i className="icon-19"></i>
              </span>
              <p>{desc}</p>
            </div>
          </div>
        </div>
        <Swiper
          className="testimonial-activation swiper"
          slidesPerView={4}
          spaceBetween={0}
          loop={loop}
          grabCursor={true}
          speed={2000}
          autoplay={{
            delay: 3000,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
          pagination={{
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
          }}
        >
          {shop_data.map((product) => {
            const { id, img, delay, price, rating, title, total_rating } =
              product;
           
            return (
              <SwiperSlide key={id}>
                <div
                  className={`edu-course course-style-1 hover-button-bg-white`}
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <Link href={`/course-details/${id}`}>
                        <a>
                          <img
                            src={`https://www.reigate-school.surrey.sch.uk/ckfinder/userfiles/images/Reigate_School_Home_1.jpg`}
                            alt="Course Meta"
                          />
                        </a>
                      </Link>
                      <div className="time-top">
                        <span className="duration">
                          <i className="icon-61"></i>
                          {"3 months"}
                        </span>
                      </div>
                    </div>
                    <div className="content">
                      <span className="course-level">{"3"}</span>
                      <h6 className="title">
                        <a href="#">{title}</a>
                      </h6>
                      <div className="course-rating">
                        <div className="rating">
                          <i className="icon-23"></i>
                          <i className="icon-23"></i>
                          <i className="icon-23"></i>
                          <i className="icon-23"></i>
                          <i className="icon-23"></i>
                        </div>
                        <span className="rating-count">
                          ({rating} /{rating.length} Rating)
                        </span>
                      </div>
                      <div className="course-price">${price}</div>
                      <ul className="course-meta">
                        <li>
                          <i className="icon-24"></i>
                          Lessons
                        </li>
                        <li>
                          <i className="icon-25"></i>
                          Students
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="course-hover-content-wrapper">
                    <button
                      onClick={() => handleWishlist(data)}
                      className={`wishlist-btn`}
                    >
                      <i className="icon-22"></i>
                    </button>
                  </div>

                  <div className="course-hover-content">
                    <div className="content">
                      <button
                        onClick={() => handleWishlist(data)}
                        className={`wishlist-btn`}
                      >
                        <i className="icon-22"></i>
                      </button>
                      <span className="course-level">{"level"}</span>
                      <h6 className="title">
                        <Link href={`/course-details/${id}`}>
                          <a>{title}</a>
                        </Link>
                      </h6>
                      <div className="course-rating">
                        <div className="rating">
                          <i className="icon-23"></i>
                          <i className="icon-23"></i>
                          <i className="icon-23"></i>
                          <i className="icon-23"></i>
                          <i className="icon-23"></i>
                        </div>
                        <span className="rating-count">
                          ({rating} /{rating.length} Rating)
                        </span>
                      </div>
                      <div className="course-price">${price}</div>
                      <p>description</p>
                      <ul className="course-meta">
                        <li>
                          <i className="icon-24"></i>
                          Lessons
                        </li>
                        <li>
                          <i className="icon-25"></i>
                          Students
                        </li>
                      </ul>
                      <a
                        onClick={() => handleAddToCart(data)}
                        className="edu-btn btn-secondary btn-small"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="icon-4"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="swiper-pagination"></div>

        <ul className="shape-group">
          <motion.li
            className="shape-1 scene"
            data-sal-delay="200"
            data-sal="fade"
            data-sal-duration="1000"
            animate={{
              x: mouseReverse(25).x,
              y: mouseReverse(25).y,
            }}
          >
            <img src="/assets/images/about/shape-30.png" alt="Shape" />
          </motion.li>
          <motion.li
            className="shape-2 scene"
            data-sal-delay="200"
            data-sal="fade"
            data-sal-duration="1000"
            animate={{
              x: mouseDirection(25).x,
              y: mouseDirection(25).y,
            }}
          >
            <img src="/assets/images/about/shape-25.png" alt="Shape" />
          </motion.li>
        </ul>
      </div>
      <ul className="shape-group">
        <li
          className="shape-3"
          data-sal-delay="200"
          data-sal="fade"
          data-sal-duration="1000"
        >
          <img
            className="d-block-shape-light"
            src="/assets/images/others/map-shape-3.png"
            alt="Shape"
          />
          <img
            className="d-none-shape-dark"
            src="/assets/images/others/dark-map-2-shape-3.png"
            alt="Shape"
          />
        </li>
      </ul>
    </div>
  );
};

export default PopularCourses;
