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
      <SEO
        pageTitle={
          "Explore Diverse Courses in Scotland - Unlock Your Academic Potential"
        }
      />
      <CourseStyleOneMain institutionId={id} facultyId={""} />
    </Wrapper>
  );
};

export default CourseStyleOne;
