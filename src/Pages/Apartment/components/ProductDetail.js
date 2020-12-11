import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { ThemeProvider, css } from 'styled-components';
import PriceChart from './PriceChart';
import ProductTradeData from './ProductTradeData';
import Pagination from './Pagination';
import NearbyCard from '../../../Components/NearBy/Card/NearbyCard';

const YEAR = ['1년', '3년', '5년', '전체'];

const theme = {
  title_back_icon_size: '19px',
  title_location_size: '19px',
  title_size: '23px',
};

const ProductDetail = (props) => {
  const target = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState(0);
  const [activeTabId, setActiveTabId] = useState(0);
  let { isDetail, detailData, graphData } = props;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  let currentPosts =
    detailData.trade_data &&
    detailData.trade_data.slice(indexOfFirstPost, indexOfLastPost);

  let sizeObjectForClick =
    detailData.size &&
    detailData.size.map((el, idx) => {
      return { py: el.py };
    });
  console.log(sizeObjectForClick);
  useEffect(() => {
    setActiveTab(detailData.size && detailData.size[0].py);
  }, []);

  useEffect(() => {
    scroll();
    return () => {
      setIsSticky(false);
    };
  }, [scrollTop]);

  const onChangeGraph = (area, id) => {
    setActiveTab(area);
    setActiveTabId(id);
  };
  console.log(activeTab);

  const scroll = () => {
    setScrollTop(target.current.scrollTop);
    const isSticky = scrollTop > 20;
    setIsSticky(isSticky);
  };

  const paginate = () => {
    setPostsPerPage((postsPerPage) => postsPerPage * 2);
  };

  const rowRentingPrice =
    detailData.size && detailData.size[activeTabId].renting;
  const rowSellingPrice =
    detailData.size && detailData.size[activeTabId].selling;

  const SellingPrice = () => {
    return (
      <>
        <span className='price'>매매 {getKoreanWon(rowSellingPrice)}</span>
        <span className='m2'>
          {getKoreanWon(rowSellingPrice / activeTab).slice(0, 8)} / 3.3m2
        </span>
      </>
    );
  };
  const EmptySellingPrice = () => {
    return (
      <>
        <span className='price'>매매가 없습니다.</span>
      </>
    );
  };

  const RentingPrice = () => {
    return (
      <>
        <span className='price'>전세 {getKoreanWon(rowRentingPrice)}</span>
        <span className='m2'>
          {getKoreanWon(rowRentingPrice / activeTab).slice(0, 6)} / 3.3m2
        </span>
      </>
    );
  };
  const EmptyRentingPrice = () => {
    return (
      <>
        <span className='price'>전세가 없습니다.</span>
      </>
    );
  };

  const getKoreanWon = (number) => {
    const units = ['', '만', '억'];
    let result = '';
    let unit = 10000;
    let idx = 0;
    let division = Math.pow(unit, idx);

    while (Math.floor(number / division) > 0) {
      const target = Math.floor((number % (division * unit)) / division);
      if (target) {
        const targetStr = target.toString();
        result = `${targetStr}${units[idx]} ` + result;
      }
      division = Math.pow(unit, ++idx);
    }
    return result;
  };

  const showImgView = () => {
    console.log('e');
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrap>
        <ProductDetailWrap
          ref={target}
          onScroll={() => {
            scroll();
          }}
          isDetail={isDetail}>
          <ProductDetailInformation>
            <InformationAddress isSticky={isSticky}>
              <i
                className='fas fa-arrow-left'
                onClick={props.setIsDetailClose}
              />
              <div className='location'>{detailData.complex_name}</div>
            </InformationAddress>
            <ProductImage>
              <img src={detailData.image_url} alt='' onClick={showImgView} />
            </ProductImage>
            <InformationTitle>{detailData.complex_name}</InformationTitle>
            <InformationSpecificInformation>
              <div className='place'>{detailData.completion_year} 년 완공</div>
              <div className='number'>{detailData.household_number} 세대</div>
            </InformationSpecificInformation>
          </ProductDetailInformation>
          <ProductArea>
            <ProductAreaHeader>
              <div className='area-wrap'>
                {detailData.size &&
                  detailData.size.map((area, idx) => {
                    return (
                      <div
                        className='area'
                        key={idx}
                        id={idx}
                        onClick={() => {
                          onChangeGraph(area.py, idx);
                        }}>
                        {area.py} 평
                      </div>
                    );
                  })}
              </div>
            </ProductAreaHeader>
            <ProductTabChange>
              <ProductAreaMarketPrice>
                <div className='market-price-title'>샤방시세</div>
                <div className='market-price-compare'>
                  <div className='purchasing'>
                    {detailData.size &&
                    detailData.size[activeTabId].selling === null
                      ? EmptySellingPrice()
                      : SellingPrice()}
                  </div>
                  <div className='long-term-rent'>
                    {detailData.size &&
                    detailData.size[activeTabId].renting === null
                      ? EmptyRentingPrice()
                      : RentingPrice()}
                  </div>
                </div>
                <MarketPriceGraph>
                  <div className='graph-title'>
                    <div className='title'>실거래가 이지뷰</div>
                    <div className='btn-wrap'>
                      <input type='button' value='전체' />
                      <input type='button' value='매매' />
                      <input type='button' value='전세' />
                    </div>
                  </div>
                  <div className='select-year'>
                    {YEAR.map((year) => {
                      return <input type='button' value={year} />;
                    })}
                  </div>
                  <div className='chart-label'>
                    <div className='left'>
                      <div className='dot-orange'></div> <span>매매</span>
                      <div className='dot-green'></div> <span>전세</span>
                    </div>
                    <div className='right'>
                      <div className='line'></div>
                      <span>직방시세</span>
                      <div className='bar'></div>
                      <span>거래량</span>
                    </div>
                  </div>
                  <PriceChart graphData={graphData} activeTab={activeTab} />
                </MarketPriceGraph>
              </ProductAreaMarketPrice>
              <ProductInformationTable>
                <div className='table-header'>
                  <div className='foundation_date'>계약일</div>
                  <div className='floor'>층수</div>
                  <div className='type'>타입</div>
                  <div className='price'>가격</div>
                </div>
                <ProductTradeData data={currentPosts} />
                <Pagination postsPerPage={postsPerPage} paginate={paginate} />
              </ProductInformationTable>
            </ProductTabChange>
          </ProductArea>
          <NearbyCard />
        </ProductDetailWrap>
      </Wrap>
    </ThemeProvider>
  );
};
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProductDetailWrap = styled.div`
  position: fixed;
  display: ${(props) => (props.isDetail ? 'block' : 'none')};
  top: 130px;
  right: 0px;
  height: 100%;
  width: 400px;
  overflow: scroll;
  padding-bottom: 150px;
  z-index: 1;
`;
const ProductDetailInformation = styled.div`
  width: 100%;

  background-color: white;
`;
const InformationAddress = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  padding: 20px;
  background-color: transparent;
  z-index: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  transition: 0.6s;
  opacity: 0;

  ${(props) =>
    props.isSticky &&
    css`
      position: fixed;
      background-color: white;
      z-index: 1;
      opacity: 1;
    `}
  i {
    font-size: ${(props) => props.theme.title_back_icon_size};
    opacity: 1;
    z-index: 1;
  }
  .location {
    padding-left: 10px;
    padding-top: 1px;
    font-size: ${(props) => props.theme.title_location_size};
  }
