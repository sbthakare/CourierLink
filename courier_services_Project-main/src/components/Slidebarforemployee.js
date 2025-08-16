import React from "react";
import { useNavigate } from "react-router-dom";

const Slidebarforemployee = () => {
  const navigate = useNavigate();

  const GotoCourierBook = (e) => {
    e.preventDefault();
    navigate("/activeorders");
  };

  const GoToHelpAndSupport = (e) => {
    e.preventDefault();
    navigate("/completedorders");
  };

  return (
    <div className="sidebar">
      <ul className="userhomeslidlist">
        <li className="uslists" onClick={() => navigate("/employeehome")}>
          Dashboard
        </li>
        <li className="uslists" onClick={GotoCourierBook}>
          Active Orders
        </li>
        <li className="uslists" onClick={()=>navigate("/completedorders")}>History</li>
        <li className="uslists" onClick={() => navigate("/employeeprofile")}>
          Profile
        </li>
      </ul>
    </div>
  );
};

export default Slidebarforemployee;