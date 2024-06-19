import React from "react";

export const Loader = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "200px" }}
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
