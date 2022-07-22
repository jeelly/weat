import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import goBack from "../img/icon/goBack.png";
import notice from "../img/fixed/notice.svg";
import NoticeModal from "./NoticeModal";
import { useDispatch } from 'react-redux'
import { editModal, detailId } from "../redux/modules/postSlice";

const Header = ({id, status, roomName}) => {
  let navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [color, setColor] = useState();

  const goback = () => {
    navigate(-1);
  }

  useEffect(() => {
    if(location.pathname === `/detail/${id}` || location.pathname === `/listpage/${id}`) {
      return setColor(status==='publicOwner'?'#FF7337': status==='publicGuest'? '#23C7C7' : '#FFBB55')
    } else {
      return setColor('')
    }
  }, [status, location]);

  const delBtn = async () => {
      dispatch(editModal({Room:true}))
  }

  const delDetailId = async () => {
    dispatch(detailId([]))
  }
  
  return (
    <>
      <NoticeModal modal={modal} setModal={setModal}/>
      <HeaderContainer color={color}>
        {location.pathname === "/" && <><span/><button onClick={()=> {setModal(true)}}><img src={notice} alt="알림창"></img></button></>}
        {location.pathname.indexOf("signup") > 0  && <p  className="basicHeader" onClick={goback}>회원가입</p>}
        {location.pathname === `/detail/${id}` && <> <p onClick={async ()=> {
          await delDetailId();
          goback();
        }}>{roomName}</p> 
          <div>
            <LinkStyle to={`/detail/${id}`}>공유하기</LinkStyle>
            {status === 'publicOwner' || status === 'private' ? <LinkStyle to={`/edit/${id}`}>편집하기</LinkStyle> : null}
          </div>
        </>}

        {location.pathname === `/edit/${id}` && <> <p onClick={goback}/> <DelBtn onClick={delBtn}>방없애기</DelBtn> </>}
        {location.pathname === `/editlistpage/${id}` && <> <p onClick={goback}></p> <LinkStyle to={`/editlistpage/${id}`}>공유하기</LinkStyle> </>}

        {location.pathname === `/listpage/${id}` && <> <p onClick={goback}></p> <LinkStyle to={`/listpage/${id}`}>공유하기</LinkStyle> </>}
        {location.pathname === "/makeroom" && (<p className="basicHeader" onClick={goback} />)}
      </HeaderContainer>
    </>
  );
};

const SharedBtn = styled.button`
`

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
    margin-left:12px;
`

const DelBtn = styled.button`
    font-family: "AppleSDGothicNeoM00", sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 160%;
    color:var(--BLACK);
`

export default Header;