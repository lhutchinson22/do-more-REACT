import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import Footer from "../Footer";
import UserContext from "../Context/UserContext";
import { Button } from "../Button";

export default function Services(props) {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push("/");
  }, [userData.user, history]);

  return (
    <>
      <h1 className="services">SERVICES</h1>
      <h3 style={{ textAlign: "center" }}>
        {" "}
        Welcome {userData.user?.displayName}
      </h3>
      <Button
        onClick={props.logout}
        className="btns"
        buttonStyle="btn--primary"
        buttonSize="btn--large"
      >
        LOGOUT <i className="fa fa-arrow-right" />
      </Button>
      <Footer />
    </>
  );
}
