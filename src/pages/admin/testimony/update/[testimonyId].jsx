import { useEffect } from "react";
import { useRouter } from "next/router";
import FormPage from "../../../../backend/components/admin/testimony/form";
function update() {
  const router = useRouter();
  const { testimonyId } = router.query;

  useEffect(() => {
    if (!testimonyId) {
      return;
    }
  }, [testimonyId]);
  return <>{testimonyId && <FormPage testimonyId={testimonyId} />}</>;
}

export default update;
