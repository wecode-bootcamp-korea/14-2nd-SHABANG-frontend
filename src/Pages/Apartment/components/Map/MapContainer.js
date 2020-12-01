/*global kakao*/

import React, { useState, useEffect, Component } from 'react';
import styled from 'styled-components';

// 추후 사용 예정
// import { KAKAO_MAP_API_KEY } from '../../../../Config';

const pridceUnder20 = 'd98723';
const priceAbove20 = 'b85c06';

const MapContainer = () => {
  const [zoomLevel, setZoomLevel] = useState(5);
  const [placeData, setPlaceData] = useState([]);
  const [zoomData, setZoomData] = useState([]);

  useEffect(() => {
    fetch('./data/beforeLevel6Positions.json')
      .then((res) => res.json())
      .then((res) => {
        setPlaceData(res.placeData);
        setZoomData(res.zoomedData);
      });
  }, []);

  useEffect(() => {
    if (placeData.length) {
      if (zoomLevel >= 6) {
        getZoomedMap();
      } else {
        getMap();
      }
    }
  }, [placeData, zoomLevel]);

  const getMap = () => {
    const { kakao } = window;
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5063702427027, 127.053641718718),
      level: zoomLevel,
    };

    const map = new kakao.maps.Map(container, options);

    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      let getLevel = map.getLevel();
      setZoomLevel(getLevel);
    });

    let imageSrc = '/images/apt-img.png';

    for (let i = 0; i < placeData.length; i++) {
      let imageSize = new kakao.maps.Size(30, 40);
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      let lat = placeData[i].lat;
      let lng = placeData[i].lng;

      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(lat, lng),
        title: placeData[i].title,
        image: markerImage,
      });

      let price = `<div className="label" style="padding:8px; border-radius: 10px; background-color: #${
        placeData[i].minimum_price > 20 ? priceAbove20 : pridceUnder20
      }; color:white;">
                    <div className="price-minimum" style="font-weight:bold font-size:13px;">
                    ${placeData[i].minimum_price} 억
                    </div>
                    <div className="price-maximum" style="font-size:10px;">
                    ~${placeData[i].maximum_price} 억
                    </div>
                  </div>`;
      let title = `<div className="title">
                    <div className="center" style="padding:5px; border-radius: 5px; background-color: rgba(0,0,0,0.5); color:white; font-size:10px;">
                    ${placeData[i].title}
                   </div>
                  </div>`;

      let customOverlayPrice = new kakao.maps.CustomOverlay({
        content: price,
        map: map,
        position: marker.getPosition(),
        yAnchor: 1.8,
        xAnchor: 0.44,
      });

      let customOverlayTitle = new kakao.maps.CustomOverlay({
        content: title,
        map: map,
        position: marker.getPosition(),
        yAnchor: -0.7,
        xAnchor: 0.5,
      });

      customOverlayTitle.setMap(map);
      customOverlayPrice.setMap(map);
    }
    map.relayout();
  };

  const getZoomedMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5063702427027, 127.053641718718),
      level: zoomLevel,
    };

    const map = new kakao.maps.Map(container, options);

    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      let getLevel = map.getLevel();
      setZoomLevel(getLevel);
    });

    if (zoomLevel >= 6) {
      fetch('./data/beforeLevel6Positions.json')
        .then((res) => res.json())
        .then((res) => {
          setZoomData(res.zoomedData);

          for (let i = 0; i < zoomData.length; i++) {
            let price = `<div className="label" style="padding:10px; background-color: #d98723; border-radius:20px; text-align:center;">
                                        <div className="column-title" style="font-size: 13px; color:white; text-align:center;">
                                             ${zoomData[i].title}
                                        </div>
                                        <br/>
                                        <div className="column-price" style="font-size:20px; color:white;">
                                             ${zoomData[i].average_price} 억
                                        </div>
                                      </div>`;

            let lat = zoomData[i].lat;
            let lng = zoomData[i].lng;

            let marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(lat, lng),
            });
            console.log(marker, 'marker');
            let customOverlayPrice = new kakao.maps.CustomOverlay({
              content: price,
              map: map,
              position: marker.getPosition(),
            });

            customOverlayPrice.setMap(map);
          }
          map.relayout();
        });
    }
    if (zoomLevel < 6) {
      let imageSrc = '/images/apt-img.png';
      fetch('./data/beforeLevel6Positions.json')
        .then((res) => res.json())
        .then((res) => {
          setPlaceData(res.placeData);
          setZoomData(res.zoomedData);

          for (let i = 0; i < placeData.length; i++) {
            let imageSize = new kakao.maps.Size(30, 40);
            let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            let lat = placeData[i].lat;
            let lng = placeData[i].lng;
            let marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(lat, lng),
              title: placeData[i].title,
              image: markerImage,
            });

            let price = `<div className="label" style="padding:8px; border-radius: 10px; background-color: #${
              placeData[i].minimum_price > 20 ? priceAbove20 : pridceUnder20
            }; color:white;">
                <div className="price-minimum" style="font-weight:bold font-size:13px;">
                ${placeData[i].minimum_price} 억
                </div>
                <div className="price-maximum" style="font-size:10px;">
                ~${placeData[i].maximum_price} 억
                </div>
              </div>`;
            let title = `<div className="title">
            <div className="center" style="padding:5px; border-radius: 5px; background-color: rgba(0,0,0,0.5); color:white; font-size:10px;">
            ${placeData[i].title}
           </div>
          </div>`;

            let customOverlayPrice = new kakao.maps.CustomOverlay({
              content: price,
              map: map,
              position: marker.getPosition(),
              yAnchor: 1.8,
              xAnchor: 0.44,
            });

            let customOverlayTitle = new kakao.maps.CustomOverlay({
              content: title,
              map: map,
              position: marker.getPosition(),
              yAnchor: -0.7,
              xAnchor: 0.5,
            });
            customOverlayPrice.setMap(map);
            customOverlayTitle.setMap(map);
          }
          map.relayout();
        });
    }
  };
  return <MapElement id='map' />;
};

export default MapContainer;

const MapElement = styled.div`
  width: 100%;
  height: 100%;
  .center {
    width: 100%;
    height: 100%;
  }
`;
