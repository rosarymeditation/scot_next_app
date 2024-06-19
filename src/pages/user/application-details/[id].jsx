import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ApplicationPage from "../../../backend/components/application-page";
import ApplicationDetailPage from "../../../backend/components/application-detail-page";
import { POST_APPLICATION_ID } from "../../../utils/global";
function getId() {
  const router = useRouter();
  const { id } = router.query;
  const [application, setApplication] = useState({});

  useEffect(() => {
    if (!id) {
      return;
    }
  }, [id]);

  return <>{id && <ApplicationDetailPage id={id} />}</>;
}

export default getId;
