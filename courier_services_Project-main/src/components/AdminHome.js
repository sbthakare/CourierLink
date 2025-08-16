import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios"; 
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminHome() {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const TaskData = JSON.parse(localStorage.getItem("taskdata"));
  // const userId = TaskData?.id;
  useEffect(() => {
   
    axios
      .get("http://localhost:7575/user/getUsers")
      .then((res) => {
        setTotalUsers(res.data.length); 
      })
      .catch((err) =>
        console.error("Error fetching users:", err.response?.data || err)
      );


    axios
      .get("http://localhost:7575/employee/getEmployees")
      .then((res) => {
        setTotalEmployees(res.data.amount || 0);
      })
      .catch((err) =>
        console.error("Error fetching revenue:", err.response?.data || err)
      );

   
    axios
      .get("http://localhost:7575/api/courier/pendingOrders")
      .then((res) => {
        setPendingTasks(res.data.count || 0);
      })
      .catch((err) =>
        console.error(
          "Error fetching pending tasks:",
          err.response?.data || err
        )
      );
  }, []);

  const pieData = {
    labels: ["Users", "Employees", "Orders"],
    datasets: [
      {
        label: "User Distribution",
        data: [totalUsers, totalEmployees, pendingTasks],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
        hoverBackgroundColor: ["#45D96B", "#FFB74D", "#64B5F6"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#555",
        },
      },
    },
  };

  return (
    <div className="row" id="alladminpage">
      <div className="admin-home">
       
        <div className="main-contentadmin">
          <div className="header">
            <h1>Courier Services</h1>
            <button className="uhmsbtn" onClick={() => navigate("/")}>
              Logout
            </button>
          </div>
          <div className="adpageallcards">
            <div className="card1a">
              <Link to="/usersavailable">
                <div className="card-content">
                  <h2 className="adcardtitle">Total Users</h2>
                  <h1 className="adcardvalu">{totalUsers}</h1>
                  <p className="subdescad">Active and engaged users</p>
                </div>
              </Link>
            </div>
            <div className="card2a">
              <div className="card-content">
                <h2 className="adcardtitle">Total Employees</h2>
                <h1 className="adcardvalu">${totalEmployees}</h1>
                <p className="subdescad">Monthly earnings</p>
              </div>
            </div>
            <div className="card3a">
              <Link to="/adminhandler">
                <div className="card-content">
                  <h2 className="adcardtitle">Pending Tasks</h2>
                  <h1 className="adcardvalu">{TaskData ? TaskData.length : 0}</h1>
                  <p className="subdescad">Tasks awaiting approval</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="grpbackgroundad">
            <h2>User Distribution</h2>
            <div className="grpwrapperadr">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
          <div className="graphadminp">
            <div className="grpadcard">
              <h2 className="adgrptitl">User Engagement</h2>
              <p>Graph Placeholder</p>
            </div>
            <div className="grpadcard">
              <h2 className="adgrptitl">Revenue Growth</h2>
              <p>Graph Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
