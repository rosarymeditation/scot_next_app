import SEO from "../../components/seo";
import { Wrapper } from "../../layout";
import ResetPasswordMain from "../../components/reset-password";
import { useRouter } from "next/router";
export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  return (
    <Wrapper>
      <SEO pageTitle={"Reset Password"} />
      {token && <ResetPasswordMain token={token} />}
    </Wrapper>
  );
}
