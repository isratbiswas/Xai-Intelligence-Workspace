import React from "react";
import DashboardCard from "./DashboardCard";
import DashboardChart from "./DashboardChart";
import DashboardSidebar from "./DashboardSidebar";

const DashboardOverview = () => {
  return (
    <div>
      <DashboardCard />
      <DashboardChart />
      <DashboardSidebar />
    </div>
  );
};

export default DashboardOverview;
