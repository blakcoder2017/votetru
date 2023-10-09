import React from "react";

const Elections = () => {
  return (
    <div className="container px-5">
      <h1 className="mt-4">Dashboard</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Elections</li>
      </ol>
      <div className="row">
        <div className="col-xl-3 col-md-3">
          <button className="btn btn-primary">Create Election</button>
        </div>
      </div>
    </div>
  );
};

export default Elections;
