import { useEffect } from "react";
import { useRouter } from "next/router";
import AgentUserApplicationsPage from "../../../backend/components/agent-user-applications";
function dashboard() {
  const router = useRouter();
  const { agentUserId } = router.query;

  useEffect(() => {
    if (!agentUserId) {
      return;
    }
  }, [agentUserId]);
  return (
    <>
      {agentUserId && <AgentUserApplicationsPage agentUserId={agentUserId} />}
    </>
  );
}

export default dashboard;
