import React, { useState, useEffect } from "react";
import Map from "./Components/Map/Map";
import SideBar from "./Components/SideBar/SideBar";
import SideBarDetail from "./Components/SideBarDetail/SideBarDetail";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import NavUnderOne from "../../Components/NavUnderBar/NavUnderOne";

const OneRoom = () => {
  return (
    <div>
      <NavBar />
      <NavUnderOne />
      <Main>
        <Map />
        <Switch>
          <Route exact path="/oneroom" component={SideBar} />
          <Route exact path="/oneroom/:id" component={SideBarDetail} />
        </Switch>
      </Main>
    </div>
  );
};

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export default OneRoom;
