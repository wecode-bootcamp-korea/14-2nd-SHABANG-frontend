import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { oneRoomDataAPI } from "../../../../Config";
import { Link, matchPath, withRouter, useHistory } from "react-router-dom";

const SideBar = () => {
  const [data, setData] = useState([]);
  const [unit, setUnit] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch(oneRoomDataAPI)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  const changeUnit = () => {
    setUnit(!unit);
  };

  return (
    <>
      <Bar>
        <Header>
          <div className="regionList">지역 목록 {data.total_count} 개</div>
          <div className="unit" onClick={changeUnit}>
            단위
          </div>
        </Header>
        <ul style={{ overflowY: "scroll", height: "95vh" }}>
          <Recommend>
            <div className="recommendLetter">이지역 안심중개사 추천 방</div>
            <div>
              <img
                src="images/question.png"
                alt="단위"
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
            </div>
          </Recommend>
          {data.oneroom &&
            data.oneroom.map((item, index) => {
              return (
                <>
                  <OrList
                    id={item.id}
                    onClick={() => history.push(`/oneroom/${item.id}`)}
                  >
                    <div>
                      <img
                        src={item.img}
                        alt="매물"
                        style={{
                          width: "145px",
                          height: "115px",
                          marginRight: "10px",
                        }}
                      />
                    </div>
                    <div style={{ padding: "10px 0" }}>
                      <li key={index}>
                        <div style={{ display: "flex" }}>
                          <div>
                            <img
                              src="images/recommand.png"
                              alt="추천"
                              style={{
                                width: "15px",
                                height: "15px",
                              }}
                            />
                          </div>
                          <div style={{ fontSize: "9px", padding: "3px" }}>
                            {item.type}
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            lineHeight: "23px",
                            fontWeight: "700",
                          }}
                        >
                          {item.price[0].trade_type}
                          {Math.floor(item.price[0].deposit).toLocaleString()}
                          {Math.floor(item.price[0].rent) > 1
                            ? "/" + Math.floor(item.price[0].rent)
                            : ""}
                        </div>
                        <div style={{ fontSize: "14px" }}>
                          <span>
                            {unit
                              ? Math.ceil(item.space / 3.3) + "평"
                              : Math.floor(item.space) + "m²"}
                          </span>
                          ・<span>{item.floor}층</span>
                        </div>
                        <div style={{ fontSize: "14px" }}>{item.region}</div>
                        <div
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          {item.description}
                        </div>
                      </li>
                    </div>
                  </OrList>
                </>
              );
            })}
        </ul>
      </Bar>
    </>
  );
};

const Bar = styled.div`
  height: 100vh;
  width: 400px;
  border: 0px solid red;
`;

const Header = styled.div`
  height: 50px;
  width: 388px;
  border: 1px solid #e1e1e1;
  display: flex;
  padding: 13px;
  justify-content: space-between;
  background-color: white;

  .regionList {
    font-family: "Spoqa Han Sans";
    font-size: 18px;
    line-height: 23px;
    margin-right: 13px;
  }

  .unit {
    font-size: 4px;
    cursor: pointer;
    width: 25px;
    height: 25px;
    border: 1px solid black;
    border-radius: 40px;
    padding: 8px 2px;
    vertical-align: middle;
    text-align: center;
  }
`;

const Recommend = styled.div`
  height: 38px;
  width: 388px;
  border: 0px solid black;
  display: flex;
  padding: 10px 13px 10px 13px;

  .recommendLetter {
    font-family: "Spoqa Han Sans";
    font-size: 14px;
    line-height: 18px;
    margin-right: 13px;
  }
`;

const OrList = styled.div`
  height: 132px;
  width: 388px;
  border: 0px solid red;
  cursor: pointer;
  padding: 8px;
  display: flex;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #e1e1e1;
  }
`;

export default SideBar;
