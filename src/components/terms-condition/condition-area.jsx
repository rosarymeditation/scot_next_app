import React from "react";
import SidebarOne from "../common/sidebar/blog-sidebar-1";
import { useEffect, useRef } from "react";
const ConditionArea = () => {
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
                <h3 className="title">Terms and Conditions for ScotStudy</h3>
                <p>
                  Please read these Terms and Conditions carefully before using
                  the ScotStudy website and services specifically related to
                  studying in Scotland. Your access to and use of the service is
                  conditioned on your acceptance of and compliance with these
                  terms. By accessing or using the ScotStudy website, you agree
                  to be bound by these Terms and Conditions. If you disagree
                  with any part of these terms, you may not access the website
                  or use the services.
                </p>
              </div>

              <div className="text-block">
                <h4 className="title">Services and Eligibility:</h4>

                <p>
                  ScotStudy provides information and assistance for individuals
                  interested in studying in Scotland. The services are available
                  to individuals who are of legal age to form a binding contract
                  or have obtained parental/guardian consent.
                </p>
              </div>

              <div className="text-block">
                <h4 className="title">Information Accuracy and Updates:</h4>

                <p>
                  The information provided on the ScotStudy website is for
                  general informational purposes only. While we strive to ensure
                  the accuracy and currency of the information, we make no
                  representations or warranties of any kind, express or implied,
                  regarding the completeness, reliability, suitability, or
                  availability of the information.
                </p>
                <p>
                  ScotStudy reserves the right to update or modify the
                  information on the website at any time without prior notice.
                </p>
              </div>

              <div className="text-block">
                <h4 className="title">Personal Responsibility:</h4>
                <p>
                  It is your responsibility to verify the accuracy and relevance
                  of the information provided on the ScotStudy website and to
                  make informed decisions based on your individual circumstances
                  and needs.
                  <br /> <br />
                  ScotStudy shall not be held liable for any damages or losses
                  resulting from the reliance on the information provided on the
                  website.
                </p>
              </div>
              <div className="text-block">
                <h4 className="title">Third-Party Services and Links:</h4>
                <p>
                  The ScotStudy website may contain links to third-party
                  websites or services that are not owned or controlled by
                  ScotStudy. We do not endorse or assume responsibility for the
                  content, privacy policies, or practices of any third-party
                  websites or services. You access and use such third-party
                  websites or services at your own risk.
                </p>
              </div>

              <div className="text-block">
                <h4 className="title">Intellectual Property:</h4>
                <p>
                  The content on the ScotStudy website, including text,
                  graphics, logos, and images, is protected by intellectual
                  property laws and is the property of ScotStudy or its
                  licensors. You may not use, reproduce, modify, or distribute
                  any content without prior written consent.
                </p>
              </div>
              <div className="text-block">
                <h4 className="title">Privacy:</h4>
                <p>
                  Your privacy is important to us. Please refer to our Privacy
                  Policy for information on how we collect, use, and protect
                  your personal information.
                </p>
              </div>
              <div className="text-block">
                <h4 className="title">Limitation of Liability:</h4>
                <p>
                  ScotStudy shall not be liable for any direct, indirect,
                  incidental, special, consequential, or exemplary damages
                  resulting from your use or inability to use the website or
                  services, including but not limited to damages for loss of
                  profits, data, or other intangible losses.
                </p>
              </div>
              <div className="text-block">
                <h4 className="title">Governing Law and Jurisdiction:</h4>
                <p>
                  These Terms and Conditions shall be governed by and construed
                  in accordance with the laws of Scotland. Any disputes arising
                  out of or in connection with these terms shall be subject to
                  the exclusive jurisdiction of the Scottish courts.
                </p>
                <br />
                <br />
                <p>
                  If you have any questions or concerns regarding these Terms
                  and Conditions, please contact us at info@scotstudy.co.uk.
                  Your continued use of the ScotStudy website signifies your
                  acceptance of these terms and any subsequent updates.
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

export default ConditionArea;
