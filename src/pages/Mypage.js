import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../css/GlobalStyles";
import home from "../img/home.svg";
import bell from "../img/bell.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import NoticeModal from "../components/NoticeModal";
import { ReactComponent as Characterface } from "../img/characterface.svg";
import { eyeList } from "../components/signup/FaceResource";
import myReview from "../img/myReview.svg";
import mailOpen from "../img/mailOpen.svg";
import AlertModal from "../components/mypageEdit/AlertModal";
import BottomNavi from '../components/BottomNavi';

const Mypage = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false)
  const [alertModalType, setAlertModalType] = useState("")
  const { userInfo } = useSelector((state) => state.loggedIn);
  let notiCount = localStorage.getItem("newNoti");
  const notiModalOpen = () => {
    setModal(true);
    localStorage.setItem("newNoti", 0);
  };

  const userEye = (eye) => {
    return eyeList.filter((row) => row.includes(`${userInfo.eyes}.`) && row);
  };

  
  const alertModalOpen = (boolean, type = null) =>{
    setAlertModalType(type)
    setAlertModal(boolean)    
  }

  return (
    <>
      <MypageWrap>
        {alertModal && <AlertModal type={alertModalType} alertModalOpen={alertModalOpen}/>}
        <MypageHeader>
          <Navi>
            <NoticeModal modal={modal} setModal={setModal} />
            <p
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={home} alt="홈 버튼" />
            </p>
            <p onClick={notiModalOpen}>
              {Number(notiCount) > 0 && <NotiCount>{notiCount}</NotiCount>}
              <img src={bell} alt="알림창 버튼" />
            </p>
          </Navi>
          <ProfileSection eyes={userEye(userInfo.eyes)}>
            <div className="profileWrap">
              <div className="faceContent">
                <Characterface fill={userInfo.faceColor} />
              </div>
              <div className="profileContent">
                <div className="nicknameBox">
                  <p>{userInfo.nickname}</p>
                  <span
                    onClick={() => {
                      navigate("/mypage_edit/character_edit");
                    }}
                  >
                    편집
                  </span>
                </div>
                <div className="mail">{userInfo.email}</div>
              </div>
            </div>
            <ReviewBox>
              <ul>
                <li onClick={() => navigate('/mypage_edit/myreview')}>
                  <img src={myReview} alt="내가 쓴 리뷰 확인" />
                  나의 리뷰관리
                </li>
                <li onClick={() => alertModalOpen(true, "none")}>
                  <img src={mailOpen} alt="내가 쓴 리뷰 확인" />
                  초대받은 맛방
                </li>
              </ul>
            </ReviewBox>
          </ProfileSection>
        </MypageHeader>
        <ManuWrap>
          <ul>
            <li>
              <span>{userInfo.customerId}</span>
              <span onClick={() => alertModalOpen(true, "logout")}>로그아웃</span>
            </li>
            <li onClick={() => navigate("/mypage_edit/change_password")}>
              <span>비밀번호 변경</span>
            </li>
            <li
              onClick={() =>
                navigate("/mypage_edit/change_personalinformation")
              }
            >
              <span>개인정보 수정</span>
            </li>
            <li onClick={() => alertModalOpen(true, "none")}>
              <span>FAQ</span>
            </li>
            <li>
              <span>의견보내기</span>
            </li>
            <li>
              <span>개인정보처리 방침</span> <span onClick={() => alertModalOpen(true, "secession")}>회원탈퇴</span>
            </li>
          </ul>
        </ManuWrap>
      </MypageWrap>
      <BottomNavi />
      
    </>
  );
};

const MypageWrap = styled.div``;
const MypageHeader = styled(Container)`
  background-color: var(--INFO);
`;

const Navi = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    :last-child {
      position: relative;
    }
  }
`;

const ProfileSection = styled.div`
  height: 148px;
  position: relative;
  background-color: var(--INFO);
  .profileWrap {
    display: flex;
    align-items: center;
    height: 68px;
    margin-top: 20px;
    .faceContent {
      width: 62px;
      height: 62px;
      overflow: hidden;
      background-color: #fff;
      border-radius: 50%;
      border: 3px solid #fff;
      box-sizing: content-box;
      position: relative;
      ::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-image: url(${(props) => props.eyes});
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .profileContent {
      padding-left: 12px;
      div.nicknameBox {
        display: flex;
        font-family: "AppleSDGothicNeoSB";
        font-size: 20px;
        line-height: 24px;
        color: #fff;
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          padding: 3px 13.5px 2px;
          margin-left: 8px;
          background-color: #fff;
          line-height: 14px;
          color: var(--INFO);
          border-radius: 500px;
        }
      }
      div.mail {
        font-family: "Niramit";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #ccc;
        margin-top: 10px;
      }
    }
  }
`;
const ReviewBox = styled.div`
  position: absolute;
  bottom: -30px;
  width: 100%;
  height: 90px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  ul {
    display: flex;
    height: 100%;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: "AppleSDGothicNeoB";
      font-size: 14px;
      line-height: 160%;
      width: 50%;
      height: 100%;
      :first-child {
        border-right: 1px solid #f5f5f5;
      }
      img {
        margin-bottom: 4px;
      }
    }
  }
`;
const ManuWrap = styled.div`
  ul {
    margin-top: 38px;
    li {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: "AppleSDGothicNeoM";
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 160%;
      span {
        padding-left: 20px;
      }
      :not(:first-child, :last-child) {
        padding-left: 10px;
      }
      :first-child,
      :last-child {
        font-family: "AppleSDGothicNeoB";
        font-size: 14px;
        line-height: 160%;
        padding-left: 16px;
        padding-right: 16px;
        span {
          :first-child {
            padding-left: 14px;
          }
          :last-child {
            font-family: "AppleSDGothicNeoSB";
            padding-right: 14px;
          }
        }
      }
      :first-child {
        border-bottom: 1px solid #f5f5f5;
        span {
          :last-child {
            color: var(--ERROR);
          }
        }
      }
      :last-child {
        border-top: 1px solid #f5f5f5;
        color: #999;
      }
      :hover {
        background-color: #f5f5f5;
      }
      :active {
        background-color: #f5f5f5;
      }
    }
  }
`;

const NotiCount = styled.span`
  position: absolute;
  right: -36%;
  top: -20%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--INFO);
  font-family: "Niramit";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
`;
export default Mypage;
