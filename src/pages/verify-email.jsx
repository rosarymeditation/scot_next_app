import SEO from "../components/seo";
import { Wrapper } from "../layout";
import VerifyEmailMain from "../components/verify-email";

export default function VerifyEmail() {
  return (
    <Wrapper>
      <SEO pageTitle={"Verify Email"} />
      <VerifyEmailMain />
    </Wrapper>
  );
}
