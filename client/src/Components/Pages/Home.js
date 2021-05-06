import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import Cards from "../Cards";
import Footer from "../Footer";
import HeroSection from "../HeroSection";
import axios from "axios";
import UserContext from "../Context/UserContext";

function Home() {
  const [form, setForm] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/login", form);

      setUserData({
        token: data.token,
        user: data.user,
      });

      //when you login it pushes to services page
      localStorage.setItem("auth-token", data.token);
      history.push("/services");
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    //if the user is signed in, they get redirected to the services page no matter what
    if (userData.user) history.push("/services");
  }, [userData.user, history]);

  return (
    <>
      <HeroSection />
      <div className="loginDiv">
        <form onSubmit={submitLoginForm}>
          <input
            className="input-form"
            onChange={onChange}
            type="text"
            name="email"
            placeholder="EMAIL"
          />
          <input
            className="input-form"
            onChange={onChange}
            type="text"
            name="password"
            placeholder="PASSWORD"
          />
          <input className="btn btn--primary btn--large" type="submit" />
        </form>
      </div>
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
