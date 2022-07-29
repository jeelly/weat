import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import goBack from "../img/icon/goBack.svg";
import notice from "../img/fixed/notice.svg";
import NoticeModal from "./NoticeModal";
import { useDispatch } from 'react-redux'
import { editModal, detailId, roomExitDB } from "../redux/modules/postSlice";
import { createBrowserHistory } from "history";
import KakaoShare from "./KakaoShare";
import Modal from "./map_page/post/Modal";


const Header = ({id, status, roomName, socket}) => {
  const history = createBrowserHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {detail, users} = useSelector(state => state.post.detail);
  const {userInfo} = useSelector(state => state.loggedIn);
  const [modal, setModal] = useState(false);
  const [color, setColor] = useState();
  const [notiCounter, setNotiCounter] = useState(false)
  const [modalDel, setModalDel] = useState(false);
  let notiCount = localStorage.getItem('newNoti')
  

  const goback = () => {
    navigate(-1);
  }

  useEffect(() => {
    if(location.pathname === `/detail/${id}` || location.pathname === `/listpage/${id}`) {
      setColor(status==='publicOwner'?'#FF7337': status==='publicGuest'? '#23C7C7' : '#FFBB55')
    }else {
      setColor('')
    }
  }, [status, location]);


  const delBtn = async () => {
      dispatch(editModal({Room:true}))
  }

  const delDetailId = async () => {
    dispatch(detailId([]))
  }

  const exitRoom = async (id) => {
    dispatch(roomExitDB(id))
  }

  const modalOn = () => {
    setModalDel(true)
  }


//기본 헤더 설정
  const url = location.pathname
  const basicHeader = (a) => {
    if(url.indexOf(a) > 0){
      return true
    }else{
      return false
    }    
  }

  // 헤더 예외처리
  const noneHeader = () => {
    if(url.indexOf('noentry') > 0 || url.indexOf('mypage') > 0 || url.indexOf('login') > 0 || url.indexOf('none') > 0){
      return 'none'      
    }else if(url.indexOf('map') > 0) {
        return 'none'
    }else if(url.indexOf('storepost') > 0) {
      return 'none'
    }else if(url.indexOf('review') > 0) {
      return 'none'
    } else{
      return 'flex'
    }
  }


  const notiModalOpen = () => {
    setModal(modal?false:true)
    localStorage.setItem("newNoti", 0);    
  }

  

  //소켓
  // const newInvited = () => {
  //   socket?.on("newInviteDB", (noti) => {
  //     console.log("이게실시간", noti.findUserAlertDB[0]);
  //   });
  // };


  // useEffect(() => {    
  //   newInvited();
  // }, [socket, userInfo]);

  return (
    <>
      <NoticeModal modal={modal} setModal={setModal} socket={socket}/>
      <Modal content="정말 맛방을 나가시겠어요? 그동안 모아뒀던 맛집들이 사라져요;(" modal={modalDel} setModal={setModalDel} okBtn={()=> exitRoom(id)} nav="/" />
      <HeaderContainer color={color} style={{display:noneHeader()}}>
        {location.pathname === "/" && <><span/><button onClick={notiModalOpen}>
          { Number(notiCount) > 0 && <NotiCount>{notiCount}</NotiCount> }
          <img src={notice} alt="알림창"></img></button></>}
        {basicHeader("signup") && <p className="basicHeader" onClick={goback}>회원가입</p>}
        {basicHeader("finduser") && <p className="basicHeader" onClick={goback}>아이디/비밀번호 찾기</p>}
        {basicHeader("roomshare") && <p className="basicHeader" onClick={goback}></p>}
        {location.pathname === `/detail/${id}` && <> <p onClick={async ()=> {
          await delDetailId();
          goback();
        }}>{roomName}</p> 
          <div>
            {/* <LinkStyle to={`/detail/${id}`}>공유하기</LinkStyle> */}
            <LinkStyle to={`/detail/${id}`}><KakaoShare roomName={detail&&detail.roomName} ownerNickname={users&&users.owner.nickname}/></LinkStyle>
            {status === 'publicOwner' || status === 'private' ? <LinkStyle to={`/edit/${id}`}>편집하기</LinkStyle> : <ExitBtn onClick={modalOn}>방 나가기</ExitBtn>}
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
    position: relative;
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

const NotiCount = styled.span `
  position: absolute;
  right: -75%;
  top: -30%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--INFO);
  display: flex;
  justify-content: center;
  align-items: center;
  color:#fff;
  font-family: 'Niramit';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
`

const ExitBtn = styled.button`
    border:none;
    background-color:transparent;
    font-family: "AppleSDGothicNeoM00", sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 160%;
    color:var(--BLACK);
    margin-left:12px;
`

export default Header;