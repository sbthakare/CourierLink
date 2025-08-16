import React from "react";
import { useNavigate } from "react-router-dom";

const Slidebarforadmin = () => {
  const navigate = useNavigate();

  const GotoCourierBook = (e) => {
    e.preventDefault();
    navigate("/usersavailable");
  };

  const GoToHelpAndSupport = (e) => {
    e.preventDefault();
    navigate("/completedorders");
  };

  return (
    <div className="sidebar">
      <ul className="userhomeslidlist">
        <li className="uslists" onClick={() => navigate("/adminhome")}>
          Dashboard
        </li>
        <li className="uslists" onClick={GotoCourierBook}>
          Users
        </li>
        <li className="uslists" onClick={()=>navigate("/completedordersa")}>Completed Orders</li>
      </ul>
    </div>
  );
};

export default Slidebarforadmin;