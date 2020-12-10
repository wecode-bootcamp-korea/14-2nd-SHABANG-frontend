import React, { useState, useEffect } from "react";
import { oneRoomDataAPI } from "../../../../Config";
import styled from "styled-components";
import SideBar from "../SideBar/SideBar";

const { kakao } = window;

const Map = () => {
  const [oneroom, setOneRoom] = useState([]);
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(oneRoomDataAPI)
      .then((response) => response.json())
      .then((oneroom) => {
        setOneRoom(oneroom.oneroom, oneroom.totalcount);
      });
    mapscript();
  }, []);

  useEffect(() => {
    mapscript();
  }, [oneroom]);

  console.log(oneroom);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.505169, 127.050346),
      level: 7,
      minLevel: 1,
    };

    const map = new kakao.maps.Map(container, options);

    let markers = oneroom.map(
      (position) =>
        new kakao.maps.Marker({
          position: new kakao.maps.LatLng(position.lat, position.lng),
        })
    );

    let clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 1,
      disableClickZoom: true,
      calculater: [3, 6, 9],
      styles: [
        {
          width: "50px",
          height: "50px",
          background: "#FA880B",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
          opacity: ".8",
          borderRadius: "30px",
          lineHeight: "51px",
          border: "1px solid #FA880B ",
        },
        {
          width: "70px",
          height: "70px",
          background: "#FA880B",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          opacity: ".8",
          borderRadius: "40px",
          lineHeight: "71px",
          border: "1px solid #FA880B",
        },
        {
          width: "90px",
          height: "90px",
          background: "#FA880B",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "32px",
          opacity: ".8",
          borderRadius: "60px",
          lineHeight: "91px",
          border: "1px solid #FA880B",
        },
      ],
    });
    clusterer.setMinClusterSize(1);
    clusterer.addMarkers(markers);

    kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster) {
      let level = map.getLevel() - 1;
      map.setLevel(level, { anchor: cluster.getCenter() });
    });

    kakao.maps.event.addListener(map, "center_changed", function () {
      let level = map.getLevel();

      let latlng = map.getCenter();

      let message = "<p>지도 레벨은 " + level + " 이고</p>";
      message +=
        "<p>중심 좌표는 위도 " +
        latlng.getLat() +
        ", 경도 " +
        latlng.getLng() +
        "입니다</p>";

      console.log(message);
    });
  };

  return (
    <Main>
      <div
        id="map"
        style={{
          width: "100%",
          height: "100vh",
        }}
      ></div>
      {/* <SideBar oneroom={oneroom} /> */}
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export default Map;

// let markerPosition = new kakao.maps.LatLng(37.507636, 127.057748);

// let marker = new kakao.maps.Marker({
//   position: markerPosition,
// });

// marker.setMap(map); //마커를 지도에 표시 할 때 사용

// markerData.forEach((marker) => {
//   new kakao.maps.Marker({
//     map: map,
//     position: new kakao.maps.LatLng(marker.lat, marker.lng),
//     title: marker.title,
//   });
// });

// useEffect(() => {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title: "React Hooks POST Request Example" }),
//   };
//   fetch("http://192.168.35.228:8000/room/map20", requestOptions)
//     .then((response) => response.json())
//     .then((data) => {
//       setPost(data);
//     });
// }, []);

// let getInfo = () => {
//   let center = map.getCenter();
//   let level = map.getLevel();

//   let message = "지도 중심좌표는 위도 " + center.getLat();
//   message += "경도 " + center.getLng();
//   // console.log("결과", message);
//   console.log(center);
//   console.log(level);
// };

// getInfo();
