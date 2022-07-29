import React from "react";
import styled from "styled-components";
import logo from "../img/logo_type2.svg";
import signatureFace from '../img/signatureFace.svg'
import {vh} from '../css/GlobalStyles'
const Splash = () => {
  return (
    <SplashWrap signatureFace={signatureFace}>
      <div>
        <img src={logo} alt="로고" />
        <p>지인들과 공유하는 맛집히스토리 앱, 위잇</p>
      </div>
      <p className="copyright">© 2022 WEat. All rights reserved.</p>
    </SplashWrap>
  );
};

const SplashWrap = styled.div`
  position: fixed;
  text-align: center;
  top: 0;
  left:0;
  background-color: var(--INFO);
  width: 100%;
  height: 100vh;
  min-height: 100%;
  z-index: 101;
  background-image:url(${props => props.signatureFace});
  background-repeat: no-repeat;
  background-position: 100% 70%;
  /* background-size: contain; */
  div {
    margin-top: 90px;
    img {
      width: 165px;
      margin-bottom: 24px;
    }
    p {
      font-family: "AppleSDGothicNeoM";
      font-size: 14px;
      line-height: 120%;
      color: var(--WHITE);
    }
  }
  .copyright {
    width: 100%;
    margin: auto;
    position: absolute;
    bottom: 20px;
    font-family: "Niramit";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 120%;
    color: var(--WHITE);
    opacity: 0.5;
  }
`;

export default Splash;
