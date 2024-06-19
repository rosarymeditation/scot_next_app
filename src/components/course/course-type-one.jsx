import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "../../redux/features/cart-slice";
import {
  add_to_wishlist,
  wishlistItems,
} from "../../redux/features/wishlist-slice";
import {
  default_course,
  default_course_img,
} from "../../layout/headers/menu-data";
import { DEFAULT_COLOR } from "../../utils/global";

const CourseTypeOne = ({ data, classes, image_location_path = "01" }) => {
  // handle add to cart
  // const handleAddToCart = (course) => {
  //   dispatch(
  //     cart_course({
  //       name: course.id,
  //       img: `/assets/images/course/course-06/${course.img}`,
  //       price: course.course_price,
  //       title: course.title,
  //     })
  //   );
  // };

  return (
    <a href={`/course-details/${data.slug}`}>
      <div
        style={{ height: 550, cursor: "pointer" }}
        className={`edu-course course-style-1 ${
          classes ? classes : ""
        } hover-button-bg-white`}
      >
        <div className="inner">
          <div className="thumbnail">
            <Link href={`/course-details/${data.slug}`}>
              <a>
                <img
                  style={{ height: 200, width: 400, objectFit: "cover" }}
                  src={data.url || default_course_img}
                  alt="Course Meta"
                />
              </a>
            </Link>
            <div className="time-top">
              <span
                style={{ color: "white", backgroundColor: "#e24c00" }}
                className="duration"
              >
                <i className="icon-60"></i>
                {data.fee}
              </span>
            </div>
          </div>
          <div className="content">
            <span className="course-level">{data?.Faculty?.name}</span>
            <h6 className="title">
              <a href="#">{data.name}</a>
            </h6>

            <div className="course-price">{data?.Institution?.name}</div>
            <ul className="course-meta">
              <li style={{ color: "green" }}>
                <i style={{ color: "green" }} className="icon-21"></i>
                {data.scholarshipAmount} scholarship
              </li>
            </ul>
            <ul className="course-meta">
              <li style={{ color: DEFAULT_COLOR }}>
                <i style={{ color: DEFAULT_COLOR }} className="icon-49"></i>
                <b>{data?.Institution?.deposit} deposit</b>
              </li>
            </ul>
            <ul className="course-meta">
              <li>
                <i className="icon-61"></i>
                {data.duration}
              </li>
              <li>
                <i className="icon-27"></i>
                {data.intake}
              </li>
            </ul>
          </div>
        </div>

        <div className="course-hover-content-wrapper"></div>

        <div className="course-hover-content">
          <div className="content">
            {/* <button
              className={`wishlist-btn ${isWishlistSelected ? "active" : ""}`}
            >
              <i className="icon-22"></i>
            </button> */}
            <span className="course-level">{data?.Faculty?.name}</span>
            <h6 className="title">
              <a>{data.name}</a>
            </h6>

            <div className="course-price">{data.fee}</div>
            <p>{data.degreeType}</p>
            <ul className="course-meta">
              <li>
                <i className="icon-61"></i>
                {data.duration}
              </li>
              <li>
                <i className="icon-27"></i>
                {data.intake}
              </li>
            </ul>
            <a
              // onClick={() => handleAddToCart(data)}
              className="edu-btn btn-secondary btn-small"
              style={{ cursor: "pointer" }}
            >
              Details
              <i className="icon-4"></i>
            </a>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CourseTypeOne;
