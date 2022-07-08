import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BlackButton } from '../../css/Style';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
const BasicInfo = () => {
  const test = useSelector(state => state)
  const authNum = 5421;
  const [userNum, setUserNum] = useState(null);
  const [authBtnDisable, setauthBtnDisable] = useState(false);
  const [authInputDisable, setAuthInputDisable] = useState(false);

  console.log(test)

  const navigate = useNavigate();
  const buttonAction = useCallback(() => {
    navigate('/signup/faceCustom');
  }, []);

  //타이머
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timerId = useRef(null);

  const auth = useCallback(() => {
    setauthBtnDisable(true);
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    // return () => clearInterval(timerId.current)
  }, []);

  useEffect(() => {
    if (authNum == userNum) {
      clearInterval(timerId.current);
      setAuthInputDisable(true);
    }
  }, [userNum]);

  useEffect(() => {
    if (time.current <= -1) {
      console.log('타임 아웃');
      clearInterval(timerId.current);
      setMin(3);
      setSec(0);
      time.current = 180;
      timerId.current = null;
      setauthBtnDisable(false);
    }
  }, [sec]);

  return (
    <div>
      <InfoMessage>
        <p className='message'>기본 정보를 입력해주세요</p>
        <p className='subMessage'>
          입력해 주신 정보는
          <br />
          맛기록 분석을 위해 사용됩니다
        </p>
      </InfoMessage>
      <InputBox>
        <section>
          <label htmlFor=''>Certification</label>
          <input type='text' placeholder='전화번호' />
          <div className='authNum'>
            <div>
              <input
                type='text'
                onChange={(e) => {
                  setUserNum(e.target.value);
                }}
                disabled={authInputDisable}
              />
              <span>
                {min}분{sec}초
              </span>
            </div>
            <button onClick={auth} disabled={authBtnDisable}>
              인 증
            </button>
          </div>
        </section>
        <section>
          <label htmlFor=''>Name</label>
          <input type='text' placeholder='김한나' />
        </section>
        <section>
          <label htmlFor=''>Birth date</label>
          <input type='text' />
        </section>
      </InputBox>

      <Button>
        <div onClick={buttonAction}>마지막 한 단계!</div>
      </Button>
    </div>
  );
};

const InfoMessage = styled.section`
  height: 162px;
  width: 100%;
  text-align: center;
  padding-top: 20px;
  .message {
    font-family: 'AppleSDGothicNeoL';
    line-height: 150%;
    font-size: 28px;
    padding-bottom: 12px;
  }
  .subMessage {
    font-family: 'AppleSDGothicNeoL';
    font-size: 16px;
    line-height: 150%;
    color: var(--DEFAULT);
  }
`;

const InputBox = styled.div`
  padding-bottom: 72px;
  section {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    label {
      font-family: 'Niramit';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      padding-bottom: 8px;
      padding-left: 14px;
    }
    input {
      font-family: 'AppleSDGothicNeoL';
      font-size: 12px;
      line-height: 22px;
      padding: 13px 20px;
      background: var(--WHITE);
      border: 2px solid #eeeeee;
      border-radius: 50px;
      margin-bottom: 10px;      
      outline: none;
      ::placeholder {
        color: var(--DEFAULT);
      }
    }
    .authNum {
      display: flex;
      justify-content: space-between;
      div {
        position:relative;
        display: flex;
        align-items: center;
        input {
          width: 206px;
          margin-bottom:0;
          :disabled {
            background-color: #eee;
          }
        }
        span {
          position: absolute;
          right:18px;
          color: var(--ERROR);
          font-size: 12px;
          font-family: 'AppleSDGothicNeoM';
          line-height:22px;
        }
      }

      button {
        width: 110px;
        height: 48px;
        background: var(--INFO);
        border-radius: 50px;
        border: none;
        font-family: 'AppleSDGothicNeoM';
        color: var(--WHITE);
        :disabled {
          opacity: 0.3;
        }
      }
    }
    input {
    height: 48px;
  }
  }
`;

const Button = styled(BlackButton)`
  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ::before {
    content: '정보는 비공개입니다. 언제든 수정도 가능해요!';
    position: absolute;
    top: -116px;
    font-family: 'AppleSDGothicNeoM';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    height: 100px;
    background: linear-gradient(to bottom, #00000000, #fff);
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: #818286;
    padding-bottom: 16px;
  }
`;

export default BasicInfo;
