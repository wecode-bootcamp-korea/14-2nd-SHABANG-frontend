import React from "react";
import styled from "styled-components";

const SearchBox = (props) => {
  return (
    <>
      <MainBox>
        <InputBox>
          <SearchRegion type="text" />
          <SearchRegionBt type="button" />
        </InputBox>
        <InputBox>
          <CheckRentType type="select" />
          <SearchRent type="input" />
          <Filter type="button" />
        </InputBox>
        <RemoveBox>
          <Xbutton type="button">X</Xbutton>
          <span
            style={{ fontSize: "18px", width: "197px", marginLeft: "18px" }}
          >
            필터
          </span>
          <AllRest type="button">모두 초기화</AllRest>
        </RemoveBox>
      </MainBox>
    </>
  );
};

const MainBox = styled.div`
  height: 619.2px;
  width: 360px;
  border: 1px solid black;
`;

const InputBox = styled.div`
  height: 50px;
  width: 100%;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const SearchRegion = styled.input`
  height: 30px;
  width: 307px;
  border: 1px solid blue;
`;

const SearchRegionBt = styled.button`
  height: 30px;
  width: 30px;
  border: 1px solid orange;
`;

const CheckRentType = styled.input`
  height: 30px;
  width: 78px;
  margin-right: 6px;
`;

const SearchRent = styled.input`
  height: 30px;
  width: 193px;
  border: 1px solid #e1e1e1;
`;

const Filter = styled.button`
  height: 30px;
  width: 60px;
  border: 0px solid black;
`;

const RemoveBox = styled.div`
  height: 55px;
  width: 100%;
  border: 1px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Xbutton = styled.button`
  height: 48px;
  width: 48px;
  border: 1px solid black;
`;

const AllRest = styled.button`
  height: 48px;
  width: 78px;
  margin-left: 15px;
  border: 0px solid black;
`;

export default SearchBox;
