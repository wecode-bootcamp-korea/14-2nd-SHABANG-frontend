import React from 'react';
import MapContainer from './components/Map/MapContainer';
import styled from 'styled-components';

export default function Apartment() {
  const LatLngData = {
    lat: '33.450701',
    lng: '126.570667',
  };

  return (
    <ApartmentContainer>
      <MapContainer lat={LatLngData.lat} lng={LatLngData.lng} />
    </ApartmentContainer>
  );
}

const ApartmentContainer = styled.main`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
`;
