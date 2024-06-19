import SEO from "../../components/seo";
import { Wrapper } from "../../layout";
import AboutMain from "../../components/about";
import { event_data } from "../../data";
import { FOR_ABOUT_US } from "../../utils/global";

const event = event_data[0];

const AboutUs = () => {
  return (
    <Wrapper>
      <SEO
        pageTitle={
          "About Scotstudy - Your Trusted Guide to Studying in Scotland"
        }
      />
      <AboutMain event={event} type={FOR_ABOUT_US} />
    </Wrapper>
  );
};

export default AboutUs;
