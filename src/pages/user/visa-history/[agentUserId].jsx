import { useEffect } from "react";
import { useRouter } from "next/router";
import VisaHistoryPage from "../../../backend/components/visa-history-page";
function dashboard() {
  const router = useRouter();
  const { agentUserId } = router.query;

  useEffect(() => {
    if (!agentUserId) {
      return;
    }
  }, [agentUserId]);
  return <>{agentUserId && <VisaHistoryPage agentUserId={agentUserId} />}</>;
}

export default dashboard;
