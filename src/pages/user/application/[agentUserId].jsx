import { useEffect } from "react";
import { useRouter } from "next/router";
import ApplicationPage from "../../../backend/components/application-page";
function dashboard() {
  const router = useRouter();
  const { agentUserId } = router.query;

  useEffect(() => {
    if (!agentUserId) {
      return;
    }
  }, [agentUserId]);
  return <>{agentUserId && <ApplicationPage agentUserId={agentUserId} />}</>;
}

export default dashboard;
