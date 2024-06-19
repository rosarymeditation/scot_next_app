import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { course_data } from "../../data";
import {
  Segment,
  Header,
  Icon,
  Grid,
  Dropdown,
  Form,
  Button,
  Image,
} from "semantic-ui-react";
import Swal from "sweetalert";
// base_code: "NGN";
// conversion_rate: 0.00097416;
// conversion_result: 0.00097416;
// documentation: "https://www.exchangerate-api.com/docs";
// result: "success";
// target_code: "GBP";
const ConversionArea = () => {
  const divRef = useRef(null);
  const scrollToDiv = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    // loadDegreeTypes();
    axios
      .get("https://v6.exchangerate-api.com/v6/40fa65f6ceeb3f0379654ee1/codes")
      .then((response) => {
        // Assuming your JSON data is an array of objects with 'supported_codes' property
        const data = response.data.supported_codes;

        setSupportedCodes(data);
        const codeData = [];

        for (var item of data) {
          var innerItem = item[0];
          var innerItem2 = item[1];
          codeData.push({
            key: innerItem,
            text: innerItem2,
            value: innerItem,
          });
        }
        setCodes(codeData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, "error");
  };
  const coursePerView = 8;

  const [codes, setCodes] = useState([]);

  const [supportedCodes, setSupportedCodes] = useState([]);

  const [from, setFrom] = useState("");
  const [convertedAmt, setConvertedAmt] = useState("");
  const [pairAmt, setPairAmt] = useState("1");
  const [to, setTo] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState("");

  //InstitutionOptions

  const handleFrom = (e, { value, name }) => {
    setFrom(value);
    console.log(value);
  };

  const handleConvert = (pair) => {
    if (to == "" || from == "") {
      showAlert(
        "Invalid Input",
        "Please select 'from' and 'to' currency for conversion"
      );
      return;
    }
    if (to == from) {
      showAlert("Wrong currency pair", "You can't convert same currency");
      return;
    }
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/40fa65f6ceeb3f0379654ee1/pair/${from}/${to}/${pairAmt}`
      )
      .then((response) => {
        const data = response.data;
        setRate(data.conversion_rate);
        setResult(data.conversion_result);
      });
  };
  const handleTo = (e, { value, name }) => {
    setTo(value);
    console.log(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "pairVal") {
      setPairAmt(value);
    } else {
      setConvertedAmt(value);
    }
  };

  return (
    <div className="edu-course-area course-area-1 gap-tb-text">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css"
        integrity="sha512-KXol4x3sVoO+8ZsWPFI/r5KBVB/ssCGB5tsv2nVOKwLg33wTFP3fmnXa47FdSVIshVTgsYk/1734xSk9aFIa4A=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />

      <div className="container">
        <div class="ui attached message">
          <div class="header">
            Currency Converter: Quick & Easy Currency Conversion
          </div>
          <p>
            Seamlessly Convert Currencies for Accurate Transactions and
            Financial Planning
          </p>
        </div>
        <form class="ui form attached fluid segment">
          <div class="fields">
            {" "}
            <div class="four wide field">
              <label>From</label>
              <Dropdown
                onChange={handleFrom}
                name=""
                search
                placeholder="Select currency"
                fluid
                selection
                options={codes}
              />
            </div>
            <div class="four wide field">
              <label>To</label>
              <Dropdown
                onChange={handleTo}
                name=""
                search
                placeholder="Select currency"
                fluid
                selection
                options={codes}
              />
            </div>
            <div class="four wide field">
              <label>.</label>
              <Button
                type="button"
                onClick={() => handleConvert(pairAmt)}
                color="blue"
              >
                Convert
              </Button>
            </div>
          </div>
          <div class="fields">
            <div class="four wide field">
              <input
                onChange={handleChange}
                name="pairVal"
                type="text"
                placeholder="Amount"
                value={pairAmt}
              />
            </div>
            <div class="four wide field">
              <input
                onChange={handleChange}
                name="convertVal"
                type="text"
                value={result}
                placeholder="Result"
              />
            </div>
          </div>
        </form>
        {result && rate && (
          <div class="ui bottom attached info message">
            <p>{`Target Currency: ${from}`}</p>
            <p>{`Base Currency: ${to} `}</p>
            <p>{`Conversion Rate: 1 ${from} = ${rate} ${to} `}</p>
            <p>{`Resulting Amount: ${pairAmt} ${from} = ${result} ${to} `}</p>
          </div>
        )}
        <div class="ui form"></div>

        <br />
        <br />
      </div>
    </div>
  );
};

export default ConversionArea;
