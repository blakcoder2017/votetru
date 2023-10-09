import React from "react";

const HomeCharts = () => {
  return (
    <div className="row">
      <div className="col-xl-6">
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-chart-area me-1"></i>
            Area Chart Example
          </div>
          <div className="card-body">
            <canvas id="myAreaChart" width="100%" height="40"></canvas>
          </div>
        </div>
      </div>
      <div className="col-xl-6">
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-chart-bar me-1"></i>
            Bar Chart Example
          </div>
          <div className="card-body">
            <canvas id="myBarChart" width="100%" height="40"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCharts;
