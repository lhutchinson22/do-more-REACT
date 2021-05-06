import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Services from "./Components/Pages/Services";
import Products from "./Components/Pages/Products";
import Register from "./Components/Pages/Register";
import UserContext from "./Components/Context/UserContext";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });

  const checkedLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");

    if (token === null) {
      localStorage.setItem("auth-token", "");
    } else {
      const userRes = await axios.get("/users", {
        headers: { "x-auth-token": token },
      });

      console.log("User:", userRes);
      setUserData({
        token,
        user: userRes.data,
      });
    }
  };

  const logout = () => {
    setUserData({ token: undefined, user: undefined });
    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    checkedLoggedIn();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/services">
              <Services logout={logout} />
            </Route>
            <Route path="/products" component={Products} />
            <Route path="/register" component={Register} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
