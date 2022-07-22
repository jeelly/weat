import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

import { instance } from "../../shared/axios";
import { loadRoomDB } from "../../redux/modules/postSlice";

import { VioletButton } from "../../css/Style";
import styled from "styled-components";
import { eyeList } from "../../components/signup/FaceResource";

import { ReactComponent as SearchBtn } from "../../img/search.svg";
import { ReactComponent as Characterface } from "../../img/characterface.svg";
import roomIcon from "../../img/shareIcon.svg";
import flag from "../../img/icon/flag.svg";


const CodeSearch = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const roomCode = window.location.href.split("/").pop();
  const [searchCode, setSearchCode] = useState(
    roomCode.length === 6 ? roomCode : ""
  );
  const [roomInfo, setRoomInfo] = useState(null);
  const token = window.localStorage.getItem("token");

  //인풋 상태관리
  const onChangeInput = (e) => {
    setSearchCode(e.target.value);
  };

  //룸코드로 맛방 검색
  const searchRoomCode = async () => {
    try {
      const res = await instance.post("/api/rooms/searchR-Code", {
        roomCode: searchCode,
      });
      setRoomInfo(res.data.theRoom);
      console.log(res);
    } catch (e) {
      console.log(e);
      alert("공유코드를 확인해주세요!");
    }
  };

  //룸코드로 방입장
  const goIn = async () => {
    try{
      const res = await instance.put('/api/rooms/R-Code',{roomCode:searchCode})
      alert('맛방 입장 완료!')
      await dispatch(loadRoomDB(0));
      await navigate('/')
      console.log(res)
    }catch(e){
      console.log(e)
    }
  }

  //오너 눈 
  const ownerEyes = (eye) => {
    return eyeList.filter((row) => row.includes(eye) && row);
  };

  
  //로그인 안되어있을 시 로그인하세요 페이지
  useEffect(() => {
    if(!token){
      navigate('/roomshare/noentry') 
    }else if(token){
      searchRoomCode();
    }
  }, []);

  return (
    <CodeSearchWrap>
      <div className="searchBox">
        <p>
          <span>맛방 공유코드</span>를 입력해주세요
        </p>
        <label htmlFor="searchInput">
          <input
            type="text"
            id="searchInput"
            placeholder="공유코드 입력 (#숫자 6자리)"
            value={searchCode}
            onChange={onChangeInput}
          />
          <SearchBtn fill="#999" onClick={searchRoomCode} />
        </label>
      </div>
      {roomInfo ? (
        <SearchResultsBox ownerEyes={ownerEyes(roomInfo.ownerEyes)} flag={flag}>
          <section>
            <div>{<Characterface fill={roomInfo.ownerFaceColor} />}</div>
            <p className="owner">{roomInfo.owner}님의</p>
          </section>
          <section className="room">
            <p className="roomIcon">
              <img src={roomIcon} alt="" />
            </p>
            <p className="title">{roomInfo.roomName}</p>
            <p className="emoji">{roomInfo.emoji}</p>
            <p className="members">
              <span>{roomInfo.memberNum}</span> members
            </p>
          </section>
        </SearchResultsBox>
      ) : null}

      <VioletButton onClick={goIn}>맛방 입장</VioletButton>
    </CodeSearchWrap>
  );
};

const CodeSearchWrap = styled.div`
  .searchBox {
    width: 100%;
    text-align: center;
    padding-top: 20px;
    p {
      font-family: "AppleSDGothicNeoM";
      font-size: 20px;
      line-height: 26px;
      margin-bottom: 18px;
      span {
        color: #7f5fff;
      }
    }
    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      border: 2px solid #eeeeee;
      border-radius: 50px;
      margin: 0 16px;
      overflow: hidden;
      padding: 0 7px 0 20px;
      input {
        outline: none;
        border: none;
        width: 80%;
        font-family: "AppleSDGothicNeoM";
        font-size: 14px;
        line-height: 160%;
        ::placeholder {
          font-family: "AppleSDGothicNeoUL";
          font-size: 14px;
          line-height: 160%;
          color: #999999;
        }
      }
      svg {
        padding: 13px;
        box-sizing: content-box;
      }
    }
  }

  button {
    letter-spacing: 0.2em;
    font-family: "AppleSDGothicNeoUL";
  }
`;

const SearchResultsBox = styled.div`
  padding-top: 74px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
    margin: auto;

    svg {
      width: 40px;
    }
    ::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      background-image: url(${(props) => props.ownerEyes});
      background-size: cover;
    }
    ::before {
      content: "";
      display: block;
      position: absolute;
      top: -22px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 16px;
      height: 18px;
      background-image: url(${(props) => props.flag});
      background-size: cover;
    }
  }
  .owner {
    font-family: "AppleSDGothicNeoB";
    font-size: 12px;
    line-height: 160%;
    margin: 12px;
  }
  .room {
    width: 160px;
    height: 180px;
    background-color: var(--SUCCESS);
    border-radius: 20px;
    border: 4px solid var(--WHITE);
    box-shadow: var(--SHADOW1);
    position: relative;

    .roomIcon {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 14px;
    }
    .title {
      width: 100%;
      text-align: center;
      font-family: "AppleSDGothicNeoUL";
      font-size: 18px;
      line-height: 24px;
      color: #fff;
      margin-bottom: 12px;
    }
    .emoji {
      font-size: 36px;
      line-height: 1;
      text-align: center;
    }
    .members {
      position: absolute;
      bottom: 12px;
      width: 100%;
      text-align: center;
      font-family: "Niramit";
      font-style: normal;
      font-weight: 300;
      font-size: 10px;
      line-height: 16px;
      span {
        font-weight: 700;
        font-size: 12px;
      }
    }
  }
`;

export default CodeSearch;
