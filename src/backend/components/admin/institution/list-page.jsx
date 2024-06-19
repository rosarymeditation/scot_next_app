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
} from "semantic-ui-react";
import { ERROR_TITLE } from "../../../../layout/headers/menu-data";
import {
  DEFAULT_COLOR,
  DELETE_INSTITUTION,
  POST_ENGLISH_TEST,
  POST_ENGLISH_TEST_SAVE,
  REQUIRED_MSG,
} from "../../../../utils/global";
import { useRouter } from "next/router";
import { POST_INSTITUTIONS } from "../../../../utils/global";
import { Loader } from "../../../../components/loader";
function ListPage({ agentUserId = "" }) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [hasLoaded, setHasLoaded] = useState(false);

  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    loadInit();
  }, []);

  async function loadInit() {
    try {
      const result = await POST_INSTITUTIONS();

      const res = result.data.data;

      if (res) {
        setInstitutions(res);
      }
    } catch (err) {
     
    } finally {
      setHasLoaded(true);
    }
  }

  const handleDelete = (item) => {
    swal({
      title: `Are you sure you want to delete ${item.name}?`,
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      // buttons: true,
      buttons: ["No", "Yes"],

      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await DELETE_INSTITUTION(item.id);
        swal("Insitution has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Your institution is intact!");
      }
    });
  };

  return (
    <>
      <AdminLayout>
        {!hasLoaded && <Loader />}
        {hasLoaded && (
          <>
            <h1>Institutions</h1>
            <div
              className="scrollable-div"
              style={{
                backgroundColor: "#E5E4E2",
                padding: 20,
                marginBottom: 100,
              }}
            >
              <Button href={URL_INSTITUTION_CREATE} as="a" primary>
                Create{" "}
              </Button>
              {institutions.length > 0 && (
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>

                      <Table.HeaderCell></Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {institutions.map((item) => {
                    
                     
                      return (
                        <Table.Row style={{ cursor: "pointer" }}>
                          <Table.Cell>
                            <b style={{ color: DEFAULT_COLOR }}>{item.name}</b>
                          </Table.Cell>

                          <Table.Cell>
                            <Button
                              size="mini"
                              color="green"
                              href={`/admin/institution/update/${item.id}`}
                              as="a"
                            >
                              {` Edit   `} <Icon name="edit" />
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              onClick={() => {
                                handleDelete(item);
                              }}
                              type="button"
                              size="mini"
                              color="red"
                            >
                              Delete <Icon name="trash" />
                            </Button>
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
          </>
        )}
      </AdminLayout>
    </>
  );
}

export default ListPage;
