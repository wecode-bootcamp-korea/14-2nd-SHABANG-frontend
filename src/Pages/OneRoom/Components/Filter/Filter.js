import React, { useState, useRef, useEffect } from "react";
import styled, { ThemeProvider, css } from "styled-components";
import FilterElement from "./FilterElement";
// import { ButtonNameArray } from './ButtonNameArray.js';
import Select from "react-select";

export default function Filter(props) {
  const [inputResult, setInput] = useState("");
  const [regionData, setRegionData] = useState([]);
  const [selectResult, setSelectResult] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [estateType, setEstateType] = useState("");
  const [areaType, setAreaType] = useState("전체");
  const [foundationType, setFoundationType] = useState("전체");
  const [houseHoldsType, setHouseHoldsType] = useState("전체");
  const [isClickedType, setIsClickedType] = useState("");
  const [isClickedArea, setIsClickedArea] = useState("");
  const [isClickedFoundation, setIsClickedFoundation] = useState("");
  const [isClickedHouseHolds, setIsClickedHouseHolds] = useState("");
  const [clickCountLimit, setClickCountLimt] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [areaButtons, setAreaButtons] = useState([
    {
      name: "전체",
      isOn: false,
    },
    {
      name: "10평 이하",
      isOn: false,
    },
    {
      name: "10평대",
      isOn: false,
    },
    {
      name: "20평대",
      isOn: false,
    },
    {
      name: "30평대",
      isOn: false,
    },
    {
      name: "40평대",
      isOn: false,
    },
    {
      name: "50평대",
      isOn: false,
    },
    {
      name: "60평 이상",
      isOn: false,
    },
  ]);

  const TYPEARRAY = ["월세", "전세"];
  // const AREAARRAY = [
  //   "전체",
  //   "10평 이하",
  //   "10평대",
  //   "20평대",
  //   "30평대",
  //   "40평대",
  //   "50평대",
  //   "60평대",
  // ];
  // const FOUNDATIONARRAY = [
  //   "전체",
  //   "5년 이내",
  //   "10년 이내",
  //   "15년 이내",
  //   "20년 이내",
  // ];
  // const HOUSEHOLDSARRAY = [
  //   "전체",
  //   "200세대 이상",
  //   "500세대 이상",
  //   "1000세대 이상",
  //   "2000세대 이상",
  // ];

  const theme = {
    color: "#f09330",
  };
  const options = [
    { value: "월세", label: "월세" },
    { value: "전세", label: "전세" },
  ];

  useEffect(() => {
    fetch("./data/beforeLevel6Positions.json")
      .then((res) => res.json())
      .then((res) => {
        setRegionData(res.region);
      });
  }, []);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const addResult = (e) => {
    if (!duplicateChecker(e.target.value)) {
      setSelectResult([...selectResult, e.target.value]);
    } else {
      return;
    }
  };

  const setUserSelect = (name, value) => {
    const mapper = {
      type: () => {
        setEstateType(value);
      },
      area: () => {
        setAreaType(value);
      },
      foundation: () => {
        setFoundationType(value);
      },
      houseHolds: () => {
        setHouseHoldsType(value);
      },
    };
    mapper[name]();
    console.log(mapper);
  };

  const onButtonClickedHandler = (e) => {
    const { name, value } = e.target;
    setUserSelect(name, value);

    // if (e.target.localName === 'input') {
    //   if (e.target.name === 'type') {
    // setEstateType(e.target.value);
    // setIsClickedType(e.target.dataset.id);
    //   }

    //   if (e.target.name === 'area') {
    //     setAreaType(e.target.value);
    //     setIsClickedArea(e.target.dataset.id);
    //   }

    //   if (e.target.name === 'foundation') {
    //     setFoundationType(e.target.value);
    //     setIsClickedFoundation(e.target.dataset.id);
    //   }

    //   if (e.target.name === 'houseHolds') {
    //     setHouseHoldsType(e.target.value);
    //     setIsClickedHouseHolds(e.target.dataset.id);
    //   }
    // }
  };

  const typeInputHandler = (e) => {
    setEstateType(e.value);
  };

  const modalHandler = () => {
    setIsModal(!isModal);
  };

  const clearHandler = () => {
    setEstateType("");
    setFoundationType("전체");
    setAreaType("전체");
    setHouseHoldsType("전체");
    setIsClickedType(0);
    setIsClickedArea(0);
    setIsClickedFoundation(0);
    setIsClickedHouseHolds(0);
    setSelectResult([]);
  };

  const duplicateChecker = (el) => {
    for (let i = 0; i < selectResult.length; i++) {
      if (selectResult.indexOf(el) > -1) {
        return true;
      } else {
        return false;
      }
    }
  };

  const filter = (data) => {
    let filtredList = data.filter((place) => {
      return place.title.indexOf(inputResult) > -1;
    });
    return filtredList.map((filtered, idx) => {
      return (
        <FilterElement
          key={idx}
          place={filtered}
          onClickFilteredData={props.onClickFilteredData}
        />
      );
    });
  };

  // const setColors = (index) => {
  //   console.log(index);
  //   return areaButtons.map((btn, idx) => {
  //     const isSelected = idx >= startIndex && idx <= endIndex;
  //     console.log(startIndex, endIndex);
  //     console.log(isSelected);
  //     if (isSelected) {
  //       return { ...btn, isOn: true };
  //     }

  //     return { ...btn, isOn: false };
  //   });
  // };
  // console.log(areaButtons);
  if (clickCountLimit === 2) {
    setClickCountLimt(0);
  }
  return (
    <ThemeProvider theme={theme}>
      <FilterWrap>
        <FilterTop>
          <FilterInput>
            <input
              type="text"
              className="filter-input"
              onChange={inputHandler}
              onKeyPress={() => setIsFilter(true)}
            />
            <div className="filter-btn-wrap">
              <i className="fas fa-search" />
            </div>
          </FilterInput>
          <FilterResultList isFilter={isFilter} inputResult={inputResult}>
            <ListWrap>{filter(regionData)}</ListWrap>
          </FilterResultList>
          <FilterSelect>
            <Select
              className="select-option"
              options={options}
              placeholder={estateType}
              onChange={typeInputHandler}
            />
            <input
              type="button"
              className="filter-modal-on"
              value={selectResult}
            />
            <div className="filter-modal-btn">
              <i className="fas fa-cogs"></i>
              <span className="filter-span" onClick={modalHandler}>
                필터
              </span>
            </div>
          </FilterSelect>
        </FilterTop>
        <FilterBottom isModal={isModal}>
          <FilterModal>
            <div className="modal-wrap">
              <div className="modal-header">
                <div className="left">
                  <input type="button" value="X" />
                  <div>필터</div>
                </div>
                <div className="right">
                  <input
                    type="button"
                    value="모두 초기화"
                    onClick={clearHandler}
                  />
                </div>
              </div>
              <ModalCardWrap>
                <CardType>
                  <div className="category">거래 유형</div>
                  <div className="title">{estateType}</div>
                  <CardTypeInput
                    isClickedType={isClickedType}
                    onClick={(e) => {
                      onButtonClickedHandler(e);
                      // props.onChangeUserSelectKeyword(e);
                    }}
                  >
                    {TYPEARRAY.map((type, idx) => {
                      return (
                        <input
                          type="button"
                          key={idx}
                          data-id={idx}
                          id={idx}
                          className={
                            isClickedType === idx ? "activeTypeBtn" : ""
                          }
                          value={type}
                          onClick={(e) => {
                            addResult(e);
                            setIsClickedType(idx);
                          }}
                          name="type"
                        />
                      );
                    })}
                  </CardTypeInput>
                </CardType>
              </ModalCardWrap>
            </div>
          </FilterModal>
        </FilterBottom>
      </FilterWrap>
    </ThemeProvider>
  );
}

