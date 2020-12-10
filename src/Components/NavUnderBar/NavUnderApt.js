import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const NavUnderApt = (props) => {
  const [color, setColor] = useState("#d0d0d0");

  return (
    <>
      <UnderBar>
        <LeftBar>
          <NavLink to="/navbar" onClick={() => setColor("black")}>
            <FirstLink style={{ color: color }}>
              <span>매매/전•월세</span>
            </FirstLink>
          </NavLink>
          <SecondLink>
            <span>신축분양</span>
          </SecondLink>
          <ThirdLink>
            <span>인구흐름</span>
          </ThirdLink>
        </LeftBar>
      </UnderBar>
    </>
  );
};

const UnderBar = styled.div`
  height: 50px;
  width: 100%;
  top: 80px;
  border: 1px solid #e1e1e1;
  border-top: 0px solid #e1e1e1;
  position: fixed;
`;

const LeftBar = styled.div`
  height: 50px;
  width: 380px;
  border: 0px solid black;
  display: flex;
  justify-content: flex-end;
`;

const FirstLink = styled.div`
  height: 50px;
  width: 130px;
  border: 0px solid green;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 15px 20px 15px 20px;
  font-size: 15px;
  line-height: 18px;
  font-family: "Spoqa Han Sans";
  cursor: pointer;
  :hover {
    span {
      color: black;
    }
  }
`;

const SecondLink = styled.div`
  height: 50px;
  width: 100px;
  border: 0px solid red;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 15px 20px 15px 20px;
  font-size: 15px;
  line-height: 18px;
  font-family: "Spoqa Han Sans";
  color: #d0d0d0;
  cursor: pointer;
  :hover {
    span {
      color: black;
    }
  }
`;

const ThirdLink = styled.div`
  height: 50px;
  width: 170px;
  border: 0px solid red;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 15px 20px 15px 20px;
  font-size: 15px;
  line-height: 18px;
  font-family: "Spoqa Han Sans";
  color: #d0d0d0;
  cursor: pointer;
  :hover {
    span {
      color: black;
    }
  }
`;

export default NavUnderApt;
