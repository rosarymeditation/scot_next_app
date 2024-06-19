import { useEffect } from "react";
import { useRouter } from "next/router";
import EnglishTestPage from "../../../backend/components/english-test-page";
function dashboard() {
  const router = useRouter();
  const { agentUserId } = router.query;

  useEffect(() => {
    if (!agentUserId) {
      return;
    }
  }, [agentUserId]);
  return <>{agentUserId && <EnglishTestPage agentUserId={agentUserId} />}</>;
}

export default dashboard;
