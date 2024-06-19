import { useEffect } from "react";
import { useRouter } from "next/router";
import QualificationPage from "../../../backend/components/qualification-page";

function dashboard() {
  const router = useRouter();
  const { agentUserId } = router.query;

  useEffect(() => {
    if (!agentUserId) {
      return;
    }
  }, [agentUserId]);
  return <>{agentUserId && <QualificationPage agentUserId={agentUserId} />}</>;
}

export default dashboard;
