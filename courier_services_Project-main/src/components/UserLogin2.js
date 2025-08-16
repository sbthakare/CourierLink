import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogin2() {
  const navigate = useNavigate();
  const userEmail = useRef();
  const userPassword = useRef();

  const [errorMessage, setErrorMessage] = useState("");

  function redirectToRegister() {
    navigate("/userlogin"); 
  }

  async function handleLogin(event) {
    event.preventDefault(); 

    
    setErrorMessage("");

    const emailValue = userEmail.current.value.trim();
    const passwordValue = userPassword.current.value.trim();

    try {
      const response = await fetch("http://localhost:7575/user/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: emailValue,
          userPassword: passwordValue,
        }),
      });

      if (response.ok) {
        const data = await response.json(); 
        console.log("User data:", data);

        localStorage.setItem("userData", JSON.stringify(data));

        alert("Login successful");
        navigate("/userhome"); 
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
      <div className="container userlogin2parent">
        <div className="row userlogin2parent">
          <form id="userlogin2">
            <h1>Login</h1>
            <div style={{ color: "red" }}>{errorMessage}</div>
            <label>Email</label>
            <br />
            <input id="uinput" type="email" ref={userEmail} />
            <br />
            <label>Password</label>
            <br />
            <input id="uinput" type="password" ref={userPassword} />
            <br />
            <br />
            <pre>
              <button id="userlogin2btn" onClick={handleLogin} type="button">
                Enter
              </button>
              <button
                onClick={redirectToRegister}
                id="userlogin2btn"
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
