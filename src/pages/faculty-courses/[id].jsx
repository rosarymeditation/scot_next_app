import SEO from "../../components/seo";
import { useRouter } from "next/router";
import { Wrapper } from "../../layout";
import { useEffect, useState } from "react";
import CourseStyleOneMain from "../../components/course-style-1";

const CourseStyleOne = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Wrapper>
      <SEO pageTitle={"Search Courses in Scotland"} />
      {id && <CourseStyleOneMain institutionId={""} facultyId={id} />}
    </Wrapper>
  );
};

export default CourseStyleOne;
