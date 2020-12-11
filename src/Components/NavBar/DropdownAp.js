import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const DropdownAp = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <DropdownMenu>
        <ul>
          {MENU_ITEMS.map(({ path, title }, index) => {
            return (
              <li key={index}>
                <Link to={path}>{title}</Link>
              </li>
            );
          })}
        </ul>
      </DropdownMenu>
    </>
  );
};

const DropdownMenu = styled.div`
  height: 120px;
  width: 180px;
  padding: 8px 0 8px 0;
  position: absolute;
  top: 80px;
  left: 0px;
  display: block;
  z-index: 15000;
  border: 1px solid #e1e1e1;
  border-top: 0px solid #e1e1e1;
  background-color: white;
  li {
    height: 33px;
    width: 100%;
    border: 0px solid black;
    font-size: 13px;
    text-align: left;
    padding: 9px 15px 9px 15px;
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    color: black;
  }
  li:hover {
    cursor: pointer;
    background: #e1e1e1;
  }
`;

export default DropdownAp;

const MENU_ITEMS = [
  {
    title: "매매/전월세",
    path: "/1",
  },
  {
    title: "신축분양",
    path: "/2",
  },
  {
    title: "인구흐름",
    path: "/3",
  },
];
