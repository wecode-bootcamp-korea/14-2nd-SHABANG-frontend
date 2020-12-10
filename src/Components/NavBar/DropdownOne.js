import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const DropdownOne = () => {
  const [click, setClick] = useState(false);

  return (
    <>
      <DropdownMenu>
        <ul onClick={() => setClick(!click)}>
          {MENU_ITEMS.map(({ cName, path, title }, index) => {
            return (
              <li key={index}>
                <Link className={cName} to={path}>
                  {title}
                </Link>
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
  z-index: 101;
  border: 1px solid #e1e1e1;
  border-top: 0px solid #e1e1e1;
  li {
    height: 33px;
    width: 100%;
    border: 0px solid black;
    font-size: 13px;
    text-align: left;
    padding: 9px 15px 9px 15px;
    font-family: "Spoqa Han Sans Neo", "sans-serif";
  }
  li:hover {
    cursor: pointer;
    background: #e1e1e1;
  }
`;

export default DropdownOne;

const MENU_ITEMS = [
  {
    title: "방 찾기",
    path: "/1",
    cName: "dropdown-link",
  },
  {
    title: "찜한 매물",
    path: "/2",
    cName: "dropdown-link",
  },
  {
    title: "빌라 내놓기(전월세만)",
    path: "/3",
    cName: "dropdown-link",
  },
];
