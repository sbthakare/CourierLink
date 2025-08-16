import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useLocation } from "react-router-dom";
export default function Header() {
  const location = useLocation();
  const hidelinks =
    location.pathname === "/login" ||
    location.pathname === "/contactus" ||
    location.pathname == "/userlogin" ||
    location.pathname == "/employeelogin" ||
    location.pathname == "/adminlogin" ||
    location.pathname == "/userlogin2" ||
    location.pathname == "/employeelogin2" ||
    location.pathname == "/adminlogin2" ||
    location.pathname == "/curiorbook" ||
    location.pathname == "/bill" ||
    location.pathname == "/adminhandler" ||
    location.pathname == "/adminhome";
  return (
    <div className=".container top">
      <div className=".row">
        <nav class="navbar navbar-expand-lg ">
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav me-auto ">
                <a href="#" class="tname">
                  QuickShip
                </a>
              </ul>

              <form class="d-flex" role="search">
                <ul class="nav justify-content-end">
                  <li class="nav-item">
                    <Link id="hm"
                      class="nav-link active "
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                

                  {!hidelinks && (
                    <>
                      <li className="nav-item">
                        <ScrollLink
                          className="nav-link active text-white"
                          to="about"
                          smooth={true}
                          duration={0.1}
                        >
                          About
                        </ScrollLink>
                      </li>

                      <li class="nav-item">
                        <ScrollLink
                          class="nav-link active text-white"
                          smooth={true}
                          duration={0.1}
                          to="services"
                        >
                          Services
                        </ScrollLink>
                      </li>
                    </>
                  )}

                  <li class="nav-item">
                    <Link class="nav-link active text-white" to="/contactus">
                      ContactUs
                    </Link>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
