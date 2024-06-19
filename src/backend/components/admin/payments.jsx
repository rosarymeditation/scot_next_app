import React from "react";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import AdminLayout from "../../AdminLayout";
import { Table, Segment, Icon, Header } from "semantic-ui-react";
import moment from "moment";
import { useRouter } from "next/router";
import {
  DEFAULT_COLOR,
  GET_ALL_USERS_PAYMENTS,
  GET_PAYMENTS_BY_USER,
} from "../../../utils/global";
function Payments({ userId = "" }) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(true);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const limit = 20;
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadInit(search, offset);
  }, []);

  //  hq_grade,
  //     hq_schoolName,
  //     hq_completed,
  //     hq_programmeYear,
  //     postUserId,
  //     qualificationType,
  async function loadInit(search, offset) {
    try {
      setHasLoaded(false);
    
      const result = await GET_ALL_USERS_PAYMENTS({ offset, limit, search });
      // highSchoolName,
      // completionYear,
      const res = result.data.data;
      setPayments(res);
    } catch (err) {
   
    } finally {
      setHasLoaded(true);
    }
  }

  const handleOptionChange = (_, arg) => {
    const value = arg.value;
    setSelectedProgramYear(value);
  };

  return (
    <>
      <AdminLayout>
        <h1>Payment List</h1>
        <div
          className="scrollable-div"
          style={{ backgroundColor: "#E5E4E2", padding: 20, marginBottom: 100 }}
        >
          {payments.length == 0 && (
            <Segment style={{ marginTop: 100 }} textAlign="center" color="blue">
              <h4> No payment made yet!</h4>
              <Icon color="red" size="big" name="frown" />
            </Segment>
          )}
          {payments.length > 0 && (
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Ref Id</Table.HeaderCell>
                  <Table.HeaderCell>Names</Table.HeaderCell>
                  <Table.HeaderCell>Amount</Table.HeaderCell>
                  <Table.HeaderCell> Status</Table.HeaderCell>
                  <Table.HeaderCell>Date </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {payments.map((item) => {
                  return (
                    <Table.Row style={{ cursor: "pointer" }}>
                      <Table.Cell>
                        <b style={{ color: DEFAULT_COLOR }}>
                          <b>{item.refId}</b>
                        </b>
                      </Table.Cell>
                      <Table.Cell>
                        <b style={{ color: DEFAULT_COLOR }}>
                          {item.User?.firstname} {item.User?.lastname}
                        </b>
                      </Table.Cell>
                      <Table.Cell>
                        <b style={{ color: DEFAULT_COLOR }}>{item.amount}</b>
                      </Table.Cell>
                      <Table.Cell>{item.status}</Table.Cell>
                      <Table.Cell>
                        {moment(item.updatedAt).format(
                          "MMMM DD, YYYY HH:mm:ss"
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          )}
          <br />
          <br />
          <br />
          <br />
        </div>
      </AdminLayout>
    </>
  );
}

export default Payments;
