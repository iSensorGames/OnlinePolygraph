import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";

// Styles
import "./styles/palette.css";

// Components
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Welcome from "./Welcome";
import Game from "./Game";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/game" component={Game} />
      </Switch>
    </Router>
  );
}

export default App;
