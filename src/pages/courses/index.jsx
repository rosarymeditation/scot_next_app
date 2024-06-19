import SEO from "../../components/seo";
import { Wrapper } from "../../layout";
import CourseStyleOneMain from "../../components/course-style-1";

const CourseStyleOne = () => {
  return (
    <Wrapper>
      <SEO
        pageTitle={
          "Explore Diverse Courses in Scotland - Unlock Your Academic Potential"
        }
      />
      <CourseStyleOneMain />
    </Wrapper>
  );
};

export default CourseStyleOne;
