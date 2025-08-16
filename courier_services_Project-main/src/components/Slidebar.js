import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const GotoCourierBook = (e) => {
    e.preventDefault();
    navigate("/curiorbook");
  };

  const GoToHelpAndSupport = (e) => {
    e.preventDefault();
    navigate("/contactus");
  };

  return (
    <div className="sidebar">
      <ul className="userhomeslidlist">
        <li className="uslists" onClick={() => navigate("/userhome")}>
          Dashboard
        </li>
        <li className="uslists" onClick={GotoCourierBook}>
          Book a Courier
        </li>
        <li className="uslists">History</li>
        <li className="uslists" onClick={() => navigate("/userprofile")}>
          Profile
        </li>
        <li className="uslists" onClick={GoToHelpAndSupport}>
          Help & Support
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
