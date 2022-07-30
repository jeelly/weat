import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BlackButton } from "../../css/Style";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../shared/axios";
import { addDasicInfo } from "../../redux/modules/signupSlice";
import { VioletRoundTextBtn } from "../../css/Style";
import { device } from "../../css/GlobalStyles";

const BasicInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [authNum, setAuthNum] = useState(null);
  const [authNumError, setAuthNumError] = useState("");
  const [userNum, setUserNum] = useState(0);
  const [name, setName] = useState(null);
  const [birthDay, setBirthDay] = useState(null);
  const [authBtnDisable, setauthBtnDisable] = useState("disabled");
  const [authInputDisable, setAuthInputDisable] = useState(false);
  const [style, setStyle] = useState({ display: "flex" });
  const [scrollY, setScrollY] = useState(0);
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timerId = useRef(null);
  
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
    setauthBtnDisable("");
    setAuthInputDisable("");
    setMin(3);
    setSec(0);
    time.current = 180;
    timerId.current = null;
    setUserNum(0);
  }, []);

  const onChangeUserNum = useCallback(
    (e) => {
      setUserNum(e.target.value);
    },
    [email]
  );

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onChangeDate = useCallback((e) => {
    setBirthDay(e.target.value.split("-").join(""));
  }, []);

  //이메일 중복확인 후 인증메일 전송
  const emailCheck = async () => {
    const reg_email = /^[0-9a-zA-Z]+@+[0-9a-zA-Z]+.+[a-zA-Z]$/;
    if (!reg_email.test(email) || !email) {
      return alert("이메일을 확인해주세요!");
    }
    try {
      const response = await instance.post("/api/users/mail", { email });

      await setAuthNum(response.data.authNum);
      await alert(`${email}로 인증번호가 발송되었어요!`);
    } catch (e) {
      // return console.log(e);
    }
    auth();
  };

  //인증번호 만료시간 타이머
  const auth = useCallback(() => {
    setauthBtnDisable("disabled");
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);
    // return () => clearInterval(timerId.current)
  }, []);

  useEffect(() => {
    if (authNum && userNum) {
      if (authNum == userNum) {
        clearInterval(timerId.current);
        setAuthInputDisable(true);
        alert("인증완료");
        setAuthNumError("");
      } else {
        setAuthInputDisable(false);
        setAuthNumError("*인증번호가 맞지 않습니다");
      }
    }
  }, [userNum, authNum]);

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

  //데이터 저장 후 이동
  const userInfo = { name, birthDay, email };
  const submit = useCallback(() => {
    if (!authInputDisable) {
      return alert("이메일 인증하세요");
    }
    if (!name || !birthDay) {
      return alert("빈칸 있음");
    }
    dispatch(addDasicInfo(userInfo));
    navigate("/signup/faceCustom");
  }, [authInputDisable, name, birthDay]);

  //스크롤시 디스크립션 사라짐
  const scrollEvent = () => {
    setScrollY(window.scrollY);
    if (scrollY > 10) {
      style.display = "none";
    } else {
      style.display = "flex";
    }
  };
  useEffect(() => {
    function scrollListener() {
      window.addEventListener("scroll", scrollEvent);
    }
    scrollListener();
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  });


  return (
    <div>
      <InfoMessage>
        <p className="message">기본 정보를 입력해주세요</p>
        <p className="subMessage">
          입력해 주신 정보는
          <br />
          맛기록 분석을 위해 사용됩니다
        </p>
      </InfoMessage>
      <InputBox>
        <section>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="이메일 주소"
            onChange={onChangeEmail}
          />
          <div className="authNum">
            <div>
              <input
                type="text"
                onChange={onChangeUserNum}
                disabled={authInputDisable}
              />
              <Time authInputDisable={authInputDisable}>
                {min}분{sec}초
              </Time>
            </div>
            <VioletRoundTextBtn onClick={emailCheck} disabled={authBtnDisable}>
              인 증
            </VioletRoundTextBtn>
          </div>
          <AuthDescription>{authNumError}</AuthDescription>
        </section>
        <section>
          <label htmlFor="">Name</label>
          <input type="text" placeholder="김한나" onChange={onChangeName} />
        </section>
        <section className="BirthDateSection">
          <label htmlFor="date">
            Birth date
          </label>
          <input
            type="date"
            id="date"
            className="date"
            onChange={onChangeDate}
          />
        </section>
      </InputBox>
      <Description style={style}>
        정보는 비공개입니다. 언제든 수정도 가능해요!
      </Description>

      <BlackButton onClick={submit}>마지막 한 단계!</BlackButton>
    </div>
  );
};

const InfoMessage = styled.section`
  height: 162px;
  width: 100%;
  text-align: center;
  padding-top: 20px;
  .message {
    font-family: "AppleSDGothicNeoL";
    line-height: 150%;
    font-size: 28px;
    padding-bottom: 12px;
  }
  .subMessage {
    font-family: "AppleSDGothicNeoL";
    font-size: 16px;
    line-height: 150%;
    color: var(--DEFAULT);
  }
`;

const InputBox = styled.div`
  padding-bottom: 70px;
  section {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
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
      width: 100%;
      font-family: "AppleSDGothicNeoL";
      font-size: 14px;
      line-height: 22px;
      padding: 13px 20px;
      background: var(--WHITE);
      border: 2px solid #eeeeee;
      border-radius: 50px;
      margin-bottom: 10px;
      outline: none;
      position: relative;
      :focus {
        border: 2px solid var(--LIGHTER);
      }
      ::placeholder {
        font-size: 12px;
        color: var(--DEFAULT);
      }
    }
    input.date::-webkit-calendar-picker-indicator {
      background: transparent;
      bottom: 0;
      color: transparent;
      cursor: pointer;
      height: auto;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: auto;
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
      }
    }
    input {
      height: 48px;
    }
  }
  section.BirthDateSection {
    padding-bottom: 70px;
  }
`;
const Time = styled.span`
  position: absolute;
  right: 18px;
  color: var(--ERROR);
  font-size: 12px;
  font-family: "AppleSDGothicNeoM";
  line-height: 22px;
  display: ${(props) => (!props.authInputDisable ? "block" : "none")};
`;
const AuthDescription = styled.span`
  font-family: "AppleSDGothicNeoM";
  font-size: 12px;
  line-height: 22px;
  color: var(--ERROR);
  padding-left: 14px;
  margin-top: 6px;
`;

const Description = styled.div`
@media ${device.pc} {
    max-width: 480px;
    left: 50%;
    transform: translate(-50% ,0);
  }
  align-items: flex-end;
  justify-content: center;
  position: fixed;
  bottom: 72px;
  left: 0%;
  font-family: "AppleSDGothicNeoM";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  height: 100px;
  background: linear-gradient(to bottom, #00000000, #fff);
  width: 100%;
  color: var(--BLACK);
  padding-bottom: 16px;
`;

export default BasicInfo;
