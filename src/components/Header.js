import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import goBack from "../img/icon/goBack.png";


const Header = () => {
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
  p {
    font-family: "AppleSDGothicNeoM00", sans-serif;
    font-weight:400;
    font-size: 14px;
    line-height: 160%;
    &:before {
      content: url(${goBack});
      padding-right: 16px;
    }
  }
`;

export default Header;
