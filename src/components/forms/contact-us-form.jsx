import React, { useState } from "react";
import Swal from "sweetalert";
import { sendEmail2 } from "../../utils/global";

const Result = () => {
  return (
    <p
      className="success-message"
      style={{ color: "#034694", marginTop: "20px", marginBottom: "0" }}
    >
      Thanks for your query. We will contact with you soon.
    </p>
  );
};

const ContactUsForm = () => {
  const [result, setResult] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const showAlert = (title, msg, isError = true) => {
    Swal(title, msg, isError ? "error" : "success");
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "name") {
      setName(value);
    } else if (name == "phone") {
      setPhone(value);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "message") {
      setMessage(value);
    }
  };
  const sendEmail = (e) => {
    e.preventDefault();
    setHasSubmitted(false);
    console.log(email);
    const templateParams = {
      // Replace with the parameters specific to your email template
      to_name: "ScotStudy",
      message: message,
      from_name: name,
      from_email: email,
      from_phone: phone,
    };
    sendEmail2(templateParams)
      .then((response) => {
        console.log(response);
        e.target.reset();
        setResult(true);
        showAlert("SUCCESS", "Email sent successfully!", false);
      })
      .catch((error) => {
        showAlert("Error", "Email did not send", true);
        console.error("Error sending email:", error);
      })
      .finally(() => {
        setHasSubmitted(true);
      });
    // emailjs
    //   .sendForm(
    //     "service_cdy06og",
    //     "template_tymxnny",
    //     e.target,
    //     "hsr1SHaQFUNQAvBJx"
    //   )
    //   .then(
    //     (result) => {
    //       ppp;.result.text);
    //     },
    //     (error) => {
    //       -error.text);
    //     }
    //   );
  };

  setTimeout(() => {
    setResult(false);
  }, 5000);

  return (
    <form
      className="rnt-contact-form rwt-dynamic-form"
      action=""
      onSubmit={sendEmail}
    >
      <div className="row row--10">
        <div className="form-group col-12">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Your name*"
            required
          />
        </div>
        <div className="form-group col-12">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email*"
            required
          />
        </div>
        <div className="form-group col-12">
          <input
            required
            onChange={handleChange}
            type="tel"
            name="phone"
            placeholder="Phone number"
          />
        </div>
        <div className="form-group col-12">
          <textarea
            required
            name="message"
            onChange={handleChange}
            cols="30"
            rows="4"
            placeholder="Your message"
          ></textarea>
        </div>
        <div className="form-group col-12">
          <button
            className="rn-btn edu-btn btn-medium submit-btn"
            name="submit"
            type="submit"
          >
            {!hasSubmitted && (
              <span
                class="spinner-border spinner-border-lg"
                role="status"
                aria-hidden="true"
              ></span>
            )}{" "}
            Submit Message <i className="icon-4"></i>
          </button>
        </div>
        {result ? (
          <div className="form-group">
            <Result />
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default ContactUsForm;
