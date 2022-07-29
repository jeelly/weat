import React from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'
import { ReactComponent as Profile } from "../img/profile.svg";
import { ReactComponent as Gps } from "../img/gps.svg";
import { ReactComponent as Bookmark } from "../img/bookmark.svg";
import { device } from "../css/GlobalStyles";

const BottomNavi = () => {
    const navigate = useNavigate()
    const location = window.location.href
    const colorChange = (url) =>{
        if(location.includes(url)){
            return '#7F5FFF'
        }
    }
  return (
    <BottomNaviWrap>
      <div className="naviContent">
        <ul>
          <li>
            <Gps fill="black" />
            <p>맛지도</p>
          </li>
          <li>
            <Bookmark fill="black" />
            <p>먹기록</p>
          </li>
          <li onClick={()=>{navigate('/mypage')}}>
            <Profile fill={colorChange('mypage')} />
            <p style={{color: colorChange('mypage')}}>프로필</p>
          </li>
        </ul>
      </div>
    </BottomNaviWrap>
  );
};

const BottomNaviWrap = styled.div`
  width: 100%;
  height: 68px;
  
  .naviContent {
    @media ${device.pc} {
      width: 480px;
    }
    width: 100%;
    height: 68px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 105;
    ul {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      height: 100%;
      border-top:1px solid #F5F5F5;
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top:3px;
        p {
          font-family: "AppleSDGothicNeoSB";
          font-size: 12px;
          line-height: 22px;
          text-align: center;
          letter-spacing: -0.02em;
          margin-top: 4px;
        }
      }
    }
  }
`;

export default BottomNavi;
