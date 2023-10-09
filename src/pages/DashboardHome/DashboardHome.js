import React from "react";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import SummaryCards from "../../components/SummaryCards/SummaryCards";
import HomeCharts from "../../components/HomeCharts/HomeCharts";
import HomeDataTable from "../../components/HomeDataTable/HomeDataTable";

const DashboardHome = () => {
  return (
    <main className="container px-5">
      <h1 className="mt-4">Dashboard</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item active">Dashboard</li>
      </ol>
      <SummaryCards />
      <HomeCharts />
      <HomeDataTable />
    </main>
  );
};

export default DashboardHome;
