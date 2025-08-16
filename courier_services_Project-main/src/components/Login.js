import React from "react";
import { Link, Outlet } from "react-router-dom";
import {Dropdown} from 'react-bootstrap';
export default function Login() {

  return (
    <div className="row allloginselector">
<div class="loginpage">
<div class="dropdown">
    <h1 id="ltitle">Login</h1>
    <p id="ldesc">Choose your domain with Login</p>
    <button id="lbtn" class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" >
      Select here 
    </button>
    <ul class="dropdown-menu ">
      <li id="loginselect"> <Link className="dropdown-item"  to="/userlogin2">User</Link> </li>
      <li id="loginselect"><Link className="dropdown-item"  to="/employeelogin2">Employee</Link></li>
      <li id="loginselect"><Link  className="dropdown-item" to="/adminlogin2">Admin</Link></li> 
   
  
    </ul>
  </div>
  {/* <Outlet/> */}
</div>
</div>
  );
}

