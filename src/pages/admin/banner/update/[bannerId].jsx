import { useEffect } from "react";
import { useRouter } from "next/router";
import FormPage from "../../../../backend/components/admin/banner/form";
function update() {
  const router = useRouter();
  const { bannerId } = router.query;

  useEffect(() => {
    if (!bannerId) {
      return;
    }
  }, [bannerId]);
  return <>{bannerId && <FormPage bannerId={bannerId} />}</>;
}

export default update;
