import React from 'react';

export default function FilterElement(props) {
  return (
    <div
      className='card'
      onClick={(e) => {
        e.preventDefault();
        props.onClickFilteredData(props.place);
      }}>
      <div className='place-title'>{props.place.title}</div>
      <div className='place-address'>{props.place.address}</div>
    </div>
  );
}
