import React from "react";
import "../../App.css";
import Cards from "../Cards";
import Footer from "../Footer";
import HeroSection from "../HeroSection";

function Home() {
  return (
    <>
      <HeroSection />
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("hi");
          }}
        >
          <label>Email</label>
          <input type="text" name="email" />
          <label>Password</label>
          <input type="text" name="password" />
          <input type="submit" />
        </form>
      </div>
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
