import React, { useState } from 'react';
import Filter from '../Apartment/components/Filter';
import MapContainer from '../Apartment/components/Map/MapContainer';
import styled from 'styled-components';

export default function Apartment() {
  const [userClickedFilteredData, setUsetClickedFilteredData] = useState('');
  const [userSelectType, userSelectSetType] = useState('');
  const [userSelectArea, userSelectSetArea] = useState('');
  const [userSelectFoundation, userSelectSetFoundation] = useState('');
  const [userSelecthouseHolds, userSelectSetUserSelectHouseHolds] = useState(
    ''
  );

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

  const toServerUserClick = (name, idx, cnt) => {
    console.log(cnt);
    const selectedButton = AREAFILTER.find((el) => el === AREAFILTER[idx]);
    console.log(selectedButton[name][cnt]);
  };

  const onClickFilteredData = (place) => {
    setUsetClickedFilteredData(place);
  };

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

  return (
    <ApartmentContainer>
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
      />
    </ApartmentContainer>
  );
}

const ApartmentContainer = styled.main`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
`;
