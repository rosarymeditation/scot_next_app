import { useEffect } from "react";
import { useRouter } from "next/router";
import FormPage from "../../../../backend/components/admin/phd/form";
function update() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
  }, [id]);
  return <>{id && <FormPage id={id} />}</>;
}

export default update;
