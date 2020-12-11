import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  Link,
  matchPath,
  useHistory,
  useRouteMatch,
  useParams,
  withRouter,
} from "react-router-dom";
import { oneRoomDataAPI } from "../../../../Config";

const SideBarDetail = () => {
  const [oneRoomData, setOneRoomData] = useState([]);
  const [targetRoomData, setTargetRoomData] = useState([]);
  const [unit, setUnit] = useState(false);
  const [collapse, setCollapse] = useState(true);

  const history = useHistory();
  const match = useRouteMatch();
  const { id } = useParams();

  const changeUnit = () => {
    setUnit(!unit);
  };

  const changeCollapse = () => {
    setCollapse(!collapse);
  };

  // filter함수
  const getTargetedOneRoom = () => {
    const targetRoom = oneRoomData.filter((el) => el.id === Number(id)); //match.params.id
    setTargetRoomData(targetRoom);
  };

  useEffect(() => {
    fetch("/data/OneRoom.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOneRoomData(data.oneroom);
      });
  }, []);

  useEffect(() => {
    getTargetedOneRoom();
  }, [oneRoomData]);

  useEffect(() => {
    console.log(oneRoomData);
    console.log(targetRoomData);
    console.log("파라미터", match.params.id);
  });

  return (
    <Bar style={{ overflowY: "scroll", height: "100vh" }}>
      {targetRoomData.length > 0 && (
        <OrList id={match.params.id} key={targetRoomData[0].id}>
          <Header>
            <button
              style={{ border: "none", cursor: "pointer" }}
              onClick={() => history.push("/oneroom")}
            >
              뒤로가기
            </button>
            <div className="region" style={{ display: "fixed" }}>
              {targetRoomData[0].region}
            </div>
            <div className="unit" onClick={changeUnit}>
              단위
            </div>
          </Header>
          <Img>
            <img
              src={targetRoomData[0].img}
              alt="매물상세사진"
              style={{ width: "388px", height: "230px" }}
            />
          </Img>
          <Price>
            <div className="priceInfo">
              {targetRoomData[0].price[0].trade_type}
              {Math.floor(targetRoomData[0].price[0].deposit).toLocaleString()}
              {Math.floor(targetRoomData[0].price[0].rent) > 1
                ? "/" + Math.floor(targetRoomData[0].price[0].rent)
                : ""}
            </div>
            <div className="registerNumber">등록번호</div>
          </Price>
          <Type>
            <div>
              <span className="typeTitle">면적(전용)</span>
              <span className="typeContent">
                {unit
                  ? Math.ceil(targetRoomData[0].space / 3.3) + "평"
                  : Math.floor(targetRoomData[0].space) + "m²"}
              </span>
            </div>
            <div>
              <span className="typeTitle">관리비</span>
              <span className="typeContent">5만원</span>
            </div>
            <div>
              <span className="typeTitle">구조</span>
              <span className="typeContent">오픈형원룸</span>
            </div>
          </Type>
          <Description>{targetRoomData[0].description}</Description>
          <ProductInfo>
            <div className="title">
              <div>매물 정보</div>
              <button
                style={{ border: "none", cursor: "pointer" }}
                onClick={changeCollapse}
              >
                클릭
              </button>
            </div>
            {collapse && (
              <div className="info">
                {info.map((item, index) => {
                  return (
                    <div className="infoDetail" key={index}>
                      <div style={{ color: "#a6a6a6" }}>{item.title}</div>
                      <div>{item.des}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </ProductInfo>
        </OrList>
      )}
    </Bar>
  );
};

const Bar = styled.div`
  height: 100vh;
  width: 500px;
  border: 0px solid red;
  margin-top: 130px;
`;

const OrList = styled.div`
  height: 100vh;
  width: 388px;
`;

const Header = styled.div`
  height: 50px;
  width: 388px;
  border: 1px solid #e1e1e1;
  border-top: 0px solid #e1e1e1;
  display: flex;
  padding: 13px;
  justify-content: space-between;
  background-color: white;

  .region {
    font-family: "Spoa Han Sans";
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

const Img = styled.div`
  height: 230px;
  width: 388px;
  border: 0px solid green;
`;

const Price = styled.div`
  font-family: "Spoqa Han Sans";
  height: 75px;
  width: 388px;
  border: 0px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px 13px 15px 8px;

  .priceInfo {
    height: 29.6px;
    font-size: 23px;
    font-weight: 700;
    line-height: 30px;
  }

  .registerNumber {
    height: 17.6px;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
  }
`;

const Type = styled.div`
  height: 86px;
  width: 388px;
  border: 0px solid gray;
  display: flex;
  justify-content: center;
  padding: 12px 13px 15px 5px;

  div {
    height: 60px;
    width: 120px;
    border: 0px solid orange;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .typeTitle {
    font-size: 12px;
    line-height: 15px;
    color: #222222;
  }

  .typeContent {
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    color: #2d60a3;
  }
`;

const Description = styled.div`
  height: 73px;
  width: 388px;
  border: 0px solid red;
  font-size: 16px;
  line-height: 16px;
  padding: 15px 13px 17px 13px;
`;

const ProductInfo = styled.div`
  height: 480px;
  width: 388px;
  border: 0px solid green;

  .title {
    height: 54px;
    font-size: 18px;
    line-height: 23px;
    border: 0px solid red;
    display: flex;
    justify-content: space-between;
    padding: 16px 9px 16px 13px;
  }

  .infoDetail {
    border: 0px solid red;
    height: 54px;
    padding: 16px 9px 16px 13px;
    display: flex;
    div {
      font-size: 13px;
      width: 130px;
      line-height: 17px;
    }
  }
`;

export default SideBarDetail;

const info = [
  { id: 1, title: "주차", des: "불가능" },
  { id: 2, title: "엘리베이터", des: "없음" },
  { id: 3, title: "입주가능일", des: "즉시가능" },
  { id: 4, title: "방향", des: "동향" },
  { id: 5, title: "준공날짜", des: "몰라" },
];
