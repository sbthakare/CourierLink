import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeLogin2() {
  const navigate = useNavigate();
  const employeeEmail = useRef();
  const employeePassword = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  function redirectToRegister() {
    navigate("/employeelogin");
  }

  async function handleLogin(event) {
    event.preventDefault();

    setErrorMessage("");

    const emailValue = employeeEmail.current.value.trim();
    const passwordValue = employeePassword.current.value.trim();

    try {
      const response = await fetch("http://localhost:7575/employee/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("employeeData", JSON.stringify(data));
        localStorage.setItem("employeeId", data.id);

        alert("Login successful");
        navigate("/employeehome");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Try again!");
    }
  }

  return (
    <div className="row">
      <div className="container employeelogin2parent">
        <div className="row userlogin2parent">
          <form id="employeelogin2">
            <h1>Login</h1>
            <div style={{ color: "red" }}>{errorMessage}</div>

            <label>Email</label><br />
            <input id="einput" type="email" ref={employeeEmail} /><br />

            <label>Password</label><br />
            <input id="einput" type="password" ref={employeePassword} /><br /><br />

            <pre>
              <button id="employeelogin2btn" onClick={handleLogin} type="button">
                Enter
              </button>
              <button onClick={redirectToRegister} id="employeelogin2btn" type="button">
                Register
              </button>
            </pre>
          </form>
        </div>
      </div>
    </div>
  );
}