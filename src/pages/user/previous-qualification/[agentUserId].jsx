import { useEffect } from "react";
import { useRouter } from "next/router";
import QualificationPage from "../../../backend/components/qualification-page";
import { IS_FOR_PREVIOUS_QUALIFICATION } from "../../../layout/headers/menu-data";
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
      {agentUserId && (
        <QualificationPage
          agentUserId={agentUserId}
          applicationType={IS_FOR_PREVIOUS_QUALIFICATION}
        />
      )}
    </>
  );
}

export default dashboard;
