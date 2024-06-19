import React from "react";
import styles from "../admin.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert";
import { useFormik } from "formik";
import { userSchema } from "../../utils/validation-schema";
import Cookies from "js-cookie";
import AdminLayout from "../AdminLayout";
import ErrorMsg from "../../components/forms/error-msg";
import {
  Button,
  Checkbox,
  Form,
  Segment,
  Select,
  Input,
  Message,
} from "semantic-ui-react";
import { ERROR_TITLE } from "../../layout/headers/menu-data";
import {
  GLOBAL_URL,
  POST_COUNTRIES,
  POST_PROFILE_SAVE,
  POST_USER_PROFILE,
  SIGN_IN_URL,
  TOKEN,
  getCookieAsync,
} from "../../utils/global";
import { useRouter } from "next/router";
function UserInfoPage({ agentUserId = "" }) {
  const router = useRouter();
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const [countries, setCountries] = useState([]);
  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedMarital, setSelectedMarital] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const [hasClicked, setHasClicked] = useState(true);
  const [user, setUser] = useState({});
  let [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    loadProfile();
    loadCountries();
  }, []);
  async function loadCountries() {
    const result = await POST_COUNTRIES();
    const res = result.data.data;

    countryOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setCountryOptions(countryOptions);
  }

  async function loadProfile() {
    const token = await getCookieAsync(TOKEN);
    if (!token) {
      router.push(SIGN_IN_URL);
    }
    const result = await POST_USER_PROFILE();

    setHasLoaded(true);
    const res = result.data;

    if (res) {
      const user = res;
      setId(user.id);
      setEmail(user.email);
      setPhone(user.phone);
      setUserName(user.username);
      setFirstName(user.firstname);
      setMiddleName(user.middlename);
      setLastName(user.lastname);
      setHomeAddress(user.homeAddress);
      setPostalAddress(user.postalAddress);
      setSelectedCountry(user.countryId);
      setSelectedGender(user.gender);
      setSelectedMarital(user.marital);
    }
  }
  const options = [
    { key: "m", text: "Male", value: "Male" },
    { key: "f", text: "Female", value: "Female" },
  ];
  const maritalOptions = [
    { key: "s", text: "Single", value: "Single" },
    { key: "m", text: "Married", value: "Married" },
  ];

  const handleOptionChange = (event, arg) => {
    const name = arg.name;
    const value = arg.value;

    if (name == "country") {
      setSelectedCountry(value);
    } else if (name == "gender") {
      setSelectedGender(value);
    } else if (name == "marital") {
      setSelectedMarital(value);
    }
  };

  const handleChange = (event, data) => {
    const name = data.name;
    const value = data.value;

    if (name == "firstName") {
      setFirstName(value);
    } else if (name == "middleName") {
      setMiddleName(value);
    } else if (name == "lastName") {
      setLastName(value);
    } else if (name == "phone") {
      setPhone(value);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "userName") {
      setUserName(value);
    } else if (name == "homeAddress") {
      setHomeAddress(value);
    } else if (name == "postalAddress") {
      setPostalAddress(value);
    }
  };
  const handleSubmit = async () => {
    if (!selectedGender) {
      showAlert(ERROR_TITLE, "Please select gender");
      return;
    } else if (!selectedMarital) {
      showAlert(ERROR_TITLE, "Please select marital");
      return;
    } else if (!selectedCountry) {
      showAlert(ERROR_TITLE, "Please select country");
      return;
    }
    setHasSubmitted(false);
    const data = {
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      email: email,
      gender: selectedGender,
      marital: selectedMarital,
      countryId: selectedCountry,
      phone: phone,
      dob: "",
      postalAddress: postalAddress,
      homeAddress: homeAddress,
      username: userName,
      agentUserId,
    };

    const result = await POST_PROFILE_SAVE(data);
    const res = result.data;
    if (res.error) {
      console.log("Error in submission");
    } else {
      router.push(`/user/qualification`);
    }

    // axios
    //   .post(`/user/update`, data, {
    //     headers: {
    //       Authorization: `Bearer ${Cookies.get("token")}`,
    //     },
    //   })
    //   .then((result) => {
    //     // setCountryOptions(countryOptions);
    //   });
  };
  const handleSave = async () => {
    setHasClicked(false);
    if (!selectedGender) {
      showAlert(ERROR_TITLE, "Please select gender");
      return;
    } else if (!selectedMarital) {
      showAlert(ERROR_TITLE, "Please select marital");
      return;
    } else if (!selectedCountry) {
      showAlert(ERROR_TITLE, "Please select country");
      return;
    }
    const data = {
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      email: email,
      gender: selectedGender,
      marital: selectedMarital,
      countryId: selectedCountry,
      phone: phone,
      dob: "",
      postalAddress: postalAddress,
      homeAddress: homeAddress,
      username: userName,
      agentUserId,
    };

    const result = await POST_PROFILE_SAVE(data);
    const res = result.data;
    if (res.error) {
      console.log("Error in submission");
    } else {
      router.push(`/user/dashboard`);
    }
  };
  return (
    <>
      <AdminLayout>
        <h1>User Profile</h1>
        <div
          className="scrollable-div"
          style={{ backgroundColor: "#E5E4E2", padding: 20, marginBottom: 100 }}
        >
          <Message
            attached
            header="User Profile"
            content="Fill out the form below"
          />
          <Form className="attached fluid segment" onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Field
                required={true}
                readOnly
                control={Input}
                value={userName}
                className={styles.txtAdmin}
                onChange={handleChange}
                name="userName"
                label="Username"
                placeholder="Username"
              />

              <Form.Field
                required={true}
                control={Input}
                onChange={handleChange}
                name="email"
                value={email}
                label="Email"
                placeholder="Email"
              />

              <Form.Field
                required={true}
                control={Input}
                onChange={handleChange}
                name="phone"
                label="Phone"
                value={phone}
                placeholder="Phone"
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input
                required={true}
                className={styles.txtAdmin}
                fluid
                onChange={handleChange}
                value={firstName}
                name="firstName"
                label="First name"
                placeholder="First name"
              />
              <br />
              <Form.Input
                className={styles.txtAdmin}
                fluid
                onChange={handleChange}
                value={middleName}
                name="middleName"
                label="Middle name"
                placeholder="Middle name"
              />
              <br />
              <Form.Input
                required={true}
                className={styles.txtAdmin}
                fluid
                onChange={handleChange}
                value={lastName}
                name="lastName"
                label="Last name"
                placeholder="Last name"
              />
              <br />
            </Form.Group>
            <br />
            <br />
            <Form.Group widths="equal">
              {countryOptions.length > 0 && (
                <Form.Field
                  defaultValue={selectedCountry}
                  control={Select}
                  options={countryOptions}
                  name="country"
                  onChange={handleOptionChange}
                  label={{
                    children: "Country",
                    htmlFor: "form-select-control-country",
                  }}
                  placeholder="Country"
                  search
                  searchInput={{ id: "form-select-control-country" }}
                />
              )}
              <br />
              {hasLoaded && (
                <Form.Field
                  defaultValue={selectedMarital}
                  control={Select}
                  options={maritalOptions}
                  name="marital"
                  onChange={handleOptionChange}
                  label={{
                    children: "Marital",
                    htmlFor: "form-select-control-gender",
                  }}
                  placeholder="Marital"
                  search
                  searchInput={{ id: "form-select-control-gender" }}
                />
              )}
              <br />
              {hasLoaded && (
                <Form.Field
                  defaultValue={selectedGender}
                  control={Select}
                  options={options}
                  onChange={handleOptionChange}
                  name="gender"
                  label={{
                    children: "Gender",
                    htmlFor: "form-select-control-gender",
                  }}
                  placeholder="Gender"
                  search
                  searchInput={{ id: "form-select-control-gender" }}
                />
              )}
              <br />
            </Form.Group>
            <br />
            <Form.Group widths="equal">
              <Form.Input
                required={true}
                className={styles.txtAdmin}
                fluid
                onChange={handleChange}
                value={homeAddress}
                name="homeAddress"
                label="Home address"
                placeholder="Home address"
              />
              <br />
              <Form.Input
                required={true}
                className={styles.txtAdmin}
                fluid
                onChange={handleChange}
                value={postalAddress}
                name="postalAddress"
                label="Postal Address"
                placeholder="Postal Address"
              />
            </Form.Group>
            <br />
            <hr />
            <br />
            <br />

            <Button
              loading={!hasClicked}
              disabled={!hasClicked}
              onClick={handleSave}
              type="button"
              primary
            >
              Save & Return To Dashboard
            </Button>
            <Button
              style={{ float: "right" }}
              loading={!hasSubmitted}
              disabled={!hasSubmitted}
              type="submit"
              primary
            >
              Proceed with application
            </Button>
          </Form>
          <br />
          <br />
          <br />
          <br />
        </div>
      </AdminLayout>
    </>
  );
}

export default UserInfoPage;
