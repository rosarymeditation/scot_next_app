import SEO from "../components/seo";
import { Wrapper } from "../layout";
import VerifyEmailSuccessMain from "../components/verify-email-success";

export default function VerifyEmail() {
  return (
    <Wrapper>
      <SEO pageTitle={"Verify Email"} />
      <VerifyEmailSuccessMain />
    </Wrapper>
  );
}
