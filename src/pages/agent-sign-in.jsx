import SEO from "../components/seo";
import { Wrapper } from "../layout";
import AgentSignInMain from "../components/agent-sign-in";

export default function SignIn() {
  return (
    <Wrapper>
      <SEO pageTitle={"Agent Sign In"} />
      <AgentSignInMain />
    </Wrapper>
  );
}
