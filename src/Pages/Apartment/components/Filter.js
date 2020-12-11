import React, { useState, useRef, useEffect } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import FilterElement from './FilterElement';
// import { ButtonNameArray } from './ButtonNameArray.js';
import Select from 'react-select';
import { APARTMENT_SEARCH_API_KEY } from '../../../Config';

export default function Filter(props) {
  const [inputResult, setInput] = useState('');
  const [regionData, setRegionData] = useState([]);
  const [selectResult, setSelectResult] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [estateType, setEstateType] = useState('');
  const [areaType, setAreaType] = useState('전체');
  const [foundationType, setFoundationType] = useState('전체');
  const [houseHoldsType, setHouseHoldsType] = useState('전체');
  const [isClickedType, setIsClickedType] = useState('');
  const [isClickedArea, setIsClickedArea] = useState('');
  const [isClickedFoundation, setIsClickedFoundation] = useState('');
  const [isClickedHouseHolds, setIsClickedHouseHolds] = useState('');
  const [clickCountLimit, setClickCountLimt] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [areaButtons, setAreaButtons] = useState([
    {
      name: '전체',
      isOn: false,
    },
    {
      name: '10평 이하',
      isOn: false,
    },
    {
      name: '10평대',
      isOn: false,
    },
    {
      name: '20평대',
      isOn: false,
    },
    {
      name: '30평대',
      isOn: false,
    },
    {
      name: '40평대',
      isOn: false,
    },
    {
      name: '50평대',
      isOn: false,
    },
    {
      name: '60평 이상',
      isOn: false,
    },
  ]);

  const TYPEARRAY = ['매매', '전세'];

  const FOUNDATIONARRAY = [
    '전체',
    '5년 이내',
    '10년 이내',
    '15년 이내',
    '20년 이내',
  ];
  const HOUSEHOLDSARRAY = [
    '전체',
    '200세대 이상',
    '500세대 이상',
    '1000세대 이상',
    '2000세대 이상',
  ];

  const theme = {
    color: '#f09330',
  };
  const options = [
    { value: '매매', label: '매매' },
    { value: '전세', label: '전세' },
  ];

  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  console.log(inputResult);

  const goToServer = (e) => {
    console.log(e.key);
    fetch(`${APARTMENT_SEARCH_API_KEY}/apartment/search?search=${inputResult}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.lists);
        setRegionData(res.lists);
      });
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
  };

  const onButtonClickedHandler = (e) => {
    const { name, value } = e.target;
    setUserSelect(name, value);
  };

  const typeInputHandler = (e) => {
    setEstateType(e.value);
  };

  const modalHandler = () => {
    setIsModal(!isModal);
  };

  const clearHandler = () => {
    setEstateType('');
    setFoundationType('전체');
    setAreaType('전체');
    setHouseHoldsType('전체');
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

  // const filter = (data) => {
  //   let filtredList = data.filter((place) => {
  //     return place.title.indexOf(inputResult) > -1;
  //   });
  //   return filtredList.map((filtered, idx) => {
  //     return (
  //       <FilterElement
  //         key={idx}
  //         place={filtered}
  //         onClickFilteredData={props.onClickFilteredData}
  //       />
  //     );
  //   });
  // };

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
              type='text'
              className='filter-input'
              onChange={inputHandler}
              onKeyPress={(e) => {
                setIsFilter(true);
              }}
            />
            <div className='filter-btn-wrap'>
              <i className='fas fa-search' onClick={goToServer} />
            </div>
          </FilterInput>
          <FilterResultList isFilter={isFilter} inputResult={inputResult}>
            <ListWrap>
              {regionData.map((el, idx) => {
                return (
                  <FilterElement
                    place={el}
                    onClickFilteredData={props.onClickFilteredData}
                  />
                );
              })}
            </ListWrap>
          </FilterResultList>
          <FilterSelect>
            <Select
              className='select-option'
              options={options}
              placeholder={estateType}
              onChange={typeInputHandler}
            />
            <input
              type='button'
              className='filter-modal-on'
              value={selectResult}
            />
            <div className='filter-modal-btn'>
              <i className='fas fa-cogs'></i>
              <span className='filter-span' onClick={modalHandler}>
                필터
              </span>
            </div>
          </FilterSelect>
        </FilterTop>
        <FilterBottom isModal={isModal}>
          <FilterModal>
            <div className='modal-wrap'>
              <div className='modal-header'>
                <div className='left'>
                  <input type='button' value='X' />
                  <div>필터</div>
                </div>
                <div className='right'>
                  <input
                    type='button'
                    value='모두 초기화'
                    onClick={clearHandler}
                  />
                </div>
              </div>
              <ModalCardWrap>
                <CardType>
                  <div className='category'>거래 유형</div>
                  <div className='title'>{estateType}</div>
                  <CardTypeInput
                    isClickedType={isClickedType}
                    onClick={(e) => {
                      onButtonClickedHandler(e);
                      props.onChangeUserSelectKeyword(e);
                    }}>
                    {TYPEARRAY.map((type, idx) => {
                      return (
                        <input
                          type='button'
                          key={idx}
                          data-id={idx}
                          id={idx}
                          className={
                            isClickedType == idx ? 'activeTypeBtn' : ''
                          }
                          value={type}
                          onClick={(e) => {
                            addResult(e);
                            setIsClickedType(idx);
                          }}
                          name='type'
                        />
                      );
                    })}
                  </CardTypeInput>
                </CardType>
                <CardArea>
                  <div className='category'>면적</div>
                  <div className='title'>{areaType}</div>
                  <CardAreaInput
                    onClick={(e) => {
                      console.log('redner');
                      onButtonClickedHandler(e);
                      props.onChangeUserSelectKeyword(e);
                    }}>
                    {areaButtons.map((area, idx) => {
                      return (
                        <input
                          type='button'
                          key={idx}
                          id={idx}
                          data-id={idx}
                          value={area.name}
                          className={
                            isClickedArea == idx ? 'activeAreaBtn' : ''
                          }
                          name='area'
                          onClick={(e) => {
                            setClickCountLimt(clickCountLimit + 1);
                            addResult(e);
                            setIsClickedArea(idx);
                            props.toServerUserClick(
                              area.name,
                              idx,
                              clickCountLimit
                            );
                          }}
                        />
                      );
                    })}
                  </CardAreaInput>
                </CardArea>
                <CardFoundation>
                  <div className='category'>준공년도</div>
                  <div className='title'>{foundationType}</div>
                  <div className='card-btn'>
                    <CardFoundationInput
                      onClick={(e) => {
                        onButtonClickedHandler(e);
                        props.onChangeUserSelectKeyword(e);
                      }}>
                      {FOUNDATIONARRAY.map((foundation, idx) => {
                        return (
                          <input
                            type='button'
                            key={idx}
                            id={idx}
                            data-id={idx}
                            className={
                              isClickedFoundation == idx
                                ? 'activeFoundationBtn'
                                : ''
                            }
                            value={foundation}
                            onClick={(e) => {
                              addResult(e);
                              setIsClickedFoundation(idx);
                            }}
                            name='foundation'
                          />
                        );
                      })}
                    </CardFoundationInput>
                  </div>
                </CardFoundation>
                <CardHouseholds>
                  <div className='category'>세대수</div>
                  <div className='title'>{houseHoldsType}</div>
                  <CardHouseholdInput
                    onClick={(e) => {
                      onButtonClickedHandler(e);
                      props.onChangeUserSelectKeyword(e);
                    }}>
                    {HOUSEHOLDSARRAY.map((houseHolds, idx) => {
                      return (
                        <input
                          type='button'
                          key={idx}
                          data-id={idx}
                          id={idx}
                          className={
                            isClickedHouseHolds == idx
                              ? 'activeHouseholdsBtn'
                              : ''
                          }
                          value={houseHolds}
                          onClick={(e) => {
                            addResult(e);
                            setIsClickedHouseHolds(idx);
                          }}
                          name='houseHolds'
                        />
                      );
                    })}
                  </CardHouseholdInput>
                </CardHouseholds>
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
  height: 510px;
  margin: 150px 0px 0px 20px;
  overflow: scroll;
  z-index: 2;
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
    cursor: pointer;
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
      cursor: pointer;
    }
  }
`;
const FilterSelect = styled.div`
  padding-top: 10px;
  display: flex;
  input[value] {
    text-align: center;
    font-size: 12px;
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
    cursor: pointer;
  }
  .filter-modal-btn {
    width: 50px;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.9);
    padding: 10px;
    cursor: pointer;
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
    props.inputResult !== '' &&
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
  height: 300px;
  z-index: 10001;
  overflow: scroll;
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
  display: ${(props) => (props.isModal ? 'block' : 'none')};
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
          font-size: 22px;
        }
        div {
          font-size: 20px;
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
  height: 950px;
`;
const ModalCardWrap = styled.div`
  height: 100vh;
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
    outline: none;
    padding: 8px;
  }
  .activeAreaBtn {
    background: black;
    outline: none;
    font-weight: bold;
    color: white;
    text-decoration: none;
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
