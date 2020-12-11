import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import DropdownAp from "./DropdownAp";
import DropdownVi from "./DropdownVi";
import DropdownOne from "./DropdownOne";
import DropdownOff from "./DropdownOff";
import DropdownNew from "./DropdownNew";
import NavUnderOne from "../NavUnderBar/NavUnderOne";
import NavUnderApt from "../NavUnderBar/NavUnderApt";
// import Dropdown from "./Dropdown";

const NavBar = () => {
  const [color, setColor] = useState("black");
  const [dropdowns, setDropdowns] = useState([...Array(5)].fill(false));

  const onMouseEnterDropDown = (dropdownIndex) => {
    setDropdowns(
      dropdowns.map((dropdownStatus, index) => dropdownIndex === index)
    );
  };

  const onMouseLeaveDropDown = () => {
    setDropdowns(dropdowns.map(() => false));
  };

  useEffect(() => {});

  return (
    <>
      <Bar>
        <LeftBar>
          <ImgBox>
            <img
              src="images/loginLogo.png"
              alt="샤방로고"
              style={{ width: "100px", height: "70px", objectFit: "contain" }}
            />
          </ImgBox>
          <NavLink to="/" onClick={() => setColor("#fa880b")}>
            <AptBox
              onMouseEnter={() => onMouseEnterDropDown(0)}
              onMouseLeave={onMouseLeaveDropDown}
              style={{ color: color }}
            >
              <span className="mainFont">아파트</span>
              <span className="subFont">매매/전월세/신축분양</span>
              {dropdowns[0] && <DropdownAp />}
            </AptBox>
          </NavLink>
          <NavLink to="/navbar" onClick={() => setColor("#fa880b")}>
            <ViBox
              onMouseEnter={() => onMouseEnterDropDown(1)}
              onMouseLeave={onMouseLeaveDropDown}
            >
              <span className="mainFont">빌라, 투룸+</span>
              <span className="subFont">매매/전월세/신축분양</span>
              {dropdowns[1] && <DropdownVi />}
            </ViBox>
          </NavLink>
          <NavLink to="/oneroom" onClick={() => setColor("#fa880b")}>
            <OneBox
              onMouseEnter={() => onMouseEnterDropDown(2)}
              onMouseLeave={onMouseLeaveDropDown}
            >
              <span className="mainFont">원룸</span>
              <span className="subFont">전월세</span>
              {dropdowns[2] && <DropdownOne />}
            </OneBox>
          </NavLink>
          <OffiBox
            onMouseEnter={() => onMouseEnterDropDown(3)}
            onMouseLeave={onMouseLeaveDropDown}
          >
            <span className="mainFont">오피스텔</span>
            <span className="subFont">도시형생활주택/전월세</span>
            {dropdowns[3] && <DropdownOff />}
          </OffiBox>
          <NewBox
            onMouseEnter={() => onMouseEnterDropDown(4)}
            onMouseLeave={onMouseLeaveDropDown}
          >
            <span className="mainFont">창업/사무실</span>
            <span className="subFont">임대/매매</span>
            {dropdowns[4] && <DropdownNew />}
          </NewBox>
        </LeftBar>
        <RightBar>
          <LoginBox>
            <Link to="/login">
              <button>로그인 및 회원가입</button>
            </Link>
          </LoginBox>
          <AskBox>
            <span
              style={{
                fontSize: "17px",
                fontWeight: "700",
                fontFamily: "SpoqaHanSans",
                lineHeight: "26px",
              }}
            >
              중개사무소 가입
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 및 광고문의
            </span>
          </AskBox>
        </RightBar>
      </Bar>
      {/* <NavUnderOne /> */}
      <NavUnderApt />
    </>
  );
};

const Bar = styled.div`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #e1e1e1;
  position: fixed;
  display: flex;
  justify-content: space-between;
  z-index: 10000;
`;

const LeftBar = styled.div`
  height: 80px;
  width: 830px;
  border: 0px solid green;
  display: flex;
  justify-content: space-between;
  margin-right: 100px;
  .mainFont {
    font-size: 17px;
    font-weight: 700;
    font-family: "Spoq Han Sans";
    line-height: 26px;
  }
  .subFont {
    font-size: 12px;
    font-family: "Spoq Han Sans";
    line-height: 17px;
  }
`;

const ImgBox = styled.div`
  height: 80px;
  width: 140px;
  border: 0px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const AptBox = styled.div`
  height: 80px;
  width: 140px;
  border: 0px solid black;
  padding: 19px 15px 17px 15px;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    span {
      color: #fa880b;
    }
  }
`;

const ViBox = styled.div`
  height: 80px;
  width: 140px;
  border: 0px solid black;
  padding: 19px 15px 17px 15px;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    span {
      color: #fa880b;
    }
  }
`;

const OneBox = styled.div`
  height: 80px;
  width: 65px;
  border: 0px solid black;
  padding: 19px 15px 17px 15px;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    span {
      color: #fa880b;
    }
  }
`;

const OffiBox = styled.div`
  height: 80px;
  width: 145px;
  border: 0px solid black;
  padding: 19px 15px 17px 15px;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    span {
      color: #fa880b;
    }
  }
`;

const NewBox = styled.div`
  height: 80px;
  width: 115px;
  border: 0px solid black;
  padding: 19px 15px 17px 15px;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    span {
      color: #fa880b;
    }
  }
`;

const RightBar = styled.div`
  height: 80px;
  width: 290px;
  border: 0px solid black;
  display: flex;
  justify-content: space-between;
`;

const LoginBox = styled.div`
  height: 80px;
  width: 112px;
  border: 0px solid black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  button {
    font-size: 12px;
    font-family: "SpoqaHanSans";
    border: 0px solid black;
    border-radius: 4px;
    height: 30px;
    padding: 5px 8px 6px 8px;
  }

  &:hover {
    button {
      height: 30px;
      cursor: pointer;
      background-color: #e1e1e1;
      border: 1px solid #e1e1e1;
    }
  }
`;

const AskBox = styled.div`
  height: 80px;
  width: 160px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 21px 21px 20px 13px;
  color: darkblue;
  cursor: pointer;
  &:hover {
    background-color: #e1e1e1;
    height: 80px;
  }
`;

export default NavBar;
