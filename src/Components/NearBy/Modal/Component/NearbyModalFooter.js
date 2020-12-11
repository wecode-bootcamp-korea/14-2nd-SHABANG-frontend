import React from "react";
import styled from "styled-components";

const NearbyModalFooter = ({
  isSubwayBtnOn,
  setSubwayBtnOn,
  isStoreBtnOn,
  setStoreBtnOn,
  isCafeBtnOn,
  setCafeBtnOn,
  isSchoolBtnOn,
  setSchoolBtnOn,
}) => {
  const facilityInfo = [
    {
      title: "지하철",
      btnOnOff: isSubwayBtnOn,
      alt: "주위에 지하철이 있는지 없는지 확인할 수 있어요",
      img_on: "/images/icon/subwayOn.png",
      img_off: "/images/icon/subwayOff.png",
    },
    {
      title: "편의점",
      btnOnOff: isStoreBtnOn,
      alt: "주위에 편의점이 있는지 없는지 확인할 수 있어요",
      img_on: "/images/icon/storeOn.png",
      img_off: "/images/icon/storeOff.png",
    },
    {
      title: "카페",
      btnOnOff: isCafeBtnOn,
      alt: "주위에 카페가 있는지 없는지 확인할 수 있어요",
      img_on: "/images/icon/cafeOn.png",
      img_off: "/images/icon/cafeOff.png",
    },
    {
      title: "학교",
      btnOnOff: isSchoolBtnOn,
      alt: "주위에 학교가 있는지 없는지 확인할 수 있어요",
      img_on: "/images/icon/schoolOn.png",
      img_off: "/images/icon/schoolOff.png",
    },
  ];

  const handleShownIcon = (title) => {
    switch (title) {
      case "학교":
        setSchoolBtnOn(!isSchoolBtnOn);
        break;
      case "카페":
        setCafeBtnOn(!isCafeBtnOn);
        break;
      case "편의점":
        setStoreBtnOn(!isStoreBtnOn);
        break;
      case "지하철":
        setSubwayBtnOn(!isSubwayBtnOn);
        break;
      default:
    }
  };

  return (
    <Footer>
      <div className="iconContainer">
        {facilityInfo.map((icon) => {
          return (
            <div className="icon" onClick={() => handleShownIcon(icon.title)}>
              <img
                alt={icon.alt}
                className="Icon"
                src={icon.btnOnOff ? icon.img_on : icon.img_off}
              />
              <span>{icon.title}</span>
            </div>
          );
        })}
      </div>
    </Footer>
  );
};

const Footer = styled.div`
  .iconContainer {
    display: flex;
    justify-content: center;

    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 10px;

      :hover {
        cursor: pointer;
      }

      img {
        width: 44px;
        height: 44px;
      }

      span {
        margin-top: 8px;
        font-size: 14px;
      }
    }
  }
`;

export default NearbyModalFooter;
