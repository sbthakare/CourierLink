import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";
import Login from "./components/Login";
import UserLogin from "./components/UserLogin";
import EmployeeLogin from "./components/EmployeeLogin";
import AdminLogin from "./components/AdminLogin";
import UserLogin2 from "./components/UserLogin2";
import EmployeeLogin2 from "./components/EmployeeLogin2";
import AdminLogin2 from "./components/AdminLogin2";
import CouriorBook from "./components/CouriorBook";
import Bill from "./components/Bill";
import AdminHndler from "./components/AdminHndler";
import AdminHome from "./components/AdminHome";
import FeedBackForm from "./components/FeedBackForm";
import EmployeeHome from "./components/EmployeeHome";
import UserHome from "./components/UserHome";
import HelpAndSupport from "./components/HelpAndSupport";
import UserProfile from "./components/UserProfile";
import Useravailable from "./components/Usersavailable";
import SimpleTracker from "./components/SimpleTracker";
import ActiveOrder from "./components2/ActiveOrder";
import CompletedOrders from "./components2/CompletedOrders";
import EmpProfile from "./components2/EmpProfile";
import Chatbot from "./components2/Chatbot";
import SchedulePickup from "./components2/SchedulePickup";
import ViewHistory from "./components2/ViewHistory";
import Layout from "./components/Layout"; 
import LayoutforEmployee from "./components/LayoutforEmployee";
import Layoutforadmin from "./components/Layoutforadmin";
import CompletedOrdersa from "./components/CompletedOrdersa";


const routing = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "userlogin",
        element: <UserLogin />,
      },
      {
        path: "employeelogin",
        element: <EmployeeLogin />,
      },
      {
        path: "adminlogin",
        element: <AdminLogin />,
      },
      {
        path: "userlogin2",
        element: <UserLogin2 />,
      },
      {
        path: "employeelogin2",
        element: <EmployeeLogin2 />,
      },
      {
        path: "adminlogin2",
        element: <AdminLogin2 />,
      },
      {
        path: "employeehome",
        element: <EmployeeHome />,
      },
      {
        path: "adminhandler",
        element: <AdminHndler />,
      },   
      {
        path: "feedbackform",
        element: <FeedBackForm />,
      },{
        path: "/",
        element: <Layout />, 
        children: [
          {
            path: "curiorbook",
            element: <CouriorBook />,
          },
          {
            path: "simpletracker",
            element: <SimpleTracker />,
          },
          {
            path: "bill",
            element: <Bill />,
          },
        
          {
            path: "userhome",
            element: <UserHome />,
          },
          {
            path: "contactus",
            element: <HelpAndSupport />,
          },
          {
            path: "userprofile",
            element: <UserProfile />,
          },
          {
            path: "chatbot",
            element: <Chatbot />,
          },
        
          {
            path: "schedulepickup",
            element: <SchedulePickup />,
          },
          {
            path: "viewhistory",
            element: <ViewHistory />,
          },
        ],
      },{
        path: "",
        element: <LayoutforEmployee />, 
        children: [
          {
            path: "simpletracker",
            element: <SimpleTracker />,
          }, {
            path: "activeorders",
            element: <ActiveOrder />,
          }, {
            path: "employeeprofile",
            element: <EmpProfile />,
          }, {
            path: "completedorders",
            element: <CompletedOrders />,
          },
        ],
      },{
        path: "",
        element: <Layoutforadmin />, 
        children: [
          {
            path: "adminhome",
            element: <AdminHome />,
          },   {
            path: "usersavailable",
            element: <Useravailable />,
          },{
            path: "completedordersa",
            element: <CompletedOrdersa />,
          },
        ],
      },
    ],
  },
  
]);

export default routing;
