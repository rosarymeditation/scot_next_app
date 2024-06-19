import { useEffect } from "react";
import { useRouter } from "next/router";
import FormPage from "../../../../backend/components/admin/course/form";
function update() {
  const router = useRouter();
  const { courseId } = router.query;

  useEffect(() => {
    if (!courseId) {
      return;
    }
  }, [courseId]);
  return <>{courseId && <FormPage courseId={courseId} />}</>;
}

export default update;