`;
const ProductImage = styled.div`
  height: 100%;
  width: 100%;
  img {
    width: 100%;
    height: 300px;
  }
`;
const InformationTitle = styled.div`
  padding: 10px 10px 0px 10px;
  font-size: ${(props) => props.theme.title_size};
  font-weight: bold;
`;
const InformationSpecificInformation = styled.div`
  display: flex;
  padding: 10px;
  .place {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4);
    padding-right: 4px;
    font-weight: bold;
  }
  .number {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4);
    font-weight: bold;
  }
`;
const ProductArea = styled.div`
  margin-top: 10px;
  background-color: white;
`;
const ProductAreaHeader = styled.div`
  .area-wrap {
    display: flex;
    overflow-x: auto;
    padding: 20px 10px;
    white-space: nowrap;
    .area {
      width: 100px;
      display: inline-block;
      font-size: 16px;
      padding-left: 20px;
      color: rgba(0, 0, 0, 0.3);
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
const ProductAreaMarketPrice = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  .market-price-title {
    font-size: 14px;
    padding-bottom: 5px;
  }
  .market-price-compare {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    .price {
      font-size: 20px;
      font-weight: bold;
      line-height: 26px;
    }
    .m2 {
      font-size: 14px;
      line-height: 26px;
      font-weight: bold;
    }
    .purchasing {
      width: 100%;
      display: flex;
      color: #2d60a3;
      flex-direction: column;
    }
    .long-term-rent {
      width: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      color: #2d60a3;
    }
  }
`;
const MarketPriceGraph = styled.div`
  padding-top: 20px;
  .graph-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .btn-wrap {
      input {
        background: transparent;
        margin-right: 1px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 5px 10px;
      }
    }
  }
  .select-year {
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: -1;
    padding: 25px 0px;
    input {
      position: relative;
      font-size: 20px;
      width: 40px;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      margin-left: 10px;
      text-align: center;
    }
  }
  .chart-element {
    background-color: red;
  }
  .chart-label {
    display: flex;
    justify-content: space-around;
    padding-bottom: 20px;
    z-index: -1;
    .left {
      display: flex;
      div {
        margin-right: 5px;
      }
      span {
        margin-right: 15px;
      }
      .dot-orange {
        background-color: rgb(239, 122, 0);
        width: 5px;
        height: 5px;
        border-radius: 50%;
        + span {
          color: rgb(239, 122, 0);
        }
      }
      .dot-green {
        background-color: rgb(37, 167, 156);
        width: 5px;
        height: 5px;
        border-radius: 50%;
        + span {
          color: rgb(37, 167, 156);
        }
      }
    }
    .right {
      display: flex;
      div {
        margin-right: 5px;
      }
      span {
        margin-right: 15px;
      }
      .line {
        width: 7px;
        height: 3px;
        border-radius: 1.5px;
        background-color: rgb(166, 166, 166);
        margin-top: 3px;
      }
      .bar {
        width: 3px;
        height: 9px;
        background-color: rgb(166, 166, 166);
        margin-top: 1px;
      }
    }
  }
`;

const ProductInformationTable = styled.div`
  width: 100%;
  .table-header {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.2);
    padding: 15px 0px;
    font-weight: bold;

    .foundation_date,
    .floor,
    .type,
    .price {
      width: 25%;
    }
  }
`;
const ProductTabChange = styled.div``;
const RecommendProduct = styled.div``;

export default withRouter(ProductDetail);
