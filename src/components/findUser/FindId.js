import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BlackButton } from "../../css/Style";
import instance from "../../shared/axios";
import { VioletRoundTextBtn } from "../../css/Style";

const FindId = () => {
  const navigate = useNavigate();
  const [authNum, setAuthNum] = useState("");
  const [userNum, setUserNum] = useState(null);
  const [authBtnDisable, setauthBtnDisable] = useState(false);
  const [authInputDisable, setAuthInputDisable] = useState(false);
  const [authCheck, setAuthCheck] = useState(true);
  const [email, setEmail] = useState("");

  //타이머
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timerId = useRef(null);

  const auth = useCallback(() => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);
  }, []);

  const authNunCheck = useCallback(() => {
    if (authNum == userNum) {
      setauthBtnDisable(true);
      clearInterval(timerId.current);
      setAuthInputDisable(true);
      setAuthCheck(true);
      findID()
    } else {
      setAuthCheck(false);
    }
  }, [userNum]);

  useEffect(() => {
    if (time.current <= -1) {
      console.log("타임 아웃");
      clearInterval(timerId.current);
      setMin(3);
      setSec(0);
      time.current = 180;
      timerId.current = null;
      setauthBtnDisable(false);
    }
  }, [sec]);

  //메일 발송
  const send = async () => {
    try {
      const res = await instance.post("api/users/sendmail", {email});
      await auth();
      await setAuthNum(res.data.authNum);
      console.log(res);
    } catch (e) {
      alert('이메일을 확인해 주세요.')
      console.log(e);
    }
  };

  //아아디찾기
  const findID = async() => {
      try{
        const res = await instance.post('/api/users/findUserId',{email})
        await navigate('/finduser/findiddescription',{
          state: res.data
        })
      }catch(e){
        alert('이메일을 확인해 주세요.')
        console.log(e)
      }
    }

  return (
    <div>
      <InputBox>
        <section>
          <label htmlFor="">Certification</label>
          <input
            type="text"
            placeholder="이메일 주소"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="authNum">
            <div>
              <input
                type="text"
                onChange={(e) => {
                  setUserNum(e.target.value);
                }}
                disabled={authInputDisable}
              />
              {authInputDisable ? (
                ""
              ) : (
                <span>
                  {min}분{sec}초
                </span>
              )}
            </div>
            <VioletRoundTextBtn
              onClick={authNunCheck}
              disabled={authBtnDisable}
            >
              인 증
            </VioletRoundTextBtn>
          </div>
          {authCheck ? (
            ""
          ) : (
            <AuthDescription>*인증번호가 맞지 않습니다.</AuthDescription>
          )}
        </section>
        <BlackButton onClick={send}>발 송</BlackButton>
      </InputBox>
    </div>
  );
};

const InputBox = styled.div`
  padding-bottom: 142px;
  section {
    display: flex;
    flex-direction: column;
    label {
      font-family: "Niramit";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      padding-bottom: 8px;
      padding-left: 14px;
    }
    input {
      font-family: "AppleSDGothicNeoL";
      font-size: 12px;
      line-height: 22px;
      padding: 12px 20px;
      background: var(--WHITE);
      border: 2px solid #eeeeee;
      border-radius: 50px;
      margin-bottom: 10px;
      outline: none;
      ::placeholder {
        color: var(--DEFAULT);
      }
      :focus {
        border: 2px solid var(--LIGHTER);
      }
    }
    .authNum {
      display: flex;
      justify-content: space-between;
      div {
        position: relative;
        display: flex;
        align-items: center;
        input {
          width: 206px;
          margin-bottom: 0;
          :disabled {
            background-color: #f2f2f2;
          }
        }
        span {
          position: absolute;
          right: 18px;
          color: var(--ERROR);
          font-size: 12px;
          font-family: "AppleSDGothicNeoM";
          line-height: 22px;
        }
      }
    }
    input {
      height: 48px;
    }
  }
`;

const AuthDescription = styled.span`
  font-family: "AppleSDGothicNeoM";
  font-size: 12px;
  line-height: 22px;
  color: var(--ERROR);
  padding-left: 14px;
  margin-top: 6px;
`;
export default FindId;
