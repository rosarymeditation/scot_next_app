import React from "react";
import { email1, phone2, phone3 } from "../../../layout/headers/menu-data";

const Cta = () => {
  return (
    <div className="cta-area-2">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="edu-cta-box cta-style-2 bg-image bg-image--9">
              <div className="inner">
                <div className="content text-end">
                  <span className="subtitle">Get In Touch:</span>
                  <h5 className="title">
                    <a style={{ fontSize: 15 }} href={`mailto:${email1}`}>
                      {email1}
                    </a>
                  </h5>
                </div>
                <div className="sparator">
                  <span>or</span>
                </div>
                <div className="content">
                  <span className="subtitle">Call Us Via:</span>
                  <h5 className="title">
                    <a style={{ fontSize: 15 }} href={`tel:${phone3}`}>
                      {phone3}
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
