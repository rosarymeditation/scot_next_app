import SEO from "../components/seo";
import { Wrapper } from "../layout";
import ForgotPasswordMain from "../components/forgot-password";

export default function SignIn() {
  return (
    <Wrapper>
      <SEO pageTitle={"Forgot Password"} />
      <ForgotPasswordMain />
    </Wrapper>
  );
}
