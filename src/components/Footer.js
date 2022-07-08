import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
    const location = useLocation();

    return (
      <HeaderContainer>
        {location.pathname === "/signup" && <p>회원가입</p>}
      </HeaderContainer>
    );
  };
  
  const HeaderContainer = styled.div`
      width: 100%;
      height:52px;
      padding:0 20px  0 24px;
      display: flex;
      align-items: center;
      position:fixed;
      bottom:0;
    p {
      font-family: "AppleSDGothicNeoM00", sans-serif;
      font-weight:400;
      font-size: 14px;
      line-height: 160%;
    }
  `;

export default Footer;