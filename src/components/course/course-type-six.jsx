import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "../../redux/features/cart-slice";

const CourseTypeSix = ({ data, classes }) => {
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // handle add to cart
  // const handleAddToCart = (course) => {
  //   dispatch(
  //     cart_course({
  //       id: course.id,
  //       img: `/assets/images/course/course-06/${course.img}`,
  //       price: course.course_price,
  //       title: course.title,
  //     })
  //   );
  // };
  return (
    <div className={`edu-course course-style-3 ${classes ? classes : ""}`}>
      <div className="inner">
        <div className="thumbnail">
          <Link href={`/course-details/${data.id}`}>
            <a>
              <img
                style={{ height: 200, objectFit: "cover" }}
                src={`${data.url}`}
                alt="Course Meta"
              />
            </a>
          </Link>
          <div className="time-top">
            <span className="duration">
              <i className="icon-03"></i>
              {data.fee}
            </span>
          </div>
        </div>

        <div className="content">
          <span className="course-level">{data.faculty}</span>
          <h5 className="title">
            <Link href={`/course-details/${data.id}`}>
              <a>{data.name}</a>
            </Link>
          </h5>
          <p>{data.intake} intake</p>
          {/* <div className="course-rating">
                        <div className="rating">
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                        </div>
                        <span className="rating-count">({data.rating} /{data.rating_count} Rating)</span>
                    </div> */}
          <div className="read-more-btn">
            <a
              href={`/course-details/${data.id}`}
              className="edu-btn btn-small btn-secondary"
              style={{ cursor: "pointer" }}
            >
              {"Course details"}
              <i className="icon-4"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseTypeSix;
