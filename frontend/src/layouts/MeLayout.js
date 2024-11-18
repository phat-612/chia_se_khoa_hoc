import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MeLayout = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default MeLayout;
