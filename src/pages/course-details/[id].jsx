import { useRouter } from "next/router";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import SEO from "../../components/seo";
import { course_data } from "../../data";
import { Wrapper } from "../../layout";
import CourseDetailsMain from "../../components/course-details";
import {
  GLOBAL_URL,
  GET_COURSE_BY_ID,
  POST_RELATED_COURSES,
  GET_COURSE_BY_NAME,
} from "../../utils/global";

const DynamicCourseDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState({});
  const [relatedCourses, setRelatedCourses] = useState([]);
  useEffect(() => {
    if (!id) {
      return;
    }
    async function fetchData() {
      const response = await GET_COURSE_BY_NAME(id);
      const res = response.data.data;

      const relatedCourses = await POST_RELATED_COURSES({
        facultyId: res.facultyId,
      });
      setRelatedCourses(relatedCourses.data.data);
      setCourse(res);
    }
    fetchData();
  }, [id]);
  return (
    <Wrapper>
      <SEO pageTitle={course.name} />
      <CourseDetailsMain course={course} relatedCourses={relatedCourses} />
    </Wrapper>
  );
};

export default DynamicCourseDetails;

// export async function getStaticPaths() {
//     const paths = course_data.map((course) => {
//         return {
//             params:{
//                 id:`${course.id}`
//             }
//         }
//     })
//     return {
//       paths,
//       fallback: false,
//     }
//   }

// export async function getStaticProps(context) {
//     return {
//         props: {}
//     }
// }