const FilterWrap = styled.section`
  position: fixed;
  width: 355px;
  height: 450px;
  margin: 150px 0px 0px 20px;
  /* overflow: scroll; */
  z-index: 10000;
`;

const FilterInput = styled.form`
  display: flex;
  position: relative;

  .filter-input {
    width: 100%;
    padding: 6px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #d98730;
  }
  .filter-btn-wrap {
    position: absolute;
    padding: 5px 6px;
    top: 0;
    right: 0;
    background-color: ${(props) => props.theme.color};
    border-radius: 5px;
    i {
      color: white;
    }
  }
`;
const FilterSelect = styled.div`
  padding-top: 10px;
  display: flex;
  input[value] {
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    padding-right: 1px;
    margin-right: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    outline: none;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .select-option {
    width: 80px;
    margin-right: 10px;
    .css-yk16xz-control {
      outline: none;
      .css-1wa3eu0-placeholder {
        font-size: 12px;
      }
      .css-tlfecz-indicatorContainer {
        padding: 2px;
      }
    }
  }
  .filter-modal-on {
    width: 190px;
    padding: 10px 10px;
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
  .filter-modal-btn {
    width: 50px;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.9);
    padding: 10px;
    i {
      position: absolute;
      font-size: 12px;
      top: 12px;
      left: 3px;
    }
    span {
      position: absolute;
      font-size: 13px;
      top: 12px;
      right: 5px;
    }
  }
`;
const FilterTop = styled.div`
  position: fixed;
  background-color: white;
  padding: 10px;
`;
const FilterResultList = styled.div`
  display: none;
  border-radius: 10px;
  ${(props) =>
    props.isFilter === true &&
    props.inputResult !== "" &&
    css`
      display: block;
    `}
  width: 100%;
  height: 100%;

  overflow: scroll;
  z-index: 10001;
  background-color: white;
`;
const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 80%;
  top: 40px;
  left: 10px;
  background-color: white;
  z-index: 10001;
  border: 1px solid rgba(0, 0, 0, 0.4);
  .card {
    z-index: 10000;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;

    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    .place-title {
      font-size: 25px;
      font-weight: bold;
      padding: 10px 0px;
    }
    .place-address {
    }
  }
