import React from "react";
import { default_course_img } from "../../layout/headers/menu-data";
import Link from "next/link";
const SingleComment = ({ item }) => {
  return (
    <Link href={`/course-details/${item.id}`}>
      <div style={{ cursor: "pointer" }} className="comment">
        <div className="thumbnail">
          <img
            style={{ height: 100, width: 100, objectFit: "cover" }}
            src={item?.url || default_course_img}
            alt="Comment Images"
          />
        </div>
        <div className="comment-content">
          <h5 className="title">{item?.name}</h5>
          <span className="date">{item.facultyId?.name}</span>
          <p>{item.fee}</p>
        </div>
      </div>
    </Link>
  );
};

export default SingleComment;
