import { useEffect } from "react";
import { useRouter } from "next/router";
import SponsorPage from "../../../backend/components/sponsor-page";
function dashboard() {
  const router = useRouter();
  const { agentUserId } = router.query;

  useEffect(() => {
    if (!agentUserId) {
      return;
    }
  }, [agentUserId]);
  return <>{agentUserId && <SponsorPage agentUserId={agentUserId} />}</>;
}

export default dashboard;
