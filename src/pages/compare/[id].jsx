import SEO from "../../components/seo";
import { useRouter } from "next/router";
import { Wrapper } from "../../layout";
import { useEffect, useState } from "react";
import CourseStyleOneMain from "../../components/compare-style";

const CourseStyleOne = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Wrapper>
      <SEO
        pageTitle={
          "Course Comparison - Find the Perfect Fit for Your Academic Journey in Scotland"
        }
      />
      <CourseStyleOneMain routeId={id} />
    </Wrapper>
  );
};

export default CourseStyleOne;
