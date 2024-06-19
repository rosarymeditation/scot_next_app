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
  Select,
  Icon,
  Table,
  Modal,
  Label,
  Accordion,
  Message,
  Header,
} from "semantic-ui-react";
import {
  DEFAULT_COLOR,
  DELETE_APPLICATION,
  POST_GET_APPLICATIONS,
} from "../../../../utils/global";
import { NothingFound } from "../../../../components/no-course-found";
import { Loader } from "../../../../components/loader";
function ListPage() {
  const router = useRouter();
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [applications, setApplications] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [loadingPrev, setLoadingPrev] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const limit = 10;
  //activeIndex
  useEffect(() => {
    loadApplications(offset, search);
  }, []);

  const loadApplications = async (offset, search) => {
    setHasLoaded(false);
    const res = await POST_GET_APPLICATIONS({ offset, search, limit });
    setHasLoaded(true);

    setApplications(res.data.data);
  };
  const handleNext = () => {
    const newOffset = offset + limit;

    setOffset(newOffset);

    loadApplications(newOffset, search);
  };
  const handlePrevious = () => {
    setLoadingPrev(true);
    if (offset <= 0) {
      setOffset(0);
      return;
    }
    const newOffset = offset - limit;
    setOffset(newOffset);
    loadApplications(newOffset, search);
    setLoadingPrev(false);
  };
  const handleSearch = (evt) => {
    const value = evt.target.value;
    setSearch(value);
    setOffset(0);
    loadApplications(0, value);
  };
  const handleDelete = (item) => {
    swal({
      title: `Are you sure you want to delete ${item.refNo}?`,
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      // buttons: true,
      buttons: ["No", "Yes"],

      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await DELETE_APPLICATION(item.id);
        swal("Application has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Application is intact!");
      }
    });
  };
  return (
    <>
      <AdminLayout>
        <>
          <div style={{ marginTop: 150, marginBottom: 150 }}>
            <Header as="h2" attached="top">
              Application List
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
              {!hasLoaded && <Loader />}
              {applications.length == 0 && hasLoaded && (
                <NothingFound>
                  <span>Nothing found</span>
                </NothingFound>
              )}
              {applications.length > 0 && hasLoaded && (
                <>
                  {" "}
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Ref. No.</Table.HeaderCell>
                        <Table.HeaderCell> Names</Table.HeaderCell>
                        <Table.HeaderCell> Email</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Submission Origin</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {applications.map((item) => {
                        return (
                          <Table.Row style={{ cursor: "pointer" }}>
                            <Table.Cell>
                              <b>{item.refNo}</b>
                            </Table.Cell>
                            <Table.Cell>
                              <b style={{ color: DEFAULT_COLOR }}>
                                {`${item?.User?.firstname || "Unknown"} ${
                                  item?.User?.middlename || ""
                                } ${item?.User?.lastname || "Unknown"}`}
                              </b>
                            </Table.Cell>
                            <Table.Cell>
                              <b style={{ color: DEFAULT_COLOR }}>
                                {`${item?.User?.email}`}
                              </b>
                            </Table.Cell>
                            <Table.Cell>
                              {moment(item.updatedAt).format(
                                "MMMM DD, YYYY HH:mm:ss"
                              )}
                            </Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                            {item.User.Agent && (
                              <Table.Cell>
                                {item.User.Agent?.agencyName}
                              </Table.Cell>
                            )}
                            {!item.User.Agent && (
                              <Table.Cell>Individual</Table.Cell>
                            )}
                            <Table.Cell>
                              <Button
                                as="a"
                                href={`/user/application-details/${item.id}`}
                                size="mini"
                                color="green"
                              >
                                <Icon name="file" /> View Applications
                              </Button>{" "}
                            </Table.Cell>
                            <Table.Cell>
                              <a onClick={() => handleDelete(item)}>
                                <Icon name="trash" color="red" />
                              </a>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
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
                      disabled={applications.length < limit}
                      onClick={handleNext}
                      style={{ float: "right" }}
                      type="button"
                      color="blue"
                      loading={loadingNext}
                    >
                      Next
                    </Button>
                  </Message>
                </>
              )}
            </Segment>
          </div>
        </>
      </AdminLayout>
    </>
  );
}

export default ListPage;
