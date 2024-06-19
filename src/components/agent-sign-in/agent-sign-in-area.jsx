import React from "react";
import AgentLoginForm from "../forms/agent-login-form";

const AgentSignInArea = () => {
  return (
    <section className="account-page-area section-gap-equal">
      <section className="account-page-area section-gap-equal">
        <div className="container position-relative">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-3"></div>

            <div className="col-lg-6">
              <div className="login-form-box registration-form">
                <h3 className="title">Agent Login</h3>
                <p>
                  Don't have an account? <a href="/agent-sign-up">Sign up</a>
                </p>
                <AgentLoginForm />
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

export default AgentSignInArea;
