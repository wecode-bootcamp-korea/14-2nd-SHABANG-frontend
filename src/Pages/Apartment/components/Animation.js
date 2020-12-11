import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Animation(props) {
  let imageSrc = '/images/apt_img.png';

  return (
    <Wrap className={props.isAnimation ? 'show' : ''}>
      <ImgContainer>
        <img src={imageSrc} alt='' />
      </ImgContainer>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #00000080;
  width: 100%;

  z-index: 4;
`;
const ImgContainer = styled.div`
  display: flex;
  position: absolute;
  top: 30%;
  left: 30%;
`;
