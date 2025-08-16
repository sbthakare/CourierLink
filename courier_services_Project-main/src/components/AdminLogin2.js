import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin2() {
  const navigate = useNavigate();
  const adminEmail = useRef();
  const adminPassword = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  function redirectToRegister() {
    navigate("/adminlogin"); 
  }
  async function handleLogin(event) {
    event.preventDefault(); 
    setErrorMessage(""); 

    const emailValue = adminEmail.current.value.trim();
    const passwordValue = adminPassword.current.value.trim();

    try {
      const response = await fetch("http://localhost:7575/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminEmail: emailValue,
          adminPassword: passwordValue,
        }),
      });

      if (response.status === 403) {
        setErrorMessage("Access to the resource is prohibited.");
      } else if (response.ok) {
        const data = await response.json();
        console.log("Admin data:", data);
        
        localStorage.setItem("adminData", JSON.stringify(data));
        alert("Login successful");
        navigate("/adminhome");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Try again!");
    }
  }
  
  return (
    <div className="row ul2">
      <div className="container adminlogin2parent">
        <div className="row adminlogin2parent">
          <form id="adminlogin2">
            <h1>Admin Login</h1>
            <div style={{ color: "red" }}>{errorMessage}</div>
            <label>Email</label>
            <br />
            <input id="ainput" type="email" ref={adminEmail} />
            <br />
            <label>Password</label>
            <br />
            <input id="ainput" type="password" ref={adminPassword} />
            <br />
            <br />
            <pre>
              <button id="adminlogin2btn" onClick={handleLogin} type="button">
                Enter
              </button>
              <button
                onClick={redirectToRegister}
                id="adminlogin2btn"
                type="button"
              >
                Register
              </button>
            </pre>
          </form>
        </div>
      </div>
    </div>
  );
}
