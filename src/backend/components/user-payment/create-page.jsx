import React from "react";
import styles from "../../admin.module.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import AdminLayout from "../../AdminLayout";
import {
  Button,
  Checkbox,
  Form,
  Segment,
  Select,
  Grid,
  Table,
  TextArea,
  Icon,
  Message,
} from "semantic-ui-react";
import {
  ERROR_TITLE,
  GET_QUALIFICATION_YEAR,
  IS_FOR_HIGHEST_QUALIFICATION,
  VALIDATION_TITLE,
} from "../../../layout/headers/menu-data";
import {
  PAYMENT_URL,
  POST_ALL_PAYMENT_PURPOSE,
  POST_PAYMENT_SAVE,
  REF_ID,
  setCookieAsync,
} from "../../../utils/global";
import { useRouter } from "next/router";
function CreatePage({ userId = "" }) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [name, setName] = useState("");
  const [hasOther, setHasOther] = useState(false);
  const [paymentPurposeLabel, setPaymentPurposeLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [other, setOther] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [userData, setUserData] = useState({});
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedProgramYear, setSelectedProgramYear] = useState("");
  let [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    loadPaymentTypes();
  }, []);

  //  hq_grade,
  //     hq_schoolName,
  //     hq_completed,
  //     hq_programmeYear,
  //     postUserId,
  //     qualificationType,

  async function loadPaymentTypes() {
    const result = await POST_ALL_PAYMENT_PURPOSE();
    const res = result.data.data;

    const paymentOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setPaymentOptions(paymentOptions);
  }
  const handleOptionChange = (_, { text, value, name }) => {
    const textVal = paymentOptions.find((i) => i.id == value);
    if (textVal.text == "Other (specify)") {
      setHasOther(true);
    } else {
      setHasOther(false);
    }
    setSelectedPurpose(value);
    setPaymentPurposeLabel(textVal.text);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
   
    if (name == "amount") {
      setAmount(value);
    } else {
      setOther(value);
    }
  };
  const handleSubmit = async () => {
    setHasSubmitted(false);

    try {
      if (selectedPurpose) {
        if (hasOther && other === "") {
          showAlert(
            VALIDATION_TITLE,
            "Other payment purpose is required once you select 'Other'"
          );
        } else {
          const data = {
            userId,
            amount,
            paymentPurposeId: selectedPurpose,
            other,
            hasOther,
            successUrl: PAYMENT_URL("user/info/success"),
            errorUrl: PAYMENT_URL("user/info/error"),
          };
          const response = await POST_PAYMENT_SAVE(data);
          const { refId, session } = response.data;
          await setCookieAsync(REF_ID, refId);
          window.location.href = session;
         
        }
      }
    } catch (err) {
      showAlert("Error", "Could not save ");
    } finally {
      setHasSubmitted(true);
    }
  };
  const handlePrevious = () => {
    router.back();
  };
  return (
    <>
      <AdminLayout>
        <h1>Payment Page</h1>
        <div
          className="scrollable-div"
          style={{ backgroundColor: "#E5E4E2", padding: 20, marginBottom: 100 }}
        >
          <Message
            attached
            header="Make Payment"
            content="Fill out the form below"
          />
          {/* className="attached fluid segment" */}
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={10}>
                <Button fluid color="green">
                  <Icon name="lock" /> Secure Payment
                </Button>
                <br />
                <br />
                <Form
                  className="attached fluid segment"
                  onSubmit={handleSubmit}
                >
                  <label>Amount</label>
                  <input
                    type="number"
                    className={styles.txtAdmin}
                    min="50"
                    max="20000"
                    step="1"
                    minLength={4}
                    required
                    onChange={handleChange}
                    name="amount"
                    placeholder="Amount"
                  />
                  <Form.Group widths="equal">
                    <Form.Field
                      defaultValue={selectedPurpose}
                      control={Select}
                      options={paymentOptions}
                      name="selectedPurpose"
                      onChange={handleOptionChange}
                      label={{
                        children: "QualificationType",
                        htmlFor: "form-select-control-qualificationType",
                      }}
                      placeholder="Payment Purpose"
                      search
                      searchInput={{
                        id: "form-select-control-qualificationType",
                      }}
                    />
                    <br />
                  </Form.Group>
                  {hasOther && (
                    <TextArea
                      onChange={handleChange}
                      name="other"
                      style={{ height: 100 }}
                    />
                  )}

                  <br />
                  <hr />
                  <br />
                  <br />
                  <Button onClick={handlePrevious} type="button">
                    Back
                  </Button>
                  <Button
                    style={{ float: "right" }}
                    disabled={!hasSubmitted}
                    loading={!hasSubmitted}
                    type="submit"
                    primary
                  >
                    Save & Continue
                  </Button>
                </Form>
              </Grid.Column>
              <Grid.Column width={6}>
                <Button fluid color="black">
                  Order Summary
                </Button>
                <Table singleLine>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Amount</Table.Cell>
                      <Table.Cell>
                        £{amount ? `${amount}.00` : "0.00"}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Payment Purpose</Table.Cell>
                      <Table.Cell>{paymentPurposeLabel}</Table.Cell>
                    </Table.Row>
                    {/* <Table.Row>
                      <Table.Cell>Jill Lewis</Table.Cell>
                      <Table.Cell>May 11, 2014</Table.Cell>
                    </Table.Row> */}
                  </Table.Body>
                </Table>
                <img src="/assets/images/payment.png" />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <br />
          <br />
          <br />
          <br />
        </div>
      </AdminLayout>
    </>
  );
}

export default CreatePage;
