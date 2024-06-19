import SEO from "../components/seo";
import { Wrapper } from "../layout";
import CourseStyleOneMain from "../components/compare-style";

const CourseStyleOne = () => {
  return (
    <Wrapper>
      <SEO
        pageTitle={
          "Course Comparison - Find the Perfect Fit for Your Academic Journey in Scotland"
        }
      />
      <CourseStyleOneMain />
    </Wrapper>
  );
};

export default CourseStyleOne;
