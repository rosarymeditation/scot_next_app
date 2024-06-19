import { useEffect } from "react";
import { useRouter } from "next/router";
import FormPage from "../../../../backend/components/admin/faculty/form";
function update() {
  const router = useRouter();
  const { facultyId } = router.query;

  useEffect(() => {
    if (!facultyId) {
      return;
    }
  }, [facultyId]);
  return <>{facultyId && <FormPage facultyId={facultyId} />}</>;
}

export default update;
