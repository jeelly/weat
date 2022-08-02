import React, { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../shared/axios";
import { useNavigate } from "react-router-dom";
import LikeToggleBtn from "./LikeToggleBtn";
import { useQuery } from "react-query";

import { loadMyReviewDB } from "../redux/modules/myReviewSlice";

import { useDispatch, useSelector } from "react-redux";
import { eyeList } from "./signup/FaceResource";
import SlickSlider from "./SlickSlider";
import Score from "./Score";
import { ReactComponent as StarIcon } from "../img/icon/starIcon.svg";
import { ReactComponent as CloseBtn } from "../img/closeBtn.svg";
import { ReactComponent as Modify } from "../img/modify.svg";
import { ReactComponent as Trash } from "../img/trash.svg";
import { ReactComponent as Face } from "../img/characterface.svg";
import { ReactComponent as Flag } from "../img/icon/flagIcon.svg";
import { device } from "../css/GlobalStyles";
import AlertModal from "./mypageEdit/AlertModal";
import { likeAction } from "./likeAction";

const ReviewModal = ({ data, modalAction }) => {
  const dispatch = useDispatch();
  const startList = [1, 2, 3, 4, 5];
  const matmadi = data;
  const [matmadiData, setMatmadiData] = useState(null);
  const {userInfo} = useSelector(state => state.loggedIn)
console.log(userInfo)
console.log(matmadiData)

  //눈w
  const userEye = (eye) => {
    return eyeList.filter((row) => row.includes(eye) && row);
  };

  const reviewData = async () => {
    try {
      const { data } = await instance.get(`/api/store/matmadi/${matmadi}`);
      setMatmadiData(data.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    reviewData();
  }, []);

  const [alertModal, setAlertModal] = useState(false);
  const [alertModalType, setAlertModalType] = useState("");
  const alertModalOpen = (boolean, type = null) => {
    setAlertModalType(type);
    setAlertModal(boolean);
  };

  return (
    <>
      <ReviewModalWrap>
        {matmadiData && (
          <>
            <ReviewModalHeader>
              {(userInfo.nickname === matmadiData.nickname) && <Modify onClick={() => alertModalOpen(true, "none")} />}
              <div className="trashBox">
                {(userInfo.nickname === matmadiData.nickname) &&<Trash />}
                <CloseBtn
                  fill="#fff"
                  onClick={() => {
                    modalAction();
                  }}
                />
              </div>
            </ReviewModalHeader>
            <Writer eyes={userEye(matmadiData.eyes)}>
              <section className="userProfileSection">
                <div className="face">
                  <Flag className="flag" fill="#fff" />
                  <Face fill={matmadiData.faceColor} />
                </div>
                <div className="userNameBox">
                  <p>{matmadiData.nickname}</p>
                  <p>{matmadiData.createdAt}</p>
                </div>
              </section>
              <LikeToggleBtn
                likeDone={matmadiData.likeDone}
                likeNum={matmadiData.likeNum}
                madiId={matmadi}
                reviewData={reviewData}
              />
            </Writer>
            <div>
              <SlickSlider reviewImg={matmadiData.imgURL} />
            </div>
            <div className="storeInfo">
              <p className="storeName"></p>
              <div>
                <p className="star">
                  {startList.map((star, idx) => (
                    <StarIcon
                      fill={idx < matmadiData.star ? "#fff" : "transparent"}
                      stroke="#fff"
                      key={matmadiData.madiId + "Star" + idx}
                      style={{ margin: "0 2px" }}
                    />
                  ))}
                </p>
              </div>
              {matmadiData.comment && (
                <p className="comment"> &#34;{matmadiData.comment}&#34;</p>
              )}
            </div>
            <div className="scoreBox">
              <Score review={matmadiData} />
            </div>
          </>
        )}
      </ReviewModalWrap>
      {alertModal && (
        <AlertModal type={alertModalType} alertModalOpen={alertModalOpen} />
      )}
    </>
  );
};

const ReviewModalWrap = styled.div`
  @media ${device.pc} {
    width: 480px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  .storeInfo {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    color: #ffffff;
    .storeName {
      font-family: "AppleSDGothicNeoSB";
      font-size: 18px;
      line-height: 22px;
      text-align: center;
      text-transform: capitalize;
      margin-bottom: 12px;
    }
    .comment {
      font-family: "AppleSDGothicNeoUL";
      font-size: 14px;
      line-height: 160%;
      margin-top: 8px;
    }
  }
`;
const ReviewModalHeader = styled.div`
  width: 100%;
  height: 16px;
  margin: 17px 0 18px;
  padding: 0 20px 0 16px;
  display: flex;
  justify-content: space-between;
  div {
    justify-content: end;
    display: flex;
    width: 100%;
    svg {
      margin-left: 35px;
    }
  }
`;
const Writer = styled.div`
  display: flex;
  padding: 38px 30px 0;
  justify-content: space-between;
  section.userProfileSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .face {
      width: 42px;
      height: 42px;
      background-color: #fff;
      border-radius: 50%;
      border: 2px solid #fff;
      position: relative;
      margin-right: 13px;
      ::after {
        content: "";
        display: block;
        background-image: url(${(props) => props.eyes});
        background-size: cover;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
      }
      .flag {
        position: absolute;
        top: -18px;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
    .userNameBox {
      color: #fff;
      font-family: "AppleSDGothicNeoSB";
      font-size: 12px;
      line-height: 160%;
      display: flex;
      align-items: center;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      p:last-child {
        font-family: "Niramit";
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 13px;
        color: #999999;
      }
    }
  }
`;
export default ReviewModal;
