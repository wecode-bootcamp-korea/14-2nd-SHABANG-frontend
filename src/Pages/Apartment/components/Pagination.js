import React from 'react';
import styled from 'styled-components';

export default function Pagination(props) {
  return (
    <PaginationButton
      onClick={() => {
        props.paginate();
      }}>
      더보기
      <i className='fas fa-arrow-down'></i>
    </PaginationButton>
  );
}

const PaginationButton = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px 0px;
  font-size: 20px;
  cursor: pointer;
  i {
    padding-left: 20px;
  }
`;
