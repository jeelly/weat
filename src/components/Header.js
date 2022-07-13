import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import goBack from "../img/icon/goBack.png";
import notice from "../img/fixed/notice.svg";
import NoticeModal from "./NoticeModal";
import { useDispatch } from 'react-redux'
import { editModal } from "../redux/modules/postSlice";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [color, setColor] = useState();
  const goback = () => {
    navigate(-1);
  }
  const headerColor = () => {
    if(location.pathname === "/detail" || location.pathname === "/listpage") {
      return setColor("#FF7337")
    }else {
      return null
    }
  }

  const delBtn = async () => {
      dispatch(editModal({Room:true}))
  }
  return (
    <>
      <NoticeModal modal={modal} setModal={setModal}/>
      <HeaderContainer color={color}>
        {location.pathname === "/" && <><span/><button onClick={()=> {setModal(true)}}><img src={notice} alt="알림창"></img></button></>}
        {location.pathname === "/signup" && <p onClick={goback}>회원가입</p>}
        {location.pathname === "/detail" && <> <p onClick={goback}/> <LinkStyle to="/edit">편집하기</LinkStyle> </>}
        {location.pathname === "/edit" && <> <p onClick={goback}/> <DelBtn onClick={delBtn}>방없애기</DelBtn> </>}
        {location.pathname === "/listpage" && <> <p onClick={goback}>회사근처밥집</p> <LinkStyle to="/">공유하기</LinkStyle> </>}
        {location.pathname === "/editlistpage" && <> <p onClick={goback}></p> <LinkStyle to="/">공유하기</LinkStyle> </>}
      </HeaderContainer>
    </>
  );
};

// display:${({modal}) => !modal ?'none':'block'};

const HeaderContainer = styled.div`
    width: 100%;
    height:52px;
    padding:0 20px  0 24px;
    display: flex;
    align-items: center;
    background-color:${({color}) => color? color : 'transparent'};
    justify-content:space-between;
  p {
    font-family: "AppleSDGothicNeoM00", sans-serif;
    font-weight:400;
    font-size: 14px;
    line-height: 160%;
    cursor: pointer;
    &:before {
      content: url(${goBack});
      padding-right: 16px;
    }
  }
  button {
    background-color:transparent;
    border:none;
    cursor: pointer;
    text-align:right;
  }
`;
const LinkStyle = styled(Link)`
    font-family: "AppleSDGothicNeoM00", sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 160%;
    text-decoration:none;
    color:var(--BLACK);
`

const DelBtn = styled.button`
    font-family: "AppleSDGothicNeoM00", sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 160%;
    color:var(--BLACK);
`

export default Header;