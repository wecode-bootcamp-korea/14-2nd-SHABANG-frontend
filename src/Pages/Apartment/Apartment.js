import React, { useState } from 'react';
import ProductDetail from './../Apartment/components/ProductDetail';
import Filter from '../Apartment/components/Filter';
import MapContainer from '../Apartment/components/Map/MapContainer';
import styled from 'styled-components';
import Animation from './components/Animation';
import { APARTMENT_API_KEY, APARTMENT_SEARCH_API_KEY } from '../../Config';

const Apartment = () => {
  const [isDetail, setIsDetail] = useState(false);
  const [userClickedFilteredData, setUsetClickedFilteredData] = useState('');
  const [userSelectType, userSelectSetType] = useState('');
  const [userSelectArea, userSelectSetArea] = useState('');
  const [userSelectFoundation, userSelectSetFoundation] = useState('');
  const [userSelecthouseHolds, userSelectSetUserSelectHouseHolds] = useState(
    ''
  );
  const [detailData, setDetailData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [isAnimation, setIsAnimation] = useState(false);

  const AREAFILTER = [
    {
      전체: [1, 21],
    },
    {
      '10평 이하': [1, 2],
    },
    {
      '10평대': [3, 5],
    },
    {
      '20평대': [6, 8],
    },
    {
      '30평대': [9, 12],
    },
    {
      '40평대': [13, 15],
    },
    {
      '50평대': [16, 18],
    },
    {
      '60평 이상': [19, 21],
    },
  ];

  const LatLngData = {
    lat: '33.450701',
    lng: '126.570667',
  };

  const getClickedinformationMarker = (id) => {
    fetch(`${APARTMENT_API_KEY}/apartment/complex/${id}`)
      .then((res) => res.json())
      .then((res) => setDetailData(res.complex));

    fetch(`${APARTMENT_SEARCH_API_KEY}/apartment/graph/160?size_id=40`)
      .then((res) => res.json())
      .then((res) => setGraphData(res));
    setIsDetail(!isDetail);
  };
  console.log(graphData);

  const toServerUserClick = (name, idx, cnt) => {
    const selectedButton = AREAFILTER.find((el) => el === AREAFILTER[idx]);
  };

  const onClickFilteredData = (place) => {
    console.log(place);
    fetch(
      `${APARTMENT_API_KEY}/apartment/map?zoom_level=${4}&latitude=${
        place.latitude
      }&longitude=${place.longitude}&size1=${1}&size2=${21}`
    )
      .then((res) => res.json())
      .then((res) => console.log(res.result));
    setUsetClickedFilteredData(place);
  };
  console.log(userClickedFilteredData);

  const onChangeUserSelectKeyword = (e) => {
    if (e.target.localName === 'input') {
      if (e.target.name === 'type') {
        userSelectSetType(e.target.value);
      }

      if (e.target.name === 'area') {
        userSelectSetArea(e.target.value);
      }

      if (e.target.name === 'foundation') {
        userSelectSetFoundation(e.target.value);
      }

      if (e.target.name === 'houseHolds') {
        userSelectSetUserSelectHouseHolds(e.target.value);
      }
    }
  };
  const setIsDetailClose = () => {
    setIsDetail(false);
  };
  const setIsAnimationOpen = () => {
    setIsAnimation(true);
  };
  console.log(isAnimation);
  return (
    <ApartmentContainer>
      {/* <Animation isAnimation={isAnimation} /> */}
      <Filter
        onClickFilteredData={onClickFilteredData}
        onChangeUserSelectKeyword={onChangeUserSelectKeyword}
        toServerUserClick={toServerUserClick}
      />
      <MapContainer
        userSelectType={userSelectType}
        userSelectArea={userSelectArea}
        userSelectFoundation={userSelectFoundation}
        userSelecthouseHolds={userSelecthouseHolds}
        lat={LatLngData.lat}
        lng={LatLngData.lng}
        userClickedFilteredData={userClickedFilteredData}
        getClickedinformationMarker={getClickedinformationMarker}
      />
      <ProductDetail
        isDetail={isDetail}
        setIsDetailClose={setIsDetailClose}
        detailData={detailData}
        graphData={graphData}
        setIsAnimationOpen={setIsAnimationOpen}
      />
    </ApartmentContainer>
  );
};

const ApartmentContainer = styled.main`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

export default Apartment;
