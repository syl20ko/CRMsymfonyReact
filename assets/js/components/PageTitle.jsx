import React from "react";

const PageTitle = ({title}) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h1>{title}</h1>
    </div>
  );
};

export default PageTitle;
