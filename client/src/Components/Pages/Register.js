import React, { useState } from "react";
import "../../App.css";
import Footer from "../Footer";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = await axios.post("/users/register", form);
      console.log(newUser);
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <>
      <h1 className="sign-up">SIGN UP</h1>
      <div className="registerDiv">
        <form onSubmit={submit}>
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
          <input
            className="input-form"
            onChange={onChange}
            type="text"
            name="passwordCheck"
            placeholder="PASSWORD CHECK"
          />
          <input
            className="input-form"
            onChange={onChange}
            type="text"
            name="displayName"
            placeholder="DISPLAY NAME"
          />
          <input className="btn btn--primary btn--large" type="submit" />
        </form>
      </div>
      <Footer />
    </>
  );
}
