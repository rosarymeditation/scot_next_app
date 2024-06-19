import React from "react";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import Link from "next/link";
import AdminLayout from "../../../AdminLayout";
import { useRouter } from "next/router";
import moment from "moment";
import {
  Button,
  Checkbox,
  Form,
  Segment,
  Table,
  Message,
  Header,
} from "semantic-ui-react";
import {
  DEFAULT_COLOR,
  PATCH_VERIFY_EMAIL_MANUALLY,
  POST_GET_APPLICATIONS,
  POST_GET_USERS,
} from "../../../../utils/global";
import { NothingFound } from "../../../../components/no-course-found";
function ListPage() {
  const router = useRouter();
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loadingPrev, setLoadingPrev] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const limit = 10;
  //activeIndex
  useEffect(() => {
    loadUsers(offset, search);
  }, []);

  const loadUsers = async (offset, search) => {
    const res = await POST_GET_USERS({ offset, search, limit });

    setUsers(res.data.data);
    setHasLoaded(true);
  };
  const handleNext = () => {
    const newOffset = offset + limit;

    setOffset(newOffset);

    loadUsers(newOffset, search);
  };
  const handlePrevious = () => {
    setLoadingPrev(true);
    if (offset <= 0) {
      setOffset(0);
      return;
    }
    const newOffset = offset - limit;
    setOffset(newOffset);
    loadUsers(newOffset, search);
    setLoadingPrev(false);
  };

  const handleVerify = async (user) => {
    console.log(user);
    const result = await PATCH_VERIFY_EMAIL_MANUALLY(user.id, {
      val: user.hasEmailVerified,
    });
    console.log(result.data.error);
    if (!result.data.error) {
      setUsers((prevItems) =>
        prevItems.map((item) =>
          item.id === user.id
            ? { ...item, hasEmailVerified: !user.hasEmailVerified }
            : item
        )
      );
    }
    //const res = result.data.data;
    // setInstitutionOptions(institutionOptions);
  };
  const handleSearch = (evt) => {
    const value = evt.target.value;
    setSearch(value);
    setOffset(0);
    loadUsers(0, value);
  };
  const smile = (
    <span>
      {" "}
      Yes{"  "}
      <img
        style={{ height: 25, width: 25 }}
        src="/assets/images/smile.png"
      ></img>
    </span>
  );
  const sad = (
    <span>
      No{"  "}
      <img style={{ height: 25, width: 25 }} src="/assets/images/sad.png"></img>
    </span>
  );
  return (
    <>
      <AdminLayout>
        {hasLoaded && (
          <>
            <>
              <div style={{ marginTop: 150, marginBottom: 150 }}>
                <Header as="h2" attached="top">
                  User List
                </Header>
                <Segment attached>
                  <Message>
                    <Form>
                      <Form.Field>
                        <label>Search</label>
                        <input
                          onKeyUp={handleSearch}
                          style={{ height: 40 }}
                          placeholder="Search by first name, last name or email"
                        />
                      </Form.Field>
                    </Form>
                  </Message>

                  {users.length > 0 && (
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Names</Table.HeaderCell>
                          <Table.HeaderCell> Email</Table.HeaderCell>
                          <Table.HeaderCell>Phone</Table.HeaderCell>
                          <Table.HeaderCell>Date</Table.HeaderCell>
                          <Table.HeaderCell>Country</Table.HeaderCell>
                          <Table.HeaderCell>Type</Table.HeaderCell>
                          <Table.HeaderCell>Has Applied?</Table.HeaderCell>
                          <Table.HeaderCell>
                            Email Verification
                          </Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {users.map((item) => {
                          return (
                            <Table.Row style={{ cursor: "pointer" }}>
                              <Table.Cell>
                                <b style={{ color: DEFAULT_COLOR }}>
                                  {`${item?.firstname || "Unknown"} ${
                                    item?.middlename || ""
                                  } ${item?.lastname || "Unknown"}`}
                                </b>
                              </Table.Cell>
                              <Table.Cell>
                                <b style={{ color: DEFAULT_COLOR }}>
                                  {`${item.email}`}
                                </b>
                              </Table.Cell>
                              <Table.Cell>{item.phone}</Table.Cell>
                              <Table.Cell>
                                {moment(item.updatedAt).format(
                                  "MMMM DD, YYYY HH:mm:ss"
                                )}
                              </Table.Cell>

                              <Table.Cell>{item.country?.name}</Table.Cell>
                              <Table.Cell>
                                {item.Agent?.agencyName || "Individual"}
                              </Table.Cell>
                              <Table.Cell>
                                {item?.Applications?.length > 0 ? "YES" : "NO"}
                              </Table.Cell>
                              <Table.Cell>
                                {item.hasEmailVerified ? smile : sad}
                              </Table.Cell>
                              <Table.Cell>
                                <Checkbox
                                  toggle
                                  label={
                                    item.hasEmailVerified
                                      ? "Un-verify"
                                      : "Verify"
                                  }
                                  checked={item.hasEmailVerified}
                                  onChange={() => handleVerify(item)}
                                />
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  )}

                  {users.length > 0 && (
                    <Message floating>
                      <Button
                        onClick={handlePrevious}
                        disabled={offset == 0}
                        type="button"
                        color="blue"
                        loading={loadingPrev}
                      >
                        Back
                      </Button>
                      <Button
                        disabled={users.length < limit}
                        onClick={handleNext}
                        style={{ float: "right" }}
                        type="button"
                        color="blue"
                        loading={loadingNext}
                      >
                        Next
                      </Button>
                    </Message>
                  )}
                  {users.length == 0 && (
                    <NothingFound>
                      <p>Nothing found</p>
                    </NothingFound>
                  )}
                </Segment>
              </div>
            </>
          </>
        )}
      </AdminLayout>
    </>
  );
}

export default ListPage;
