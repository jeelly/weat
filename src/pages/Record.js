import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NoticeModal from "../components/NoticeModal";
import home from "../img/home.svg";
import bell from "../img/bell.svg";
import { Container } from "../css/GlobalStyles";
import instance from "../shared/axios";
import { useEffect } from "react";
import { ReactComponent as Characterface } from "../img/characterface.svg";
import { eyeList } from "../components/signup/FaceResource";
import TasteTag from "../components/review/TasteTag";
import BottomNavi from "../components/BottomNavi";

const Record = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(null);
  const [matchCount, setMatchCount] = useState(null);
  const [reKing, setReKing] = useState(null);
  const [poKing, setPoKing] = useState(null);
  let notiCount = localStorage.getItem("newNoti");
  const [tagData, setTagData] = useState({
    medium: [],
    large: [],
    small: [],
  });
  const notiModalOpen = () => {
    setModal(true);
    localStorage.setItem("newNoti", 0);
  };

  const userEye = (eye) => {
    return eyeList.filter((row) => row.includes(eye) && row);
  };

  //상단 타이틀
  const analyzeDB = async () => {
    try {
      const { data } = await instance.get("/api/analyze");
      setTitle(data);
    } catch (e) {
      console.log(e);
    }
  };

  //먹 매치 포인트
  const matchDB = async () => {
    try {
      const { data } = await instance.get("/api/analyze/match");
      setMatchCount(data);
    } catch (e) {
      console.log(e);
    }
  };

  //왕들
  const reviewKing = async () => {
    try {
      const { data } = await instance.get("/api/analyze/re-King");
      setReKing(data);
    } catch (e) {
      console.log(e);
    }
  };
  const postKing = async () => {
    try {
      const { data } = await instance.get("/api/analyze/post-King");
      setPoKing(data);
    } catch (e) {
      console.log(e);
    }
  };

  //최애 음식
  const tag = async () => {
    try {
      const { data } = await instance.get("/api/analyze/tag");
      const { TheResult } = data;
      console.log(TheResult);
      const small = TheResult.filter((v) => v.tagNum === 1).map(
        (item, idx) => item.tagName
      );
      const medium = TheResult.filter(
        (v) => v.tagNum === 2 || v.tagNum === 3
      ).map((item, idx) => item.tagName);
      const large = TheResult.filter((v) => v.tagNum >= 4).map(
        (item, idx) => item.tagName
      );
      console.log(small);
      setTagData({
        medium: medium,
        large: large,
        small: small,
      });
    } catch (e) {
      console.log(e);
    }
  };
  console.log(tagData);
  useEffect(() => {
    analyzeDB();
    matchDB();
    reviewKing();
    postKing();
    tag();
  }, []);

  return (
    <>
      <Container>
        <RecordWrap>
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
          {title && (
            <div className="mainTitleBox">
              <div className="mainTitle">
                이번 달,
                <br />
                <span className="bold">{title.monthPost}곳</span>의 맛집을
                발견하셨네요!
              </div>
              <p>
                벌써 총{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/mypage_edit/myreview");
                  }}
                >
                  <span className="bold color">{title.MyReivewsNum}</span>
                  <span className="color">건</span>
                </span>
                의 리뷰를 남기셨어요.
              </p>
            </div>
          )}
          <section className="gridType1">
            <div className="recordContent">
              <div className="titleBox">
                <div className="subTitle">먹 매치포인트</div>
                <p className="annotation">
                  방문한 곳이 나와 가장 많이 겹치는 사람은 누구?
                </p>
              </div>
              <div className="matchPoint">
                <ul>
                  {matchCount &&
                    matchCount.map((item, idx) => (
                      <li key={`matchCount_${idx}`}>
                        <PointBar matchCount={item.matchCount}>
                          <p></p>
                        </PointBar>
                        <UserInfo eyes={userEye(item.eyes)}>
                          <div className="face">
                            <Characterface fill={item.faceColor} />
                          </div>
                          <div className="userNick">{item.nickname}</div>
                        </UserInfo>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </section>
          {poKing && reKing && (
            <section className="gridType2">
              <div className="post-King recordContent">
                <div className="subTitle">발견왕</div>
                <KingFace eyes={userEye(poKing.eyes)}>
                  <Characterface fill={poKing.faceColor} />
                </KingFace>
                <p className="kingNickname">{poKing.nickname}</p>
              </div>
              <div className="re-King recordContent">
                <div className="subTitle">리뷰왕</div>
                <KingFace eyes={userEye(reKing.eyes)}>
                  <Characterface fill={reKing.faceColor} />
                </KingFace>
                <p className="kingNickname">{reKing.nickname}</p>
              </div>
            </section>
          )}
          <section className="gridType1">
            <div className="tagContainer">
              <div className="tagTitleBox">
                <div className="subTitle">나의 최애 음식</div>
                <p className="annotation">나도 몰랐던 나의 최애 음식!</p>
              </div>
              <div className="tagBox">
                {tagData.medium.map((medium, i) => (
                  <>
                    <p key={i} className="medium">
                      {medium}
                    </p>
                  </>
                ))}
                {tagData.large.map((large, i) => (
                  <p key={i} className="large">
                    {large}
                  </p>
                ))}
                {tagData.small.map((small, i) => (
                  <p key={i} className="small">
                    {small}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </RecordWrap>
      </Container>
      <BottomNavi />
    </>
  );
};

const RecordWrap = styled.div`
  height: 100%;
  min-height: 100vh;
  .mainTitleBox {
    margin-top: 20px;
    margin-bottom: 40px;
    font-family: "AppleSDGothicNeoL";
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.02em;
    color: #000000;
    p {
      font-size: 16px;
      line-height: 19px;
      margin-top: 12px;
    }
    span.bold {
      font-weight: 600;
    }
    span.color {
      display: inline-block;
      color: var(--INFO);
      border-bottom: 1px solid var(--INFO);
      height: 17px;
    }
  }
  section {
    padding-bottom: 37px;
    text-align: center;
    .subTitle {
      font-family: "AppleSDGothicNeoB";
      font-size: 18px;
      line-height: 22px;
      color: #000000;
    }
  }
  .recordContent {
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .kingNickname {
      font-family: "AppleSDGothicNeoB";
      font-size: 12px;
      line-height: 14px;
      text-align: center;
      color: #000000;
    }
  }
  .gridType1 {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
  }
  .gridType2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 8px;
    align-items: center;
    justify-content: center;
  }

  .annotation {
    font-family: "AppleSDGothicNeoUL";
    font-size: 14px;
    line-height: 160%;
    text-align: center;
    color: #999999;
    margin-top: 4px;
  }
  .matchPoint {
    ul {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      height: 196px;

      li {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        .pointBar {
        }
        :nth-child(1) p {
          height: 100%;
          background-color: var(--INFO);
        }
        :nth-child(2) p {
          height: 80%;
        }
        :nth-child(3) p {
          height: 60%;
        }
        :nth-child(4) p {
          height: 40%;
        }
        :nth-child(5) p {
          height: 20%;
        }
        :last-child {
          margin-right: 0px;
        }
        .userInfo {
        }
      }
    }
  }
  .tagContainer {
    width: 100%;
    height: 292px;
    padding: 32px 20px 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    .tagBox {
      width: 100%;
      height: 160px;
      position: relative;
      p {
        font-family: "AppleSDGothicNeoUL";
        font-style: normal;
        font-weight: 300;
        line-height: 160%;
        color: var(--INFO);
        position: absolute;
        font-size: 18px;
      }
      p.large {
        font-size: 32px;
      }
      p.medium {
        font-size: 24px;
      }

      p:nth-child(1) {
        left: 5%;
        top: 95%;
      }
      p:nth-child(2) {
        left: 19%;
        top: 70%;
      }
      p:nth-child(3) {
        left: 7%;
        top: 45%;
      }

      p:nth-child(4) {
        left: 45%;
        top: 95%;
      }
      p:nth-child(5) {
        left: 50%;
        top: 55%;
      }
      p:nth-child(6) {
        left: 75%;
        top: 45%;
      }

      p:nth-child(7) {
        left: 26%;
        top: 35%;
      }
      p:nth-child(8) {
        left: 56%;
        top: 25%;
      }
      p:nth-child(9) {
        left: 4%;
        top: 15%;
      }
      p:nth-child(10) {
        left: 72%;
        top: 5%;
      }
    }
  }
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

const NotiCount = styled.span`
  position: absolute;
  right: -36%;
  top: -20%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--INFO);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: "Niramit";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
`;

const PointBar = styled.div`
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  p {
    background-color: #999;
    width: 12px;
    border-radius: 50px 50px 0 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ::after {
      content: "${(props) => props.matchCount}";
      position: absolute;
      top: -26px;
      font-family: "Niramit";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
      text-transform: capitalize;
      color: #000000;
    }
  }
`;
const UserInfo = styled.div`
  width: 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .face {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #fff;
    box-sizing: content-box;
    box-shadow: var(--SHADOW1);
    margin-top: 8px;
    position: relative;
    ::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      width: 24px;
      height: 24px;
      transform: translate(-50%, 0);
      background-image: url(${(props) => props.eyes});
      background-size: cover;
    }
  }
  .userNick {
    font-family: "AppleSDGothicNeoB";
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    color: #000000;
    margin-top: 8px;
  }
`;

const KingFace = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  border: 4px solid #fff;
  position: relative;
  box-shadow: var(--SHADOW1);
  margin: 12px 0 12px;
  ::after {
    content: "";
    display: block;
    width: 84px;
    height: 84px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    background-image: url(${(props) => props.eyes});
    background-size: cover;
  }
`;

const TagBox = styled.section``;
export default Record;
