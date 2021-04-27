import React from "react";
import "../../App.css";
import Cards from "../Cards";
import Footer from "../Footer";
import HeroSection from "../HeroSection";

function Home() {
  return (
    <>
      <HeroSection />
      <p>time to login</p>
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
