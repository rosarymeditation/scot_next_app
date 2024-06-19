import React from "react";
import QualificationPage from "../../backend/components/qualification-page";
import { IS_FOR_PREVIOUS_QUALIFICATION } from "../../layout/headers/menu-data";
function dashboard() {
  return (
    <>
      <QualificationPage applicationType={IS_FOR_PREVIOUS_QUALIFICATION} />
    </>
  );
}

export default dashboard;
