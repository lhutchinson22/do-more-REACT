import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Pages/Home";
import Services from "./Components/Pages/Services";
import Products from "./Components/Pages/Products";
import Register from "./Components/Pages/Register";
import axios from "axios";
import UserContext from "./Components/Context/UserContext";

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
      try {
        const userRes = await axios.get("/users", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      } catch (err) {
        console.log("User must login");
      }
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
