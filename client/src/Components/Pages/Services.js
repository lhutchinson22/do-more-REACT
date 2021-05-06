import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import Footer from "../Footer";
import UserContext from "../Context/UserContext";

export default function Services() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push("/");
  }, [userData.user, history]);

  return (
    <>
      <h1 className="services">SERVICES</h1>
      <Footer />
    </>
  );
}
