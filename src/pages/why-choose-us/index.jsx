import SEO from "../../components/seo";
import { Wrapper } from "../../layout";
import AboutMain from "../../components/about";
import { event_data } from "../../data";
import {
  FOR_ABOUT_US,
  FOR_WHY_CHOOSE_US,
  WHY_CHOOSE_US,
} from "../../utils/global";

const event = event_data[0];

const AboutUs = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Why Choose Us"} />
      <AboutMain event={event} type={FOR_WHY_CHOOSE_US} />
    </Wrapper>
  );
};

export default AboutUs;
