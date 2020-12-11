import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

export default function ProductTradeData(props) {
  const trade_data = props.data;

  return (
    <>
      {trade_data &&
        trade_data.map((data, idx) => (
          <GridWrap key={data.pricePerP}>
            <div>{data.trade_date}</div>
            <div>{data.floor}</div>
            <div>{data.trade_type}</div>
            <div>{data.pricePerP.toString().slice(0, 4)} 만</div>
          </GridWrap>
        ))}
    </>
  );
}

const GridWrap = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  div {
    margin-top: 15px;
    padding: 20px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    width: 25%;
  }
`;
