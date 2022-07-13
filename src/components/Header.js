import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import goBack from "../img/icon/goBack.png";
import notice from "../img/fixed/notice.svg";
import NoticeModal from "./NoticeModal";

const Header = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [modal, setModal] = useState(false);
  // const [colorType1, setColorType1] = useState(null)

  const goback = () => {
    navigate(-1);
  };
  const headerColor = () => {
    if (location.pathname === "/detail" || location.pathname === "/listpage") {
      return "#FF7337";
      // return setColorType1('#FF7337')
    } else {
      return null;
    }
  };

  return (
    <>
      <NoticeModal modal={modal} setModal={setModal} />
      <HeaderContainer color={headerColor}>
        {location.pathname === "/" && (
          <>
            <span />
            <button
              onClick={() => {
                setModal(true);
              }}
            >
              <img src={notice} alt="알림창"></img>
            </button>
          </>
        )}
        {location.pathname.indexOf("signup") > 0 && (
          <p className="basicHeader" onClick={goback}>
            회원가입
          </p>
        )}
        {location.pathname === "/finduser" && (
          <p className="basicHeader" onClick={goback}>
            아이디 / 비밀번호 찾기
          </p>
        )}
        {location.pathname === "/makeroom" && (
          <p className="basicHeader" onClick={goback} />
        )}
        {location.pathname === "/detail" && (
          <>
            <p className="basicHeader" onClick={goback} />
            <LinkStyle to="/">편집하기</LinkStyle>
          </>
        )}
        {location.pathname === "/listpage" && (
          <>
            <p className="basicHeader" onClick={goback}>
              회사근처밥집
            </p>
            <LinkStyle to="/">공유하기</LinkStyle>
          </>
        )}
      </HeaderContainer>
    </>
  );
};

// display:${({modal}) => !modal ?'none':'block'};

const HeaderContainer = styled.div`
  width: 100%;
  height: 52px;
  padding: 0 20px 0 24px;
  display: flex;
  align-items: center;
  background-color: ${({ color }) => (color ? color : "transparent")};
  justify-content: space-between;
  p {
    font-family: "AppleSDGothicNeoM00", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    cursor: pointer;
  }
  p.basicHeader {
    &:before {
      content: url(${goBack});
      padding-right: 16px;
    }
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-align: right;
  }
`;
const LinkStyle = styled(Link)`
  font-family: "AppleSDGothicNeoM00", sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  text-decoration: none;
  color: var(--BLACK);
`;

export default Header;
