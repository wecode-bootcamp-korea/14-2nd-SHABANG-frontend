import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { KAKAO_LOGIN_API_URL, GOOGLE_LOGIN_API_URL } from '../../Config';
import GoogleLogin from 'react-google-login';
import LoginFooterBtn from './Component/LoginFooterBtn';

const googleLoginClientId = process.env.REACT_APP_GOOGLELOGIN_CLIENT_ID;
const { Kakao } = window;

export default function LogIn() {
  const history = useHistory();
  const kakaoLogin = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        fetch(`${KAKAO_LOGIN_API_URL}`, {
          method: 'POST',
          body: JSON.stringify({
            access_token: authObj.access_token,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            localStorage.setItem('Kakao_token', res.access_token);
            if (res.access_token) {
              alert('샤방에 오신 것을 환영합니다 !');
              history.push('/');
            }
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  const googleLogin = (res) => {
    fetch(`${GOOGLE_LOGIN_API_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        access_token: res.tokenObj.id_token,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('Google_token', res.access_token);
        if (res.access_token) {
          alert('샤방에 오신 것을 환영합니다 !');
          history.push('/');
        }
      });
  };

  return (
    <LoginContainer>
      <LoginBox>
        <LoginHeader>
          <Link to='/'>
            <img
              src='images/loginLogo.png'
              alt='클릭하면 홈화면으로 이동할 수 있어요'
            />
          </Link>
          <h className='title sub'>간편하게 로그인하고</h>
          <h className='title main'>다양한 서비스를 이용하세요.</h>
        </LoginHeader>
        <LoginBody>
          <button className='kakaoBtn' onClick={kakaoLogin}>
            <img src='images/kakaoLogo.png' alt='카카오톡으로 로그인하기' />
            <span>카카오톡으로 시작</span>
          </button>
          <GoogleLogin
            clientId={googleLoginClientId}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className='googleBtn'>
                <img src='images/googleLogo.png' alt='구글로 로그인하기' />
                <span>구글로 시작</span>
              </button>
            )}
            onSuccess={googleLogin}
            onFailure={googleLogin}
            cookiePolicy={'single_host_origin'}
          />
        </LoginBody>
        <LoginFooter>
          <p>다른 방법으로 시작하기</p>
          <LoginBtnContainer>
            <LoginFooterBtn />
          </LoginBtnContainer>
        </LoginFooter>
      </LoginBox>
    </LoginContainer>
  );
}

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  ${FlexCenter}
  height: 100%;
`;

const LoginBox = styled.div`
  width: 380px;
  height: 485px;
  border: 1px solid #eeeeee;
  font-family: SpoqaHanSans;
`;

const LoginHeader = styled.div`
  ${FlexCenter}
  flex-direction: column;
  margin: 40px 20px 30px 20px;

  img {
    width: 110px;
    margin-bottom: 10px;
  }

  .title {
    margin-bottom: 5px;
    font-size: 22px;
    color: #222222;
  }

  .sub {
    font-weight: 300;
  }

  .main {
    font-weight: 700;
  }
`;

const LoginBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin: 25px 25px 15px 25px;

  button {
    ${FlexCenter}
    height: 45px;
    margin-bottom: 10px;
    border: none;
    border-radius: 25px;
    outline: none;

    :hover {
      cursor: pointer;
    }

    img {
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }

    span {
      font-size: 16px;
      color: #412f2f;
    }
  }

  .kakaoBtn {
    background-color: #fde500;
  }

  .googleBtn {
    background-color: #f0f0f0;
  }
`;

const LoginFooter = styled.div`
  ${FlexCenter}
  flex-direction: column;

  p {
    margin-bottom: 15px;
    font-size: 12px;
    line-height: 19px;
    color: #a6a6a6;
  }
`;

const LoginBtnContainer = styled.div`
  display: flex;
`;
