import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Apartment from './Pages/Apartment/Apartment';
import LogIn from './Pages/LogIn/LogIn';
import OneRoom from './Pages/OneRoom/OneRoom'





class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Apartment} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/oneroom" component={OneRoom} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;