import { useEffect } from "react";
import { useRouter } from "next/router";
import FormPage from "../../../../backend/components/admin/institution/form";
function update() {
  const router = useRouter();
  const { institutionId } = router.query;

  useEffect(() => {
    if (!institutionId) {
      return;
    }
  }, [institutionId]);
  return <>{institutionId && <FormPage institutionId={institutionId} />}</>;
}

export default update;
