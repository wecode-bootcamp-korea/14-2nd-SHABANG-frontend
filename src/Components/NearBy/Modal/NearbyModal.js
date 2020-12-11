import React, { useState, useEffect } from "react";
import NearbyModalFooter from "./Component/NearbyModalFooter";
import styled, { css } from "styled-components";
import { nearbyDataAPI } from "../../../Config";

const { kakao } = window;

let map; // 고정되어있는 맵

const NearbyModal = ({ isModalActive, setModalActive }) => {
  const [isSubwayBtnOn, setSubwayBtnOn] = useState(true);
  const [isStoreBtnOn, setStoreBtnOn] = useState(true);
  const [isCafeBtnOn, setCafeBtnOn] = useState(true);
  const [isSchoolBtnOn, setSchoolBtnOn] = useState(true);
  const [nearbyList, setNearbyList] = useState([]);
  const [schoolsMarkers, setSchoolsMarkers] = useState([]); // marker 들이 담겨있는 배열
  const [subwaysMarkers, setSubwaysMarkers] = useState([]);
  const [cafesMarkers, setCafesMarkers] = useState([]);
  const [storesMarkers, setStoresMarkers] = useState([]);

  const getModalMap = () => {
    const makeOverListener = (map, marker, infowindow) => {
      return function () {
        infowindow.open(map, marker);
      };
    };

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    const makeOutListener = (infowindow) => {
      return function () {
        infowindow.close();
      };
    };

    const createMarkers = (items, type) =>
      items.map(({ latitude, longitude, name, distance }) => {
        const imageSrc = `images/icon/${type}On.png`;
        const imageSize = new kakao.maps.Size(35, 35);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(latitude, longitude),
          image: markerImage,
          clickable: true,
        });
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width: 150px; text-align:center; font-size: 16px; padding: 10px;">${name} (${distance}m)</div>`,
        });

        kakao.maps.event.addListener(
          marker,
          "mouseover",
          makeOverListener(map, marker, infowindow)
        );

        kakao.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(infowindow)
        );

        return marker;
      });

    const subways = nearbyList.subway;
    const schools = nearbyList.school;
    const stores = nearbyList.convenient_store;
    const cafes = nearbyList.cafe;

    setSubwaysMarkers(createMarkers(subways, "subway"));
    setSchoolsMarkers(createMarkers(schools, "school"));
    setStoresMarkers(createMarkers(stores, "store"));
    setCafesMarkers(createMarkers(cafes, "cafe"));
  };

  const setMarkers = (markers, isRendering) => {
    markers.forEach((marker) => {
      marker.setMap(isRendering ? map : null);
    });
  };

  // componentDidMount
  useEffect(() => {
    fetch(nearbyDataAPI)
      .then((res) => res.json())
      .then((res) => {
        const container = document.getElementById("nearbyMap"); // nearbyMap => 렌더링 되지 않으면.. 안 가져옴..
        const options = {
          center: new kakao.maps.LatLng(37.498618097838815, 127.0287278865303),
          level: 3,
        };

        map = new kakao.maps.Map(container, options);
        setNearbyList(res);
      });
  }, []);

  // useEffect componenDidUpdate 처럼 작동할 것 같지만.. 사실은 아니에요.
  // useEffect 는 무조건 처음에 다 불린다.
  useEffect(() => {
    Object.keys(nearbyList).length && getModalMap();
  }, [nearbyList]);

  useEffect(() => {
    schoolsMarkers.length && setMarkers(schoolsMarkers, isSchoolBtnOn);
    storesMarkers.length && setMarkers(storesMarkers, isStoreBtnOn);
    cafesMarkers.length && setMarkers(cafesMarkers, isCafeBtnOn);
    subwaysMarkers.length && setMarkers(subwaysMarkers, isSubwayBtnOn);
  }, [
    isSubwayBtnOn,
    isStoreBtnOn,
    isCafeBtnOn,
    isSchoolBtnOn,
    schoolsMarkers,
    storesMarkers,
    cafesMarkers,
    subwaysMarkers,
  ]);

  return (
    <ModalBackground onClick={() => setModalActive(!isModalActive)}>
      <NearbyModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <h3 className="title">위치 및 주변 시설</h3>
          <img
            src="images/icon/closeBtn.png"
            alt="누르면 위치 및 주변시설을 끌 수 있어요"
            onClick={() => setModalActive(!isModalActive)}
          />
          <div className="infoBox">
            <span className="detailAddress">서울특별시 강남구 삼성동</span>
            <button className="addressInfo">
              <a href="http://naver.com">위치정보</a>
            </button>
          </div>
        </Header>
        <MapContainer>
          <div className="container">
            <div id="rvWrapper">
              <div id="roadView" />
            </div>
            <div id="mapWrapper">
              <Map id="nearbyMap" />
            </div>
          </div>
        </MapContainer>
        <NearbyModalFooter
          isSubwayBtnOn={isSubwayBtnOn}
          isStoreBtnOn={isStoreBtnOn}
          isCafeBtnOn={isCafeBtnOn}
          isSchoolBtnOn={isSchoolBtnOn}
          setSubwayBtnOn={setSubwayBtnOn}
          setStoreBtnOn={setStoreBtnOn}
          setCafeBtnOn={setCafeBtnOn}
          setSchoolBtnOn={setSchoolBtnOn}
        />
      </NearbyModalContainer>
    </ModalBackground>
  );
};

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #00000080;
  width: 100%;
  height: 100%;
  z-index: 4;
`;

const NearbyModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto auto;
  width: 905px;
  height: 610px;
  font-family: "Spoqa Han Sans", Sans-serif;
  border: 1px solid #eeeeee;
  background-color: #ffffff;
  opacity: 1;
  z-index: 5;
`;

const Header = styled.div`
  ${flexCenter}
  flex-direction: column;
  margin: 20px auto;

  .title {
    margin-bottom: 3px;
    line-height: 40px;
    font-size: 28px;
    font-weight: 600;
    color: #222222;
  }
  img {
    position: absolute;
    top: 20px;
    right: 25px;
    width: 20px;
    :hover {
      cursor: pointer;
    }
  }

  .infoBox {
    ${flexCenter}

    .detailAddress {
      color: #666666;
      font-size: 14px;
    }

    .addressInfo {
      width: 54px;
      height: 22px;
      margin-left: 10px;
      background-color: #ffffff;
      border: 1px solid #d5d5d5;
      color: #000000;
      font-size: 11px;
      outline: none;

      :hover {
        cursor: pointer;
      }
    }
  }
`;

const MapContainer = styled.div`
  #container {
    overflow: hidden;
    position: relative;
    height: 610px;
  }
`;

const Map = styled.div`
  position: relative;
  width: 850px;
  height: 400px;
  margin: 20px auto;
`;

export default NearbyModal;
