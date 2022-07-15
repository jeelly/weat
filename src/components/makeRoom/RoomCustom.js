import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
// import { keypad, addName } from "../../redux/modules/emojiSlice";
import {
  addName,
  emojiKeyboardActivation,
} from "../../redux/modules/roomMakingSlice";

//이미지
import resetBtn from "../../img/icon/reset.svg";
import defaultImg from "../../img/emojiDefault.png";

const RoomCustom = () => {
  const dispatch = useDispatch();
  const emojiArea = useRef();
  const { tasteRoom } = useSelector(state => state.roomMaking);

  //이모지 출력부분과 이모지 키보드 부분을 뺀 나머지 영역을 클릭할경우 키패드 사라짐
  const setTarget = (e) => {
    const emojiKeypad = document.querySelector(".emoji-picker-react");
    if (
      emojiArea.current.contains(e.target) ||
      (emojiKeypad ? emojiKeypad.contains(e.target) : null)
    ) {
      return null;
    } else {
      dispatch(emojiKeyboardActivation(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", setTarget);
  }, []);

  //emoji+이미지 누르면 키보드 활성화
  const keypadOn = () => {
    dispatch(emojiKeyboardActivation(true));
  };

  //룸이름 저장
  const naming = (e) => {
    dispatch(addName(e.target.value));
  };

  return (
    <div>
      <RoomWrap>
        <RoomBox>
          <InputWrap>
            <textarea
              cols="2"
              placeholder="제목을 지어주세요"
              onChange={naming}
              maxLength="8"
            />
            <p>
              <img src={resetBtn} alt="" />
            </p>
          </InputWrap>
          <EmojiWrap>
            <div onClick={keypadOn} ref={emojiArea}>
              {tasteRoom.emoji ? (
                tasteRoom.emoji
              ) : (
                <img src={defaultImg} alt="" />
              )}
            </div>
            <p>대표할 이모지를 선택해주세요</p>
          </EmojiWrap>
        </RoomBox>
      </RoomWrap>
    </div>
  );
};

const RoomWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;
const RoomBox = styled.div`
  width: 272px;
  height: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffbb55;
  border-radius: 20px;
  border: 8px solid #fff;
  box-shadow: var(--SHADOW1);
  padding-top: 41px;
  position: relative;
`;
const InputWrap = styled.div`
  margin-bottom: 16px;

  textArea {
    width: 187px;
    background-color: #00000000;
    border: none;
    outline: none;
    font-family: "AppleSDGothicNeoUL";
    font-style: normal;
    font-weight: 300;
    font-size: 26px;
    line-height: 31px;
    color: #fff;
    text-align: center;
    white-space: pre-wrap;
    resize: none;

    ::placeholder {
      color: #fff;
      opacity: 0.5;
    }
  }
  p {
    position: absolute;
    top: 21px;
    right: 22px;
    width: 16px;
    height: 16px;
    img {
      width: 100%;
    }
  }
`;
const EmojiWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 100px;
    height: 103px;
    font-size: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    img {
      width: 100%;
    }
  }
  p {
    font-family: "AppleSDGothicNeoM";
    font-size: 12px;
    line-height: 14px;
    color: #999999;
    opacity: 0.4;
    padding-top: 16px;
  }
`;
export default RoomCustom;
