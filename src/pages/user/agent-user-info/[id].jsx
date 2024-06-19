import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ApplicationPage from "../../../backend/components/application-page";
import ApplicationDetailPage from "../../../backend/components/application-detail-page";
import { POST_APPLICATION_ID } from "../../../utils/global";
import AgentUserInfoPage from "../../../backend/components/agent-user-info-page";
function getId() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
  }, [id]);

  return <>{id && <AgentUserInfoPage userId={id} />}</>;
}

export default getId;
