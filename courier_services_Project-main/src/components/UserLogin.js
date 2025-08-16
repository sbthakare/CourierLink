import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userMobileNo: "",
    userAddress: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.userName.trim()) {
      newErrors.userName = "User name is required";
    } else if (formData.userName.length < 2) {
      newErrors.userName = "Name should be at least 2 characters";
    }

    if (!formData.userEmail.trim()) {
      newErrors.userEmail = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(formData.userEmail.trim())) {
      newErrors.userEmail = "Invalid email format";
    }

    if (!formData.userPassword.trim()) {
      newErrors.userPassword = "Password is required";
    } else if (formData.userPassword.length < 8) {
      newErrors.userPassword = "Password should be at least 8 characters";
    }

    if (!formData.userMobileNo.trim()) {
      newErrors.userMobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.userMobileNo)) {
      newErrors.userMobileNo = "Mobile number should be 10 digits";
    }

    if (!formData.userAddress.trim()) {
      newErrors.userAddress = "Address is required";
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

    try {
      const response = await fetch("http://localhost:7575/user/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful");
        navigate("/userlogin2");
      } else {
        alert("Registration failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="row userform1">
      <div className="container userform">
        <div className="row">
          <form id="uf" onSubmit={handleSubmit}>
            <h1>Register</h1>
            {Object.values(errors).map((err, index) => (
              <p key={index} style={{ color: "red" }}>{err}</p>
            ))}

            <label>Name</label><br />
            <input id="userinput" type="text" name="userName" value={formData.userName} onChange={handleChange} /><br />

            <label>Email</label><br />
            <input id="userinput" type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} /><br />

            <label>Password</label><br />
            <input id="userinput" type="password" name="userPassword" value={formData.userPassword} onChange={handleChange} /><br />

            <label>Mobile No</label><br />
            <input id="userinput" type="text" name="userMobileNo" value={formData.userMobileNo} onChange={handleChange} /><br />

            <label>Address</label><br />
            <textarea id="userinput" name="userAddress" value={formData.userAddress} onChange={handleChange}></textarea><br />

            <button id="userbutton" type="submit">SignIn</button>
            <button onClick={() => navigate("/userlogin2")} id="userbutton" type="button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}


