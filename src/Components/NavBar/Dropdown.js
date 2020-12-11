import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Dropdown = (props) => {
  // props로 두가지를 받는다.
  const { type } = props; // menu ??? => 렌더링 할 데이터 = 배열
  const [click, setClick] = useState(false);
  const [isMenu, setIsMenu] = useState([]);

  const handleChangeMenu = (menuItemsIndex) => {
    const mapchange = MENU_ITEMS.map((menu, index) => menuItemsIndex === index);
    setIsMenu(mapchange);
  };

  useEffect(() => {
    console.log(MENU_ITEMS);
    console.log(isMenu);
  });

  return (
    <>
      <DropdownMenu type={type}>
        <ul>
          {isMenu.map(({ path, title }, index) => {
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
  height: ${(props) => (props.type === "small" ? 120 : 185)}px;
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
    color: black;
  }
  li:hover {
    cursor: pointer;
    background: #e1e1e1;
  }
`;

export default Dropdown;

const APARTMENTS = [
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

const START_UPS = [
  {
    title: "상가・점포",
    path: "/1",
    cName: "dropdown-link",
  },
  {
    title: "사무실",
    path: "/2",
    cName: "dropdown-link",
  },
  {
    title: "공유오피스",
    path: "/3",
    cName: "dropdown-link",
  },
  {
    title: "찜한 매물",
    path: "/3",
    cName: "dropdown-link",
  },
  {
    title: "상가/사무실 내놓기",
    path: "/3",
    cName: "dropdown-link",
  },
];

const OFFICTELS = [
  {
    title: "오피스텔 찾기",
    path: "/1",
    cName: "dropdown-link",
  },
  {
    title: "찜한 매물",
    path: "/2",
    cName: "dropdown-link",
  },
  {
    title: "오피스텔 내놓기(전/월세만)",
    path: "/3",
    cName: "dropdown-link",
  },
];

const ROOMS = [
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

const VILLA = [
  {
    title: "빌라, 투룸 찾기",
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

// [[], [] ,[], [], []]
const MENU_ITEMS = [APARTMENTS, START_UPS, OFFICTELS, ROOMS, VILLA];
