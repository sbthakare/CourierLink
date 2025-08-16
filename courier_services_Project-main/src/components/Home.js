import React from "react";
import { Link } from "react-router-dom";

export default function Home(){
       return(

        <div className="homepage-container">
      <main>
        <section className="Get">
          <h1 className="title">Quickship Courier Services</h1>
          <p id="description">Your reliable partner for fast and safe deliveries.</p>
          
          <Link to="/login"><button className="sbtn">Get Started</button></Link>
        </section>
        <section id="services" className="services">
          <h2 id="stitle">Our Services</h2>
          <div className="scards">
            <div className="cardd1">
              <h3>Fast Delivery</h3>
              <p>
                We ensure your packages are delivered on time with our fast
                delivery system.
              </p>
            </div>
            <div className="cardd2">
              <h3>24/7 Support</h3>
              <p>
                Our customer support team is available around the clock to
                assist you.
              </p>
            </div>
            <div className="cardd3">
              <h3>Safe Packaging</h3>
              <p>
                We take great care in packaging your items to ensure their
                safety during transit.
              </p>
            </div>
          </div>
        </section>
        <section id="about" className="abou">
          <h2 id="atitle">About Us</h2>
          <p id="adiscription">
            At Curiour Services, we provide top-notch delivery solutions,
            ensuring reliability, safety, and efficiency. With years of
            experience, we are dedicated to delivering excellence in every
            parcel.
          </p>
        </section>
      </main>
    </div>
       )
}

