import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Apartment from "./Pages/Apartment/Apartment";
import LogIn from "./Pages/LogIn/LogIn";
import OneRoom from "./Pages/OneRoom/OneRoom";
import NearbyCard from "./Components/NearBy/Card/NearbyCard";
import NavBar from "./Components/NavBar/NavBar";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Apartment} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/oneroom" component={OneRoom} />
          <Route exact path="/nearbycard" component={NearbyCard} />
          <Route exact path="/oneroom/:id" component={OneRoom} />
          <Route exact path="/navbar" component={NavBar} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
