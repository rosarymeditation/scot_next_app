import SEO from "../../components/seo";
import { Wrapper } from "../../layout";
import AboutMain from "../../components/about";
import { event_data } from "../../data";
import { FOR_ABOUT_SCOTLAND, FOR_ABOUT_US } from "../../utils/global";

const event = event_data[0];

const AboutUs = () => {
  return (
    <Wrapper>
      <SEO
        pageTitle={
          "Discover Scotland - A Land of Rich History, Natural Beauty, and Educational Excellence"
        }
      />
      <AboutMain event={event} type={FOR_ABOUT_SCOTLAND} />
    </Wrapper>
  );
};

export default AboutUs;
