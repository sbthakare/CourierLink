import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeEmail: "",
    employeePassword: "",
    employeeMobileNo: "",
    employeeAddress: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    
    if (!formData.employeeName.trim()) {
      newErrors.employeeName = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.employeeName.trim())) {
      newErrors.employeeName = "Name should contain only letters";
    }

    if (!formData.employeeEmail.trim()) {
      newErrors.employeeEmail = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(formData.employeeEmail.trim())) {
      newErrors.employeeEmail = "Invalid email format";
    }

    if (!formData.employeePassword.trim()) {
      newErrors.employeePassword = "Password is required";
    } else if (formData.employeePassword.length < 8) {
      newErrors.employeePassword = "Password should be at least 8 characters";
    }

    if (!formData.employeeMobileNo.trim()) {
      newErrors.employeeMobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.employeeMobileNo)) {
      newErrors.employeeMobileNo = "Mobile number should be 10 digits";
    }

    if (!formData.employeeAddress.trim()) {
      newErrors.employeeAddress = "Address is required";
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
  
    const employeeData = {
      name: formData.employeeName,
      email: formData.employeeEmail,
      password: formData.employeePassword,
      mobileNo: formData.employeeMobileNo, 
      address: formData.employeeAddress,
    };
  
    try {
      const response = await fetch("http://localhost:7575/employee/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });
  
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
  
      if (response.ok) {
        alert("Registration successful");
        navigate("/employeelogin2");
      } else {
        alert("Registration failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("Server error. Please try again later.");
    }
  };
  

  return (
    <div className="row employeeform1">
      <div className="container employeeform">
        <div className="row">
          <form id="ef" onSubmit={handleSubmit}>
            <h1>Register</h1>
            {Object.values(errors).map((err, index) => (
              <p key={index} style={{ color: "red" }}>{err}</p>
            ))}

            <label>Name</label><br />
            <input id="employeeinput" type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} /><br />

            <label>Email</label><br />
            <input id="employeeinput" type="email" name="employeeEmail" value={formData.employeeEmail} onChange={handleChange} /><br />

            <label>Password</label><br />
            <input id="employeeinput" type="password" name="employeePassword" value={formData.employeePassword} onChange={handleChange} /><br />

            <label>Mobile No</label><br />
            <input id="employeeinput" type="text" name="employeeMobileNo" value={formData.employeeMobileNo} onChange={handleChange} /><br />

            <label>Address</label><br />
            <textarea id="employeeinput" name="employeeAddress" value={formData.employeeAddress} onChange={handleChange}></textarea><br />

            <button id="employeebutton" type="submit">Sign In</button>
            <button onClick={() => navigate("/employeelogin2")} id="employeebutton" type="button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
