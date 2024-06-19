import SEO from "../components/seo";
import { Wrapper } from "../layout";
import PhdMain from "../components/phd";

export default function SignIn() {
  return (
    <Wrapper>
      <SEO pageTitle={"Phd Application"} />
      <PhdMain />
    </Wrapper>
  );
}
