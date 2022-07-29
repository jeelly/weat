import React, { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../shared/axios";
import {useNavigate} from 'react-router-dom'
import LikeToggleBtn from "../components/LikeToggleBtn";

import { loadMyReviewDB } from "../redux/modules/myReviewSlice";

import { useDispatch, useSelector } from "react-redux";
import { eyeList } from "../components/signup/FaceResource";
import SlickSlider from "./SlickSlider";
import Score from "./Score";
import { ReactComponent as StarIcon } from "../img/icon/starIcon.svg";
import { ReactComponent as CloseBtn } from "../img/closeBtn.svg";
import { ReactComponent as Modify } from "../img/modify.svg";
import { ReactComponent as Trash } from "../img/trash.svg";
import { ReactComponent as Face } from "../img/characterface.svg";
import { ReactComponent as Flag } from "../img/icon/flagIcon.svg";
import { device } from "../css/GlobalStyles";
import AlertModal from "../components/mypageEdit/AlertModal";

const ReviewModal = ({ reviewInfo, modalAction }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const startList = [1, 2, 3, 4, 5];

  const { myReview } = useSelector((state) => state.myReviewList);
  const filtering = (id) => {
    if (id.madiId === reviewInfo.madiId) {
      return id;
    }
  };
  const reviewItem = myReview.filter(filtering);

  const [review, setReview] = useState(null);
  const matmadiInfo = async () => {
    try {
      const { data } = await instance.get(
        `/api/store/matmadi/${reviewInfo.madiId}`
      );
      setReview(data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const userEye = (eye) => {
    if (eye === "type1") {
      return eyeList.filter((row) => row.includes(`${eye}.`) && row);
    } else {
      return eyeList.filter((row) => row.includes(eye) && row);
    }
  };

  const deleteReview = async () => {
    try{
      const {data} = await instance.delete(`/api/store/matmadi/${reviewInfo.madiId}`)
      matmadiInfo()
      modalAction();
      navigate('/mypage_edit/myreview')
      console.log(data)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    matmadiInfo();
    dispatch(loadMyReviewDB());
  }, [reviewInfo, dispatch, modalAction]);

  const [alertModal, setAlertModal] = useState(false)
  const [alertModalType, setAlertModalType] = useState("")
  const alertModalOpen = (boolean, type = null) =>{
    setAlertModalType(type)
    setAlertModal(boolean)    
  }
  
  return (<>
    <ReviewModalWrap>
      {review && (
        <>
          <ReviewModalHeader>
            <Modify  onClick={() => alertModalOpen(true, "none")}/>
            <div>
              <Trash  onClick={deleteReview}/>
              <CloseBtn
                fill="#fff"
                onClick={() => {
                  modalAction();
                }}
              />
            </div>
          </ReviewModalHeader>
          <Writer eyes={userEye(review.eyes)}>
            <section className="userProfileSection">
              <div className="face">
                <Flag className="flag" fill="#fff" />
                <Face fill={review.faceColor} />
              </div>
              <div className="userNameBox">
                <p>{review.nickname}</p>
                <p>{review.createdAt}</p>
              </div>
            </section>
            <LikeToggleBtn
              likeDone={reviewItem[0].LikeDone}
              likeNum={reviewItem[0].LikeNum}
              madiId={reviewItem[0].madiId}
            />
          </Writer>
          <div>
            <SlickSlider reviewImg={review.imgURL} />
          </div>
          <div className="storeInfo">
            <p className="storeName">{review.storeName}</p>
            <div>
              <p className="star">
                {startList.map((star, idx) => (
                  <StarIcon
                    fill={idx < review.star ? "#fff" : "transparent"}
                    stroke="#fff"
                    key={review.madiId + "Star" + idx}
                    style={{ margin: "0 2px" }}
                  />
                ))}
              </p>
            </div>
            {review.comment && <p className="comment"> &#34;{review.comment}&#34;</p>}
          </div>
          <div className="scoreBox">
            <Score review={review} />
          </div>
        </>
      )}
      
    </ReviewModalWrap>
    {alertModal && <AlertModal type={alertModalType} alertModalOpen={alertModalOpen}/>}
    </>
  );
};

const ReviewModalWrap = styled.div`
@media ${device.pc} {
    width: 480px;
    left: 50%;
    transform: translate(-50%,0);
  }
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
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
