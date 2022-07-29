import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as StarIcon } from "../../img/icon/starIcon.svg";
import LikeToggleBtn from "../LikeToggleBtn";
import ReviewModal from "../ReviewModal";
import { loadMyReviewDB } from "../../redux/modules/myReviewSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import none from "../../img/none.svg";
import { useNavigate } from "react-router-dom";

const Myreview = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const startList = [1, 2, 3, 4, 5];
  const [reviewInfo, setReviewInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { myReview } = useSelector((state) => state.myReviewList);

  const modalAction = () => {
    setModalOpen(!modalOpen);
  };
  const onClickItem = (item) => {
    setReviewInfo(item);
    modalAction();
  };
  console.log(myReview);
  useEffect(() => {
    dispatch(loadMyReviewDB());
  }, []);
  return (
    <>
      <MyreviewWrap>
        <div className="title">
          <p>나의 리뷰관리</p>
          <span>
            Total<span>{myReview && myReview.length}</span>
          </span>
        </div>
        <section className="reviewListBox">
          {myReview.length > 0 ? (
            <ul className="reviewList">
              {myReview.map((item, idx) => (
                <Items img={item.imgURL[0]} key={item.madiId}>
                  <section
                    className="reviewItemBox"
                    onClick={() => onClickItem(item)}
                  >
                    <div className="imgArea"></div>
                    <div className="storeInfo">
                      <p className="storeName">{item.storeName}</p>
                      <section className="commentBox">
                        <p className="star">
                          {startList.map((star, idx) => (
                            <StarIcon
                              fill={idx < item.star ? "#000" : "#fff"}
                              stroke="#000"
                              key={item.madiId + "Star" + idx}
                              style={{ margin: "0 2px" }}
                            />
                          ))}
                        </p>
                        <p className="comment"> &#34;{item.comment}&#34;</p>
                      </section>
                    </div>
                  </section>
                  <LikeBtn>
                    <LikeToggleBtn
                      likeDone={item.LikeDone}
                      likeNum={item.LikeNum}
                      madiId={item.madiId}
                    />
                  </LikeBtn>
                </Items>
              ))}
            </ul>
          ) : (
            <ReviewNone>
              <img src={none} alt="" />
              <div>작성한 리뷰가 없네요 :(</div>
              <p onClick={()=>{navigate('/map')}}>맛방 추가하고 리뷰 남기기</p>
            </ReviewNone>
          )}
        </section>
      </MyreviewWrap>
      {modalOpen && (
        <ReviewModal reviewInfo={reviewInfo} modalAction={modalAction} />
      )}
    </>
  );
};

const MyreviewWrap = styled.div`
  .title {
    font-family: "AppleSDGothicNeoSB";
    font-size: 18px;
    line-height: 160%;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    span {
      font-family: "Niramit";
      font-weight: 300;
      font-size: 10px;
      line-height: 13px;
      text-align: center;
      letter-spacing: -0.02em;
      color: #999;
      line-height: 160%;
      span {
        font-weight: 700;
        font-size: 12px;
        padding-left: 3px;
      }
    }
  }
  ul.reviewList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    justify-content: space-between;
    width: 100%;
  }
`;

const Items = styled.li`
  position: relative;
  width: 100%;
  min-width: 160px;
  height: 238px;
  :first-child {
    ::after {
      content: "BEST";
      position: absolute;
      left: 50%;
      top: 30.5%;
      transform: translate(-50%, 0);
      font-family: "Niramit";
      font-style: normal;
      font-weight: 700;
      font-size: 10px;
      line-height: 13px;
      color: #f5f5f5;
    }
  }
  section.reviewItemBox {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--SHADOW1);
    text-align: center;
  }

  .imgArea {
    height: 44%;
    width: 100%;
    margin-bottom: 36px;
    background-image: url(${(props) => props.img});
    background-size: cover;
    ::after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .storeInfo {
    p.storeName {
      font-family: "AppleSDGothicNeoB";
      font-size: 18px;
      line-height: 22px;
      text-align: center;
      text-transform: capitalize;
      color: #000000;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 10px;
    }
  }
  .commentBox {
    p.star {
      margin-top: 12px;
      height: 16px;
    }
    p.comment {
      font-family: 'AppleSDGothicNeoM';
    font-size: 14px;
    line-height: 160%;
    color: rgb(0, 0, 0);
    margin-top: 8px;
    white-space: nowrap;
    padding: 0 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    }
  }
`;

const LikeBtn = styled.span`
  position: absolute;
  left: 50%;
  top: calc(44% - 16px);
  transform: translate(-50%, 0);
`;

const ReviewNone = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  div {
    font-family: "AppleSDGothicNeoSB";
    font-size: 20px;
    color: #d8d8d8;
    margin-top:50px;
  }
  p {
    border-bottom: 1px solid #777;
    color: #777;
    margin-top: 15px;
    cursor: pointer;
  }
`;
export default Myreview;
