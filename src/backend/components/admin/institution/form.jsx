import React from "react";
import styles from "../../../admin.module.css";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert";
import AdminLayout from "../../../AdminLayout";
import { Button, Form, Select, TextArea, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Loader } from "../../../../components/loader";
import {
  POST_CITIES,
  POST_COUNTRIES,
  POST_GET_INSTITUTION_BY_ID,
  POST_INSTITUTION_SAVE,
  REQUIRED_MSG,
  URL_INSTITUTION_LIST,
} from "../../../../utils/global";
import { VALIDATION_TITLE } from "../../../../layout/headers/menu-data";
import { setLocale } from "yup";
function FormPage({ institutionId = "" }) {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };

  const [id, setId] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [sellingPoint, setSellingPoint] = useState("");
  const [selectedLogo, setSelectedLogo] = useState("");
  const [selectedBanner, setSelectedBanner] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [previewLogoURL, setPreviewLogoURL] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  let [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    loadCountries();
    if (institutionId) {
      loadInstitution();
    } else {
      setHasLoaded(true);
    }
  }, []);

  async function loadCountries() {
    const result = await POST_CITIES();
    const res = result.data.data;

    cityOptions = res.map((item) => {
      return {
        key: item.id,
        text: item.name,
        value: item.id,
        id: item.id,
      };
    });

    setCityOptions(cityOptions);
  }
  async function loadInstitution() {
    const result = await POST_GET_INSTITUTION_BY_ID(institutionId);
    const res = result.data.data;
    const { name, sellingPoint, about, logo, banner, cityId } = res;
    setHasLoaded(true);
    if (res) {
      setName(name);
      setSellingPoint(sellingPoint);
      setAbout(about);
      setPreviewURL(banner);
      setPreviewLogoURL(logo);
      setSelectedCity(cityId);
    }
  }

  const handleOptionChange = (_, arg) => {
    const value = arg.value;

    setSelectedCity(value);
  };
  const handlePrevious = () => {
    router.back();
  };
  const handleChange = (event, data) => {
    const value = data.value;
    const name = data.name;
    if (name == "name") {
      setName(value);
    } else if (name == "about") {
      setAbout(value);
    } else if (name == "sellingPoint") {
      setSellingPoint(value);
    }
  };
  const handleBannerSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedBanner(selectedFile);
    const imageURL = URL.createObjectURL(selectedFile);
    setPreviewURL(imageURL);
  };
  const handleLogoSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedLogo(selectedFile);
    const imageURL = URL.createObjectURL(selectedFile);
    setPreviewLogoURL(imageURL);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (!institutionId) {
      if (selectedLogo == "") {
        showAlert(VALIDATION_TITLE, REQUIRED_MSG("Logo"));
        return;
      }
      if (selectedBanner == "") {
        showAlert(VALIDATION_TITLE, REQUIRED_MSG("Banner"));
        return;
      }
    }
    if (selectedCity == "") {
      showAlert(VALIDATION_TITLE, REQUIRED_MSG("City"));
      return;
    }

    setHasSubmitted(false);
    formData.append("id", institutionId || "");
    formData.append("logo", selectedLogo);
    formData.append("cityId", selectedCity);
    formData.append("banner", selectedBanner);
    formData.append("name", name);
    formData.append("sellingPoint", sellingPoint);
    formData.append("about", about);

    try {
      const result = await POST_INSTITUTION_SAVE(formData);
    
      const res = result.data;
      if (res.error) {
        showAlert("Error", "Could not save ");
      } else {
        router.push(URL_INSTITUTION_LIST);
      }
    } catch (err) {
    } finally {
      setHasSubmitted(true);
    }
  };

  return (
    <>
      <AdminLayout>
        {!hasLoaded && <Loader />}
        {hasLoaded && (
          <>
            <h1>{institutionId ? `Update ` : `Create `} Institution</h1>
            <div
              className="scrollable-div"
              style={{
                backgroundColor: "#E5E4E2",
                padding: 20,
                marginBottom: 100,
              }}
            >
              <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                  {hasLoaded && (
                    <Form.Field
                      defaultValue={selectedCity}
                      control={Select}
                      options={cityOptions}
                      name="city"
                      onChange={handleOptionChange}
                      label={{
                        children: "City",
                        htmlFor: "form-select-control-city",
                      }}
                      placeholder="City"
                      search
                      searchInput={{ id: "form-select-control-city" }}
                    />
                  )}
                </Form.Group>
                <Form.Input
                  className={styles.txtAdmin}
                  fluid
                  value={name}
                  onChange={handleChange}
                  name="name"
                  label="Name"
                  required
                  placeholder="Name"
                />
                <br />
                <br />
                <Form.Group widths="equal">
                  <Form.Input
                    type="file"
                    onChange={handleLogoSelect}
                    className={styles.txtAdmin}
                    fluid
                    accept=".png,.jpg,.jpeg,.webp"
                    label={`Upload Logo`}
                    placeholder="Banner upload"
                  />
                  <Image
                    circular
                    size="mini"
                    style={{ width: 80, height: 80, objectFit: "fill" }}
                    src={previewLogoURL || "/assets/default_school_logo.png"}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    type="file"
                    onChange={handleBannerSelect}
                    className={styles.txtAdmin}
                    fluid
                    accept=".png,.jpg,.jpeg,.webp"
                    label={`Upload Banner - Ideal size:Width:1600  and Height:900`}
                    placeholder="Banner upload"
                  />
                </Form.Group>
                <br />
                <br />
                <img
                  style={{ width: "100%", height: 400, objectFit: "fill" }}
                  src={previewURL || "/assets/images/bg/bg-image-3.webp"}
                />
                <br />
                <hr />
                <Form.TextArea
                  className={styles.txtAdmin}
                  fluid
                  value={sellingPoint}
                  required
                  onChange={handleChange}
                  name="sellingPoint"
                  label="Selling Point"
                  placeholder="Selling Point"
                />
                <br />
                <br />
                <br />
                <Form.TextArea
                  className={styles.txtAdmin}
                  fluid
                  value={about}
                  onChange={handleChange}
                  name="about"
                  label="About"
                  placeholder="About"
                />
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
                  {institutionId ? `Update` : `Save`}
                </Button>
              </Form>
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

export default FormPage;
