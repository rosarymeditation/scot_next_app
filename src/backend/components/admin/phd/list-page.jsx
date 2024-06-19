import React from "react";
import styles from "../../../admin.module.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import AdminLayout from "../../../AdminLayout";
import Link from "next/link";

import {
  Button,
  Checkbox,
  Icon,
  Segment,
  Select,
  Table,
  Message,
  Form,
} from "semantic-ui-react";
import { ERROR_TITLE } from "../../../../layout/headers/menu-data";
import {
  DEFAULT_COLOR,
  DELETE_BANNER,
  DELETE_INSTITUTION,
  POST_BANNERS,
  POST_ENGLISH_TEST,
  POST_ENGLISH_TEST_SAVE,
  POST_PHD_APPLICATIONS,
  REQUIRED_MSG,
  URL_BANNER_CREATE,
} from "../../../../utils/global";
import { useRouter } from "next/router";
import { POST_INSTITUTIONS } from "../../../../utils/global";
import { Loader } from "../../../../components/loader";
function ListPage({ agentUserId = "" }) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const [loadingPrev, setLoadingPrev] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [hasLoaded, setHasLoaded] = useState(false);

  const [list, setList] = useState([]);

  useEffect(() => {
    loadInit(offset);
  }, []);

  async function loadInit(offset, search) {
    try {
      const result = await POST_PHD_APPLICATIONS({
        limit,
        offset: offset,
        search,
      });

      const res = result.data.data;
     
      if (res) {
        setList(res);
      }
    } catch (err) {
    
    } finally {
      setHasLoaded(true);
    }
  }

  const handleDelete = (item) => {
    swal({
      title: `Are you sure you want to delete ${item.title}?`,
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      // buttons: true,
      buttons: ["No", "Yes"],

      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await DELETE_BANNER(item.id);
        swal("Banner has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Your banner is intact!");
      }
    });
  };
  const handlePrevious = () => {
    const newOffset = offset - limit;

    if (newOffset <= 0) {
      setOffset(0);
      return;
    }
    setLoadingPrev(true);
    setOffset(newOffset);
    loadInit(offset, search);
    setLoadingPrev(false);
  };
  const handleNext = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    setLoadingNext(true);
    loadInit(offset, search);
    setLoadingNext(false);
  };
  const handleSearch = (evt) => {
    const value = evt.target.value;
    setSearch(value);
    setOffset(0);
    loadInit(offset, value);
  };
  return (
    <>
      <AdminLayout>
        {!hasLoaded && <Loader />}
        {hasLoaded && (
          <>
            <h1>PhD Applications</h1>
            <div
              className="scrollable-div text-end"
              style={{
                backgroundColor: "#E5E4E2",
                padding: 20,
                marginBottom: 100,
              }}
            >
              <Form>
                {" "}
                <Form.Group widths="equal">
                  <Form.Field>
                    <input
                      onKeyUp={handleSearch}
                      style={{ height: 40 }}
                      placeholder="Search by names, phone, email or phone"
                    />
                  </Form.Field>
                </Form.Group>
              </Form>

              {list.length > 0 && (
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Phone</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {list.map((item) => {
                     

                      return (
                        <Table.Row style={{ cursor: "pointer" }}>
                          <Table.Cell>
                            <b style={{ color: DEFAULT_COLOR }}>
                              {`${item.firstname} ${item.middlename} ${item.lastname}`}
                            </b>
                          </Table.Cell>

                          <Table.Cell>
                            <b style={{ color: DEFAULT_COLOR }}>{item.email}</b>
                          </Table.Cell>
                          <Table.Cell>
                            <b style={{ color: DEFAULT_COLOR }}>{item.phone}</b>
                          </Table.Cell>

                          <Table.Cell>
                            <Button
                              size="mini"
                              color="green"
                              href={`/admin/phd/view/${item.id}`}
                              as="a"
                            >
                              {` View   `} <Icon name="edit" />
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              )}
              <Message style={{ height: 60 }} floating>
                <Button
                  onClick={handlePrevious}
                  disabled={offset == 0}
                  type="button"
                  color="blue"
                  style={{ float: "left" }}
                  loading={loadingPrev}
                >
                  Back
                </Button>
                <Button
                  disabled={list.length < limit}
                  onClick={handleNext}
                  style={{ float: "right" }}
                  type="button"
                  color="blue"
                  loading={loadingNext}
                >
                  Next
                </Button>
              </Message>
              <br />
              <br />
              <br />
              <br />
            </div>
          </>
        )}
      </AdminLayout>
    </>
  );
}

export default ListPage;
