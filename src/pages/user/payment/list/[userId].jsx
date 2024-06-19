import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ListPage from "../../../../backend/components/user-payment/list-page";
function dashboard() {
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (!userId) {
      return;
    }
  }, [userId]);
  return <>{userId && <ListPage userId={userId} />}</>;
}

export default dashboard;
