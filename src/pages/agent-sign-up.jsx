import SEO from "../components/seo";
import { Wrapper } from "../layout";
import AgentSignUpMain from "../components/agent-sign-up";

export default function SignIn() {
  return (
    <Wrapper>
      <SEO pageTitle={"Agent Sign Up"} />
      <AgentSignUpMain />
    </Wrapper>
  );
}
