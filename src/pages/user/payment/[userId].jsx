import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CreatePage from "../../../backend/components/user-payment/create-page";
function dashboard() {
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (!userId) {
      return;
    }
  }, [userId]);
  return <>{userId && <CreatePage userId={userId} />}</>;
}

export default dashboard;
