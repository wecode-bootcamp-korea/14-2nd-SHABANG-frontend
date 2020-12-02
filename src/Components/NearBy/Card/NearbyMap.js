import React, { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;

const NearbyMap = () => {
  const getMap = () => {
    const staticMapContainer = document.getElementById("myMap");
    const staticMapOption = {
      center: new kakao.maps.LatLng(37.506506386657676, 127.0536728317191),
      level: 3,
    };
    const staticMap = new kakao.maps.StaticMap(
      staticMapContainer,
      staticMapOption
    );
  };

  useEffect(() => {
    getMap();
  }, []);

  return (
    <MapImg>
      <div id="myMap">
        <PreventKaKaoMapClick />
        <MapShowDetail>
          <span>자세히 보기</span>
        </MapShowDetail>
      </div>
    </MapImg>
  );
};

const MapImg = styled.div`
  #myMap {
    position: relative;
    width: 363px;
    height: 165px;
  }
`;

const PreventKaKaoMapClick = styled.div`
  position: absolute;
  width: 363px;
  height: 165px;
  background-color: #ffffff;
  opacity: 0.1;
  z-index: 2;
`;

const MapShowDetail = styled.div`
  position: absolute;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 363px;
  height: 45px;
  background-color: rgb(255, 255, 255, 0.7);
  border: 1px solid #eeeeee;
  z-index: 3;
`;

export default NearbyMap;
