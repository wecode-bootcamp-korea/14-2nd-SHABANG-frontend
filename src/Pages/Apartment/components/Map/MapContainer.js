/*global kakao*/

import React, { useState, useEffect, Component } from 'react';
import styled from 'styled-components';
import { APARTMENT_API_KEY } from '../../../../Config';

const pridceUnder20 = 'd98723';
const priceAbove20 = 'b85c06';

const MapContainer = (props) => {
  const [zoomLevel, setZoomLevel] = useState(4);
  const [placeData, setPlaceData] = useState([]);
  const [zoomData, setZoomData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [currentLat, setCurrentLat] = useState('37.5063702427027');
  const [currentLng, setCurrentLng] = useState('127.053641718718');

  useEffect(() => {
    fetch(
      `${APARTMENT_API_KEY}/apartment/map?zoom_level=${4}&latitude=${
        props.lat
      }&longitude=${props.lng}&size1=${1}&size2=${21}`
    )
      .then((res) => res.json())
      .then((res) => setPlaceData([...res.result[10], ...res.result[20]]));
  }, []);

  useEffect(() => {
    if (placeData.length) {
      if (zoomLevel >= 5) {
        getZoomedMap();
      } else {
        getMap();
      }
    }
  }, [placeData, zoomLevel]);
  console.log(zoomLevel);
  useEffect(() => {
    getMap();
  }, [props.userClickedFilteredData]);

  const getMap = () => {
    const { kakao } = window;
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(
        props.userClickedFilteredData
          ? props.userClickedFilteredData.lat
          : currentLat,
        props.userClickedFilteredData
          ? props.userClickedFilteredData.lng
          : currentLng
      ),
      level: zoomLevel,
    };

    const map = new kakao.maps.Map(container, options);

    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      let getLevel = map.getLevel();
      setZoomLevel(getLevel);
    });

    kakao.maps.event.addListener(map, 'center_changed', function () {
      let latlng = map.getCenter();
      setCurrentLat(latlng.getLat());
      setCurrentLng(latlng.getLng());
    });

    let imageSrc = '/images/apt-img.png';

    for (let i = 0; i < placeData.length; i++) {
      let imageSize = new kakao.maps.Size(30, 40);
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      let lat = placeData[i].complex_latitude;
      let lng = placeData[i].complex_longitude;
      let id = placeData[i].complex_id;

      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(lat, lng),
        title: placeData[i].complex_name,
        image: markerImage,
        id: placeData[i].complex_id,
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        props.getClickedinformationMarker(id);
        console.log('자식 컴포넌트');
      });

      let minPrice = placeData[i].min_price.toString().slice(0, 2);

      let maxPrice = placeData[i].max_price.toString().slice(0, 2);

      let price = `<div className="label" style="padding:8px; border-radius: 10px; background-color: #${
        minPrice > 20 ? priceAbove20 : pridceUnder20
      }; color:white;">
                    <div className="price-minimum" style="font-weight:bold font-size:13px;">
                    ${minPrice} 억
                    </div>
                    <div className="price-maximum" style="font-size:10px;">
                    ~${maxPrice} 억
                    </div>
                  </div>`;
      let title = `<div className="title">
                    <div className="center" style="padding:5px; border-radius: 5px; background-color: rgba(0,0,0,0.5); color:white; font-size:10px;">
                    ${placeData[i].complex_name}
                   </div>
                  </div>`;

      let customOverlayPrice = new kakao.maps.CustomOverlay({
        content: price,
        map: map,
        position: marker.getPosition(),
        yAnchor: 2.0,
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

    if (zoomLevel >= 5) {
      fetch(
        `${APARTMENT_API_KEY}/apartment/map?zoom_level=${zoomLevel}&latitude=${currentLat}&longitude=${currentLng}&size1=${1}&size2=${21}`
      )
        .then((res) => res.json())
        .then((res) => {
          setZoomData(res.result);

          for (let i = 0; i < zoomData.length; i++) {
            let AveragePrice = zoomData[i].average_price.toString().slice(0, 2);
            let price = `<div className="label" style="padding:10px; background-color: #d98723; border-radius:20px; text-align:center;">
                                        <div className="column-title" style="font-size: 13px; color:white; text-align:center;">
                                             ${zoomData[i].neighborhood_name}
                                        </div>
                                        <br/>
                                        <div className="column-price" style="font-size:20px; color:white;">
                                             ${AveragePrice} 억
                                        </div>
                                      </div>`;

            let lat = zoomData[i].latitude;
            let lng = zoomData[i].longitude;
            let id = placeData[i].complex_id;

            let marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(lat, lng),
            });

            kakao.maps.event.addListener(marker, 'click', function () {
              props.getClickedinformationMarker(id);
            });

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
    if (zoomLevel < 5) {
      let imageSrc = '/images/apt-img.png';
      fetch(
        `${APARTMENT_API_KEY}/apartment/map?zoom_level=${zoomLevel}&latitude=${
          props.lat
        }&longitude=${props.lng}&size1=${1}&size2=${21}`
      )
        .then((res) => res.json())
        .then((res) => {
          setPlaceData(res.placeData);

          for (let i = 0; i < placeData.length; i++) {
            let imageSize = new kakao.maps.Size(30, 40);
            let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            let lat = placeData[i].complex_latitude;
            let lng = placeData[i].complex_longitude;
            let id = placeData[i].complex_id;

            let marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(lat, lng),
              title: placeData[i].complex_name,
              image: markerImage,
            });

            kakao.maps.event.addListener(marker, 'click', function () {
              props.getClickedinformationMarker(id);
            });

            let minPrice = placeData[i].min_price.toString().slice(0, 2);
            console.log(minPrice);
            let maxPrice = placeData[i].max_price.toString().slice(0, 2);

            let price = `<div className="label" style="padding:8px; border-radius: 10px; background-color: #${
              minPrice > 20 ? priceAbove20 : pridceUnder20
            }; color:white;">
                <div className="price-minimum" style="font-weight:bold font-size:13px;">
                ${minPrice} 억
                </div>
                <div className="price-maximum" style="font-size:10px;">
                ~${maxPrice} 억
                </div>
              </div>`;
            let title = `<div className="title">
            <div className="center" style="padding:5px; border-radius: 5px; background-color: rgba(0,0,0,0.5); color:white; font-size:10px;">
            ${placeData[i].complex_name}
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
  height: 100%;
  width: 100%;
  .center {
    width: 100%;
    height: 100%;
  }
`;
