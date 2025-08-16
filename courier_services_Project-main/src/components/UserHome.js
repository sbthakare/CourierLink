import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components2/Chatbot";

const UserHome = () => {
  const navigate = useNavigate();
  const [udata, setUdata] = useState(null);
  const [udataa, setUdatac] = useState([]);

  const dataa = JSON.parse(localStorage.getItem("userData"));
  const userId = dataa?.id;
  useEffect(() => {
    const fetchUserDataa = async () => {
      if (!userId) {
        console.error("User ID is missing. Cannot fetch user data.");
        return;
      }

      console.log("Fetching user data for ID:", userId);
      try {
        const respo = await fetch(
          `http://localhost:7575/api/courier/getuser/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (respo.ok) {
          const usercdata = await respo.json();
          console.log("User data:", usercdata);
          setUdatac(usercdata);
        } else {
          console.error(`Failed to fetch user data. Status: ${respo.status}`);
        }
      } catch (error) {
        console.error("Something went wrong while fetching user data:", error);
      }
    };

    fetchUserDataa();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:7575/user/get/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const dt = await response.json();
          console.log("User data:", dt);
          setUdata(dt);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const GotoCourierBook = (e) => {
    e.preventDefault();
    navigate("/curiorbook");
  };

  const GoToHelpAndSupport = (e) => {
    e.preventDefault();
    navigate("/contactus");
  };

  const GoToTracking = (e) => {
    e.preventDefault();
    navigate("/simpletracker");
  };

  return (
    <div className="dashboard">
      <div className="userhomemain">
        <div className="uhmcontents">
          <h2 className="uhmtitle">
            Welcome, {udata?.userName ? udata.userName : "User"}
          </h2>
          <div className="sidetitle">
            <button className="uhmsbtn" onClick={() => navigate("/")}>
              Logout
            </button>
          </div>
        </div>

        <div className="uhcards">
          <div className="uhcard1">
            <h3 className="ctitle">Total Bookings</h3>
            <p className="cvalue">{udataa ? udataa.length : 0}</p>
          </div>
          <div className="uhcard2">
            <h3 className="ctitle">Active Orders</h3>
            <p className="cvalue">{udataa ? udataa.length : 0}</p>
          </div>
          <div className="uhcard3">
            <h3 className="ctitle">Successful orders</h3>
            <p className="cvalue">{0}</p>
          </div>
          <div className="uhcard4">
            <h3 className="ctitle">Pending Orders</h3>
            <p className="cvalue">{udataa ? udataa.length : 0}</p>
          </div>
        </div>

        <div className="userhomebtnsofun">
          <button className="userfbtn1" onClick={GotoCourierBook}>
            Book a Courier
          </button>
          <button className="userfbtn2" onClick={GoToTracking}>
            Track Order
          </button>
          <button
            className="userfbtn3"
            onClick={() => navigate("/schedulepickup")}
          >
            Schedule Pickup
          </button>
          <button
            className="userfbtn4"
            onClick={() => navigate("/Viewhistory")}
          >
            View History
          </button>
        </div>

        <div className="userhorderstable">
          <h3 className="uottitle">Recent Orders</h3>
          <table className="uotable">
            <thead>
              <tr>
                <th className="uoth">Booking ID</th>
                <th className="uoth">Status</th>
                <th className="uoth">Delivery Date</th>
                <th className="uoth">Actions</th>
              </tr>
            </thead>
            <tbody>
              {udataa && udataa.length > 0 ? (
                udataa.map((order) => (
                  <tr key={order.tracking_id}>
                    <td className="uotd">{order.trackingId}</td>
                    <td className="uotd">{order.status}</td>
                    <td className="uotd">{order.bookingDate}</td>
                    <td className="uotd">
                      <button className="uotbtn1" onClick={GoToTracking}>
                        Track
                      </button>
                      <button className="uotbtn">Cancel</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="uotd">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div>
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
