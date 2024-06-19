import React from "react";

export const NothingFound = ({ children }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "200px" }}
    >
      <p className="text-center">{children}</p>
    </div>
  );
};