`;

const FilterBottom = styled.div`
  display: ${(props) => (props.isModal ? "block" : "none")};
  width: 100%;
  padding-top: 100px;

  .modal-wrap {
    height: 100%;
    width: 350px;
    .modal-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      background-color: white;
      height: 56px;
      padding: 0 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80px;
        input {
          border: none;
          background: transparent;
          font-size: 18px;
        }
        div {
          font-size: 18px;
        }
      }
      .right {
        display: flex;
        input {
          border: none;
          background: transparent;
          align-items: center;
          font-size: 18px;
        }
      }
    }
  }
`;
const FilterModal = styled.div`
  background: white;
  /* height: 950px; */
`;
const ModalCardWrap = styled.div`
  height: 20vh;
  padding: 10px;
  background: white;
`;
const CardType = styled.div`
  display: flex;
  flex-direction: column;
  height: 135px;
  margin-bottom: 40px;

  .category {
    padding-top: 20px;
  }
  .title {
    font-size: 30px;
    padding: 15px 0px;
    font-weight: bold;
    color: ${(props) => props.theme.color};
  }
`;

const CardTypeInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0px;
  border-bottom: 1px solid ${(props) => props.theme.color};
  input {
    width: 160px;
    padding: 10px 0px;
    background: white;
    outline: none;
    font-weight: bold;
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
  .activeTypeBtn {
    background: black;
    outline: none;
    font-weight: bold;
    color: white;
  }
`;
const CardArea = styled(CardType)``;

const CardAreaInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1px;
  width: 340px;
  padding-bottom: 30px;
  border-bottom: 1px solid ${(props) => props.theme.color};
  input {
    background: white;
    width: 80px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    padding: 8px;
  }
  .activeAreaBtn {
    background: black;
    outline: none;
    font-weight: bold;
    color: white;
  }
`;

const CardFoundation = styled(CardArea)`
  padding-top: 60px;
`;

const CardFoundationInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding-bottom: 30px;
  border-bottom: 1px solid ${(props) => props.theme.color};
  input {
    background: white;
    width: 80px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    padding: 8px;
  }
  .activeFoundationBtn {
    background: black;
    outline: none;
    font-weight: bold;
    color: white;
  }
`;

const CardHouseholds = styled(CardFoundation)`
  padding-top: 120px;
`;
const CardHouseholdInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3px;

  input {
    width: 110px;
    height: 40px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    background: white;
  }
  .activeHouseholdsBtn {
    background: black;
    outline: none;
    font-weight: bold;
    color: white;
  }
`;
