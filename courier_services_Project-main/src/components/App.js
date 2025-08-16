import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App(){
    return(
       <>
       <div class="App">
       <Header/>
       <Outlet/>
       <Footer/>
       </div>
       </>
    );
}
