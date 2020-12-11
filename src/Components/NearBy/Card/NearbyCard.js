import React, { useState } from "react";
import styled from "styled-components";
import NearbyMap from "./NearbyMap";
import NearbyModal from "../Modal/NearbyModal";

const NearbyCard = (props) => {
  const { targetRoomData } = props;
  console.log(targetRoomData);
  const [isModalActive, setModalActive] = useState(false);
  const [isBodyShow, setBodyShow] = useState(true);

  return (
    <NearbyCardContainer>
      <CardHeader onClick={() => setBodyShow(!isBodyShow)}>
        <span className="title">주변지역 / 로드뷰</span>
        <span>
          <Arrow
            isBodyShow={isBodyShow}
            alt="클릭하면 내용을 볼 수 있어요"
            src="/images/icon/arrow2.png"
          />
        </span>
      </CardHeader>
      {isBodyShow && (
        <CardBody>
          <DetailAddressBox>
            <p className="detailAddress">{targetRoomData[0].region}</p>
          </DetailAddressBox>
          <MapImgBox onClick={() => setModalActive(!isModalActive)}>
            <NearbyMap targetRoomData={targetRoomData} />
          </MapImgBox>
        </CardBody>
      )}
      {isModalActive && (
        <NearbyModal
          isModalActive={isModalActive}
          setModalActive={setModalActive}
          targetRoomData={targetRoomData}
        />
      )}
    </NearbyCardContainer>
  );
};

const NearbyCardContainer = styled.div`
  font-family: spoqaHanSans, Arial, Helvetica, sans-serif;
  width: 400px;
  border: 1px solid #eeeeee;
  margin: auto auto;
  background-color: white;
  height: 60%;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 57px;
  border-bottom: none;
  :hover {
    cursor: pointer;
  }

  .title {
    margin-left: 20px;
    color: #222222;
    font-size: 18px;
  }
`;

const Arrow = styled.img`
  width: 15px;
  margin-right: 20px;
  transition: all ease 0.4s;
  transform: ${({ isBodyShow }) =>
    isBodyShow ? "rotate(-270deg)" : "rotate(-90deg)"};
`;

const CardBody = styled.div`
  border-top: 1px solid #eeeeee;
  .bodyShow {
    display: block;
  }
`;

const DetailAddressBox = styled.div`
  display: flex;
  align-items: center;
  height: 53px;

  .detailAddress {
    margin-left: 10px;
    color: #757575;
    font-size: 16px;
  }
`;

const MapImgBox = styled.div`
  margin: 10px;
  :hover {
    cursor: pointer;
  }
`;

export default NearbyCard;
