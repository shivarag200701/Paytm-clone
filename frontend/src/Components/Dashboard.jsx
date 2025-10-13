import React from "react";
import AppBar from "./AppBar";
import Balance from "./Balance";
import Users from "./Users";

const Dashboard = () => {
  return (
    <div className="w-full h-[100vh] bg-white">
      <AppBar />
      <Balance />
      <Users />
    </div>
  );
};

export default Dashboard;
