import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    adminMobileNo: "",
    adminAddress: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    
    if (!formData.adminName.trim()) {
      newErrors.adminName = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.adminName.trim())) {
      newErrors.adminName = "Name should contain only letters";
    }

    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(formData.adminEmail.trim())) {
      newErrors.adminEmail = "Invalid email format";
    }

    if (!formData.adminPassword.trim()) {
      newErrors.adminPassword = "Password is required";
    } else if (formData.adminPassword.length < 8) {
      newErrors.adminPassword = "Password should be at least 8 characters";
    }

    if (!formData.adminMobileNo.trim()) {
      newErrors.adminMobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.adminMobileNo)) {
      newErrors.adminMobileNo = "Mobile number should be 10 digits";
    }

    if (!formData.adminAddress.trim()) {
      newErrors.adminAddress = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const adminData = {
      adminName: formData.adminName,
      adminEmail: formData.adminEmail,
      adminPassword: formData.adminPassword,  
      adminMobileNo: formData.adminMobileNo,
      adminAddress: formData.adminAddress,
    };
    
    try {
      const response = await fetch("http://localhost:7575/admin/addAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      });
  
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
  
      if (response.ok) {
        alert("Registration successful");
        navigate("/adminlogin2");
      } else {
        alert("Registration failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("Server error. Please try again later.");
    }
  };
  
  return (
    <div className="row adminform1">
      <div className="container adminform">
        <div className="row">
          <form id="af" onSubmit={handleSubmit}>
            <h1>Admin Register</h1>
            {Object.values(errors).map((err, index) => (
              <p key={index} style={{ color: "red" }}>{err}</p>
            ))}

            <label>Name</label><br />
            <input id="admininput" type="text" name="adminName" value={formData.adminName} onChange={handleChange} /><br />

            <label>Email</label><br />
            <input id="admininput" type="email" name="adminEmail" value={formData.adminEmail} onChange={handleChange} /><br />

            <label>Password</label><br />
            <input id="admininput" type="password" name="adminPassword" value={formData.adminPassword} onChange={handleChange} /><br />

            <label>Mobile No</label><br />
            <input id="admininput" type="text" name="adminMobileNo" value={formData.adminMobileNo} onChange={handleChange} /><br />

            <label>Address</label><br />
            <textarea id="admininput" name="adminAddress" value={formData.adminAddress} onChange={handleChange}></textarea><br />

            <button id="adminbutton" type="submit">Sign Up</button>
            <button onClick={() => navigate("/adminlogin2")} id="adminbutton" type="button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}