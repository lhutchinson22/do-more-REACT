import React from "react";
import "../App.css";
// import { Button } from "./Button";
import "./HeroSection.css";
import img1 from "../images/door1.png";

const HeroSection = () => {
  return (
    <div className="hero-container">
      {/* <video src="/videos/videos-2.mp4" autoPlay loop muted /> */}
      <h1>Choose a door.</h1>
      <p>what are you waiting for?</p>
      <div className="hero-btns">
        <div className="row">
          <div className="door-images">
            <img
              src={img1}
              text="Travel through the Islands of Bali in a Private Cruise"
              label="Luxury"
              path="/about"
            />
          </div>
        </div>

        {/* <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button> */}
      </div>
    </div>
  );
};

export default HeroSection;
