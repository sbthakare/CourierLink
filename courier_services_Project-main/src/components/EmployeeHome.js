import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [employeeProfile, setEmployeeProfile] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orderFilters, setOrderFilters] = useState({ city: "", status: "" });
  const [locationUpdates, setLocationUpdates] = useState({});
  const navigate = useNavigate();

  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    if (employeeId) {
      fetchEmployeeData();
    } else {
      console.error("Employee ID not found in localStorage");
      navigate("/login");
    }
  }, [employeeId]);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch(`http://localhost:7575/employee/get/${employeeId}`);
      if (!response.ok) throw new Error("Failed to fetch employee data");
      const data = await response.json();
      
      setEmployeeProfile({
        name: data.name,
        email: data.email,
        mobileNo: data.mobileNo,
      });

      setDeliveries(data.assignedDeliveries || []);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const updateLocation = async (courierId) => {
    const newLocation = locationUpdates[courierId];
    if (!newLocation) {
      alert("Please enter a location before updating.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:7575/api/courier/update-location/${courierId}?newLocation=${encodeURIComponent(newLocation)}`, {
        method: "PUT",
      });
      if (!response.ok) throw new Error("Failed to update location");
      alert("Location updated successfully!");
      fetchEmployeeData();
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  const updateStatus = async (courierId, newStatus) => {
    if (!newStatus) {
      alert("Please select a status before updating.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:7575/api/courier/update-status/${courierId}?newStatus=${encodeURIComponent(newStatus)}`, {
        method: "PUT",
      });
      if (!response.ok) throw new Error("Failed to update status");
      alert("Status updated successfully!");
      fetchEmployeeData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleFilterChange = (field, value) => {
    setOrderFilters({ ...orderFilters, [field]: value });
  };

  return (
    <div className="emphm">
      <div className="empd">
        <div className="dashboard-container">
          <div className="sidebar">
            <ul className="sidebar-list">
              <li className="sidebar-item" onClick={() => navigate("/employeehome")}>Dashboard</li>
              <li className="sidebar-item" onClick={() => navigate("/activeorders")}>Active Orders</li>
              <li className="sidebar-item" onClick={() => navigate("/completedorders")}>Completed Orders</li>
              <li className="sidebar-item" onClick={() => navigate("/employeeprofile")}>Profile</li>
            </ul>
          </div>

          <div className="main-content">
            <div className="header">
              <div className="profile-card" style={{ textAlign: "center", background: "#fff", color: "black", height: "70px" }}>
                <h2><b>Welcome: <i><u>{employeeProfile.name || "Loading..."}</u></i></b></h2>
              </div>
              <button className="logout-button" onClick={() => navigate("/login")}>Logout</button>
            </div>

            <div className="section deliveries">
              <h3>Delivery Orders</h3>
              <div className="filter">
                <input type="text" placeholder="Filter by City" value={orderFilters.city} onChange={(e) => handleFilterChange("city", e.target.value)} />
                <input type="text" placeholder="Filter by Status" value={orderFilters.status} onChange={(e) => handleFilterChange("status", e.target.value)} />
                <button>Apply Filters</button>
              </div>

              <table className="delivery-table">
                <thead>
                  <tr>
                    <th>Pickup Place</th>
                    <th>Receiver Name</th>
                    <th>Receiver Contact No</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Tracking ID</th>
                    <th>Update Location</th>
                    <th>Select Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((order) => (
                    <tr key={order.id}>
                      <td>{order.senderAddress}</td>
                      <td>{order.receiverName}</td>
                      <td>{order.receiverContactNo}</td>
                      <td>{order.destination}</td>
                      <td>{order.status}</td>
                      <td>{order.trackingId}</td>
                      <td>
                        <input type="text" placeholder="Enter location" value={locationUpdates[order.id] || ""} onChange={(e) => setLocationUpdates({ ...locationUpdates, [order.id]: e.target.value })} />
                        <button onClick={() => updateLocation(order.id)}>Update Location</button>
                      </td>
                      <td>
                        <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
                          <option value="">Select Status</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





