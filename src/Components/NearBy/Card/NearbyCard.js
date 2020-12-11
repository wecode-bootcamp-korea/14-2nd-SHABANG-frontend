import React, { useState } from "react";
import styled from "styled-components";
import NearbyMap from "./NearbyMap";
import NearbyModal from "../Modal/NearbyModal";

const NearbyCard = () => {
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
            <p className="detailAddress">강남구 삼성동</p>
          </DetailAddressBox>
          <MapImgBox onClick={() => setModalActive(!isModalActive)}>
            <NearbyMap />
          </MapImgBox>
        </CardBody>
      )}
      {isModalActive && (
        <NearbyModal
          isModalActive={isModalActive}
          setModalActive={setModalActive}
        />
      )}
    </NearbyCardContainer>
  );
};

const NearbyCardContainer = styled.div`
  font-family: spoqaHanSans, Arial, Helvetica, sans-serif;
  width: 385px;
  border: 1px solid #eeeeee;
  margin: auto auto;
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
