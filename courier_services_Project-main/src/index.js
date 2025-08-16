import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from   "react-router-dom";
import {Provider} from 'react-redux';
import store from './store/store';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/style.css";
import "./css/userEmplogin.css";
import "./css/CouriorBooking.css";
import "./css/Adminhandler.css";
import routing  from "./routing";
import "./css/AdminPage.css";
import "./css/AdminHome.css";
import "./css/loginpage.css";
import "./css/FeedBack.css";
import "./css/EmployHome.css";
import "./css/UserHome.css";
import "./css/HelpAndSupport.css";
import App from './components/App';
const result = ReactDOM.createRoot(document.getElementById('root'));

result.render(
  <Provider store={store}>
  <RouterProvider router={routing}/>
  </Provider>
)
// ReactDOM.render(
 
//     <App />
//   ,
//   document.getElementById('root')
// );
