import React from "react";
import Sidebar from "./Slidebar";
import { Outlet } from "react-router-dom"; 

export default function Layout ()  {
  return (
    <div className="dashboard">
      <Sidebar /> 
      <div className="main-content">
        <Outlet /> 
      </div>
    </div>
  );
};


