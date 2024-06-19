import { useEffect } from "react";
import { useRouter } from "next/router";
import DocumentPage from "../../../backend/components/document-page";
function dashboard() {
  const router = useRouter();
  const { agentUserId } = router.query;

  useEffect(() => {
    if (!agentUserId) {
      return;
    }
  }, [agentUserId]);
  return <>{agentUserId && <DocumentPage agentUserId={agentUserId} />}</>;
}

export default dashboard;
