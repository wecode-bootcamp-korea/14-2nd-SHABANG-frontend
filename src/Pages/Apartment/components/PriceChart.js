import React, { useState } from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function PriceChart(props) {
  const tabbedData = props.graphData;
  const sellingApartmentData = tabbedData && tabbedData.trade_apartments_data;
  const rentApartmentData = tabbedData && tabbedData.rent_apartments_data;
  const years = [];
  console.log(props);
  let testValue = [];
  let testMountForSell = [];
  let testValueForRent = [];
  let rentingMountForX = [];
  let sellingMountForX = [];
  let testMountForRent = [];
  let sellingYears = [];
  let rentingYears = [];
  let sellingDataForX = [];
  let sellingDateForX = [];
  let rentingDataForX = [];
  let rentingDateForX = [];

  let tradeApartmentsData = tabbedData && tabbedData.trade_apartments_data;
  let rentApartmentsData = tabbedData && tabbedData.rent_apartments_data;

  for (let idx in tabbedData && tradeApartmentsData) {
    for (let year in tabbedData && tradeApartmentsData[idx]) {
      years.push(year);
      sellingYears.push(Object.values(tradeApartmentsData[idx]));
    }
  }

  for (let idx in tabbedData && rentApartmentsData) {
    for (let year in tabbedData && rentApartmentsData[idx]) {
      rentingYears.push(Object.values(rentApartmentsData[idx]));
    }
  }

  const sellingYearsValues = sellingYears.map((el) =>
    el.map((ele) =>
      ele.map((element) => {
        return element.values[0];
      })
    )
  );

  // for (let data in sellingYearsValues) {
  //   let temp = sellingYearsValues[data][0];
  //   temp.map((el) => {
  //     testValue.push(el);
  //   });
  // }

  const sellingYearsDate = sellingYears.map((el) =>
    el.map((ele) =>
      ele.map((element) => {
        return element.date;
      })
    )
  );

  // for (let data in sellingYearsDate) {
  //   let temp = sellingYearsDate[data][0];
  //   temp.map((el) => {
  //     sellingDateForX.push(el);
  //   });
  // }

  //
  const sellingYearsMount = sellingYears.map((el) =>
    el.map((ele) =>
      ele.map((element) => {
        return element.values[1];
      })
    )
  );

  const rentingYearsMount = rentingYears.map((el) =>
    el.map((ele) =>
      ele.map((element) => {
        return element.values[1];
      })
    )
  );

  const rentingYearsValues = rentingYears.map((el) =>
    el.map((ele) =>
      ele.map((element) => {
        return element.values[0];
      })
    )
  );

  // for (let data in rentingYearsValues) {
  //   let temp = rentingYearsValues[data][0];
  //   temp.map((el) => {
  //     testValueForRent.push(el);
  //   });
  // }

  const rentingYearsDate = rentingYears.map((el) =>
    el.map((ele) =>
      ele.map((element) => {
        return element.date;
      })
    )
  );

  // for (let data in rentingYearsDate) {
  //   let temp = rentingYearsDate[data][0];
  //   temp.map((el) => {
  //     rentingDateForX.push(el);
  //   });
  // }
  const objectOfFunctionForGraph = [
    { title: sellingYearsValues, tempArr: testValue },
    { title: sellingYearsDate, tempArr: sellingDateForX },
    { title: rentingYearsValues, tempArr: testValueForRent },
    { title: rentingYearsMount, tempArr: testMountForRent },
    { title: sellingYearsMount, tempArr: testMountForSell },
    { title: rentingYearsDate, tempArr: rentingDateForX },
  ];

  objectOfFunctionForGraph.map((el) => {
    for (let data in el.title) {
      let temp = el.title[data][0];
      let targetArr = el.tempArr;
      temp.map((element) => {
        targetArr.push(element);
      });
    }
  });

  for (let i in testValue) {
    let formatted = Number(testValue[i].toString().substr(0, 4));
    sellingDataForX.push(formatted);
  }

  for (let i in testValueForRent) {
    let formatted = Number(testValueForRent[i].toString().substr(0, 4));
    rentingDataForX.push(formatted);
  }

  for (let i in testMountForRent) {
    rentingMountForX.push(testMountForRent[i] * 50);
  }

  for (let i in testMountForSell) {
    sellingMountForX.push(testMountForSell[i] * 80);
  }

  const formattedYearsArray = years.slice(1, years.length - 1);

  const highchartOptions = {
    chart: {
      type: 'spline',
    },

    colors: ['#fca344', '#25a79c'],

    title: {
      text: '',
    },

    tooltip: {
      crosshairs: true,
      shared: true,
      borderColor: 'none',
      formatter: function () {
        const { points } = this;
        const [salePrice, rentPrice] = points;
        return `
        <span style="color: grey; font-size: 10px; text-decoration: none;">${
          this.x
        }</span><br/>
        <span><b>매매 시세 : <span style="color:#fca344; font-weight:bold;">${
          salePrice.y
        }</span></span><br/>
        <span><b>전세 시세 :  <span style="color:#25a79c; font-weight:bold;">${
          rentPrice.y
        }</span></span><br/>
        <span><b>${(salePrice.y - rentPrice.y).toFixed(0)} 차이${(
          (salePrice.y + rentPrice.y) /
          (salePrice.y - rentPrice.y)
        ).toFixed(2)}%</span>
       </span> 
       
        `;
      },
    },

    xAxis: {
      categories: sellingDateForX,
    },

    yAxis: {
      title: {
        text: '',
      },
    },

    legend: {
      enabled: false,
    },

    series: [
      {
        type: 'spline',
        name: '매매',
        marker: {
          symbol: 'circle',
        },
        data: sellingDataForX,
      },
      {
        type: 'spline',
        name: '전세',
        marker: {
          symbol: 'circle',
        },
        data: rentingDataForX,
      },
      {
        type: 'column',
        name: '매매 거래량',
        data: sellingMountForX,
      },
      {
        type: 'column',
        name: '전세 거래량',
        data: rentingMountForX,
      },
    ],

    credits: {
      enabled: false,
    },

    plotOptions: {
      spline: {},
      bar: { pointPadding: 0, pointWidth: 10 },
      series: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
        dataLabels: {
          crop: false,
        },
        pointWidth: 15,
      },
    },
  };

  return (
    <HighchartsReact
      id='container'
      highcharts={Highcharts}
      options={highchartOptions}></HighchartsReact>
  );
}
