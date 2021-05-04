import React, { useState } from "react";
import "../../App.css";
import Cards from "../Cards";
import Footer from "../Footer";
import HeroSection from "../HeroSection";
import axios from "axios";

function Home() {
  const [form, setForm] = useState();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post("/users/login", form);
      console.log(loginRes);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <HeroSection />
      <div>
        <form onSubmit={submitLoginForm}>
          <label>Email</label>
          <input onChange={onChange} type="text" name="email" />
          <label>Password</label>
          <input onChange={onChange} type="text" name="password" />
          <input type="submit" />
        </form>
      </div>
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
