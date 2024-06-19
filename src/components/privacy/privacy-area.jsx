import React from "react";
import { useState, useEffect, useRef } from "react";
const PrivacyArea = () => {
  const divRef = useRef(null);
  const scrollToDiv = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToDiv();
  }, []);
  return (
    <section ref={divRef} className="privacy-policy-area terms-condition-area">
      <div className="container">
        <div className="row row--30">
          <div className="col-lg-12">
            <div className="privacy-policy terms-condition">
              <div className="text-block">
                <h3 className="title">Privacy Policy for ScotStudy</h3>
                <p>
                  At ScotStudy, we are committed to protecting the privacy and
                  confidentiality of our users. This Privacy Policy outlines how
                  we collect, use, and safeguard your personal information when
                  you visit our website or use our services. By accessing and
                  using ScotStudy, you consent to the terms outlined in this
                  Privacy Policy.
                </p>
              </div>

              <div className="text-block">
                <h4 className="title">Information Collection:</h4>

                <p>
                  Personal Information: We may collect personal information such
                  as your name, email address, phone number, and other relevant
                  details when you voluntarily provide it to us during
                  registration, inquiries, or account setup.
                </p>
                <p>
                  Usage Information: We automatically collect certain
                  non-personal information about your interaction with our
                  website, including IP address, browser type, operating system,
                  and browsing activity. This information is used to improve our
                  services and enhance your user experience.
                </p>
              </div>

              <div className="text-block">
                <h4 className="title">Use of Information:</h4>

                <p>
                  Personalization and Communication: We may use your personal
                  information to personalize your experience, respond to your
                  inquiries, provide requested services, and communicate
                  important updates or information regarding ScotStudy.
                </p>
                <p>
                  Analytics and Improvements: We utilize non-personal
                  information to analyze website trends, track user engagement,
                  and improve our website's functionality and content.
                </p>
                <p>
                  Legal Compliance: We may disclose your information if required
                  by law or in response to a valid legal request.
                </p>
              </div>

              <div className="text-block">
                <h4 className="title">Information Sharing:</h4>
                <p>
                  Third-Party Service Providers: We may share your personal
                  information with trusted third-party service providers who
                  assist us in delivering our services, such as email
                  communication, website analytics, and hosting.
                  <br /> <br />
                  Affiliates and Partners: With your consent, we may share your
                  information with our affiliates and trusted partners to offer
                  additional relevant services or educational opportunities.{" "}
                  <br /> <br /> Anonymized Aggregated Data: We may share
                  aggregated and anonymized data for research, marketing, or
                  statistical purposes.
                </p>
              </div>
              <div className="text-block">
                <h4 className="title">Data Security:</h4>
                <p>
                  We employ industry-standard security measures to protect your
                  personal information from unauthorized access, misuse, or
                  alteration. However, please note that no method of data
                  transmission over the internet or electronic storage is 100%
                  secure.
                  <br /> <br />
                  We will retain your personal information for as long as
                  necessary to fulfill the purposes outlined in this Privacy
                  Policy, unless a longer retention period is required or
                  permitted by law.
                </p>
              </div>

              <div className="text-block">
                <h4 className="title">Third-Party Links:</h4>
                <p>
                  Our website may contain links to third-party websites or
                  services that are not operated by ScotStudy. We are not
                  responsible for the privacy practices or content of these
                  third-party websites. We recommend reviewing their respective
                  privacy policies.
                </p>
              </div>
              <div className="text-block">
                <h4 className="title">Children's Privacy:</h4>
                <p>
                  ScotStudy is not intended for use by individuals under the age
                  of 16. We do not knowingly collect personal information from
                  children. If we become aware of any personal information
                  collected from children without parental consent, we will take
                  appropriate steps to delete it.
                </p>
              </div>
              <div className="text-block">
                <h4 className="title">Updates to the Privacy Policy:</h4>
                <p>
                  We may update this Privacy Policy periodically to reflect any
                  changes to our information practices. We encourage you to
                  review this policy regularly for the most up-to-date
                  information.
                </p>
                <br />
                <br />
                <p>
                  If you have any questions or concerns about our Privacy
                  Policy, please contact us at info@scotstudy.co.uk. Your
                  privacy is important to us, and we will make every effort to
                  address your inquiries in a timely and satisfactory manner.
                  <br />
                  <br />
                  Last updated: 09/07/2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyArea;
