import React, { Component } from "react";
import styled, { css } from "styled-components";

class LoginButtonFooter extends Component {
  render() {
    return (
      <OtherLoginBtn>
        <button>
          <a href="https://www.facebook.com/">
            <img src="images/facebookBtn.png" alt="페이스북으로 로그인하기" />
          </a>
        </button>
        <button className="naverBtn">
          <a href="https://www.naver.com/">
            <img src="images/naverBtn.png" alt="네이버로 로그인하기" />
          </a>
        </button>
        <button>
          <a href="https://zigbang.com/">
            <img src="images/emailBtn.png" alt="이메일로 로그인하기" />
          </a>
        </button>
      </OtherLoginBtn>
    );
  }
}

const OtherLoginBtn = styled.div`
  button {
    border: none;
    background-color: #ffffff;
    outline: none;
    :hover {
      cursor: pointer;
    }

    img {
      width: 30px;
      height: 30px;
      outline: none;
      border-radius: 10px;
    }
  }

  .naverBtn {
    margin: 0 20px;
  }
`;

export default LoginButtonFooter;
