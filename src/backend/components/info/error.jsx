import React from "react";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import AdminLayout from "../../AdminLayout";

import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { useRouter } from "next/router";
import { REF_ID, UPDATE_PAYMENT, getCookieAsync } from "../../../utils/global";
import Cookies from "js-cookie";
function EnglishTestPage({ agentUserId = "" }) {
  useEffect(() => {
    updatePayment();
  }, []);

  const updatePayment = async () => {
    const refId = await getCookieAsync("refId");
    const data = { refId, status: "Unpaid" };
    const response = await UPDATE_PAYMENT(data);
    Cookies.remove(REF_ID);
  };
  return (
    <>
      <AdminLayout>
        <div style={{ marginTop: 30 }}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Segment placeholder>
            <Header icon>
              <Icon color="red" name="warning circle" />
              Payment error
            </Header>
            <Button as="a" href="/user/dashboard" primary>
              Go to dashboard
            </Button>
          </Segment>
        </div>
      </AdminLayout>
    </>
  );
}

export default EnglishTestPage;
