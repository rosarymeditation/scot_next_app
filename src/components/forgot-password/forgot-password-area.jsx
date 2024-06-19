import React from "react";
import ForgotPasswordForm from "../forms/forgot-password-form";

const ForgotPasswordArea = () => {
  return (
    <section className="account-page-area section-gap-equal">
      <section className="account-page-area section-gap-equal">
        <div className="container position-relative">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-3"></div>

            <div className="col-lg-6">
              <div className="login-form-box registration-form">
                <h3 className="title">Reset Password</h3>
                <p>Reset Password</p>
                <ForgotPasswordForm />
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>

          <ul className="shape-group">
            <li className="shape-1 scene">
              <img src="/assets/images/about/shape-07.png" alt="Shape" />
            </li>
            <li className="shape-2 scene">
              <img src="/assets/images/about/shape-13.png" alt="Shape" />
            </li>
            <li className="shape-3 scene">
              <img src="/assets/images/counterup/shape-02.png" alt="Shape" />
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default ForgotPasswordArea;
