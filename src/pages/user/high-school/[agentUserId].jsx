import { useEffect } from "react";
import { useRouter } from "next/router";
import HighSchoolPage from "../../../backend/components/high-school-page";
function highSchool() {
  const router = useRouter();
  const { agentUserId } = router.query;

  useEffect(() => {
    if (!agentUserId) {
      return;
    }
  }, [agentUserId]);
  return <>{agentUserId && <HighSchoolPage agentUserId={agentUserId} />}</>;
}

export default highSchool;
