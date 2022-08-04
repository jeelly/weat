import React,{useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../css/Style";
import close from "../img/close.svg";
import { useSelector, useDispatch } from "react-redux";
import { addNotiList } from "../redux/modules/socketSlice";
import {device} from '../css/GlobalStyles'
import noneImg from '../img/none.svg'
import alert_banner from '../img/alert_banner.jpg'
const NoticeModal = ({ modal, setModal, socket }) => {
  const navigate = useNavigate('')
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state => state.loggedIn)
  const { notiList } = useSelector((state) => state.noti);
  const notiListSort = [...notiList].reverse();
  const messageByType = (type) => {
    if (type === "초대") {
      return " 새로운 맛방";
    }
    if (type === "맛집등록") {
      return " 새로운 기록으로";
    }
  };

  const messageByType2 = (type) => {
    if (type === "초대") {
      return "에 초대하셨어요! ";
    }
    if (type === "맛집등록") {
      return "에 등록하셨어요!";
    }
  };
  

  const notiModalCloss = () => {
    setModal(false)
    localStorage.setItem("newNoti", 0);  
  }

//소켓 알림 삭제
const notiDelete = (e) => {
  console.log( e.target.id)
  socket.emit('delete', e.target.id)
  notiItemList()
}
const notiItemList = async () => {
  await socket?.emit("getAlert", { receiverId: userInfo.userId });
  await socket?.on("getNotification", (data) => {
    console.log('모달에있는 로직')
    console.log(data)
    dispatch(addNotiList(data.findAlertDB));
  });
};
  return (
    <Modal modal={modal}>
      {/* <ImgWrap target="_black" href="https://docs.google.com/forms/d/e/1FAIpQLSeOzr5Ppeu0BGJIuxBldO7LoFd_VUOeL0ZGzDk0SkP8jBZl8Q/viewform">
        <img src={alert_banner} alt="이벤트배너"/>
      </ImgWrap> */}
      <NewContainer>
        <CloseBtn
          close={close}
          onClick={notiModalCloss}
        >
          닫기 버튼
        </CloseBtn>
        
        {notiListSort.length > 0 ?
        notiListSort.map((listItem, idx) => (
          <ContentItem key={listItem._id} onClick={()=>{navigate(`/detail/${listItem.roomId}`)}}>
            <ContentText>
              <span className="name">{listItem.senderName}</span>님이 
              {messageByType(listItem.type)}
              <br />
              <span className="content">{listItem.roomName}</span>{messageByType2(listItem.type)}
            </ContentText>
            {/* <button id={listItem._id} onClick={notiDelete}>X</button> */}
            <ContentTime>{listItem.createdAt}</ContentTime>
          </ContentItem>
        ))
        : <Notinone>
          <img src={noneImg} alt=""/>
          <p>아직 알림이 없네요</p>
        </Notinone>
      
      
      }
      </NewContainer>
    </Modal>
  );
};

export default NoticeModal;
const ImgWrap = styled.a`
  position:absolute;
  bottom:-4px;
  left:0;
    /* overflow:hidden; */
    img {
        width:100%;
        object-fit:contain;
    }
`

const NewContainer = styled(Container)`
  padding-top: 56px;
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
  display: none;
}`;
const Modal = styled.article`
  @media ${device.pc} {
    right: ${({ modal }) => (modal ? "30.2%" : "-10%")};
    transform: translate(50%,0);
    box-shadow:none;
    opacity: ${({ modal }) => (modal ? "1" : "0")};
  }
  width: 280px;
  height: 100vh;
  background-color: var(--LIGHTEST);
  box-shadow: ${({modal}) =>
    modal
      ? "0px 6px 10px rgba(153, 153, 153, 0.2), 0px 1px 18px rgba(153, 153, 153, 0.2), 0px 3px 5px rgba(153, 153, 153, 0.2)"
      : "none"};
  position: fixed;
  top: 0;
  right: ${({ modal }) => (modal ? 0 : "-280px")};
  transition: right 0.5s, opacity 0.8s;
  z-index: 106;
  
`;
const CloseBtn = styled.button`
  background-image: url(${({ close }) => close});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 16.73px 16.73px;
  width: 16.73px;
  height: 16.73px;
  text-indent: -9999px;
  border: none;
  position: absolute;
  top: 17.63px;
  right: 21.63px;
  cursor: pointer;
`;

const ContentItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  line-height: 160%;
  font-family: "AppleSDGothicNeoM";
  display: flex;
  justify-content: space-between;
  align-items: end;
  cursor: pointer;
`;

const ContentText = styled.p`
  .name {
    font-weight: 700;
  }
  .content {
    font-weight: 700;
    color: var(--INFO);
  }
  .time {
    font-family: "AppleSDGothicNeoSB";
    font-size: 12px;
    line-height: 14px;
  }
`;

const ContentTime = styled.p`
  font-family: "AppleSDGothicNeoSB";
  font-size: 12px;
  line-height: 14px;
  color: var(--OVERLAY3);
`;

const Notinone = styled.div`
width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top:100px;
  font-family: "AppleSDGothicNeoSB";
  color:#D8D8D8;
  img {
    width: 60px;
    margin-bottom:20px;
    
  }




`

// const ContentItem = styled.div`
//   &::after {
//     content: "";
//     display: block;
//     width: 100%;
//     height: 0px;
//     border: 1px solid #cccccc;
//     margin: 20px 0;
//   }
//   &:last-child::after {
//     display: none;
//   }
// `;

// const Content = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-end;
//   font-family: "AppleSDGothicNeoM00", sans-serif;
//   font-style: normal;
//   font-weight: 700;
//   font-size: 14px;
//   line-height: 160%;
// `;
// const ContentText = styled.p`
//   width: 69.863%;
// `;
// const ContentTime = styled.p`
//   font-style: normal;
//   font-weight: 400;
//   font-size: 12px;
//   line-height: 14px;
//   color: var(--DEFAULT);
// `;
// const LinkStyle = styled(Link)`
//   color: #7f5fff;
//   &:last-child {
//     text-decoration: none;
//   }
// `;
