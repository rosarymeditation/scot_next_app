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
  POST_GET_AGENCIES,
  POST_GET_ALL_AGENCIES,
  POST_GET_APPLICATIONS,
} from "../../../../utils/global";
import { NothingFound } from "../../../../components/no-course-found";
function ListPage() {
  const router = useRouter();

  const [agents, setAgents] = useState([]);

  const limit = 100;
  //activeIndex
  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    const res = await POST_GET_ALL_AGENCIES({ limit });

    setAgents(res.data.data);
  };

  return (
    <>
      <AdminLayout>
        <div style={{ marginTop: 150, marginBottom: 150 }}>
          <Header as="h2" attached="top">
            Agent List
          </Header>
          <Segment attached>
            {agents.length > 0 && (
              <>
                {agents.length > 0 && (
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Names</Table.HeaderCell>
                        <Table.HeaderCell> Email</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Country</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {agents.map((item) => {
                        return (
                          <Table.Row style={{ cursor: "pointer" }}>
                            <Table.Cell>
                              <b style={{ color: DEFAULT_COLOR }}>
                                {`${item?.agencyName}`}
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
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                )}
              </>
            )}
          </Segment>
        </div>
      </AdminLayout>
    </>
  );
}

export default ListPage;
