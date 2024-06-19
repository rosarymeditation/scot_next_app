import SEO from "../components/seo";
import { Wrapper } from "../layout";
import SignUpMain from "../components/sign-up";

export default function SignIn() {
  return (
    <Wrapper>
      <SEO pageTitle={"Sign Up"} />
      <SignUpMain />
    </Wrapper>
  );
}
