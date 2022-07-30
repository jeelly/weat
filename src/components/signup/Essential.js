import { useCallback, useState } from "react";
import styled from "styled-components";
import { BlackButton } from "../../css/Style";
import { useNavigate } from "react-router-dom";
import instance from "../../shared/axios";

import { useDispatch, useSelector } from "react-redux";
import { addEssential } from "../../redux/modules/signupSlice";
import { VioletRoundTextBtn } from "../../css/Style";
import { useEffect } from "react";

const Essential = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [customerId, setCustomerId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userInfo = { customerId, password};

  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");

  const [idCheck, setIdCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);

  const buttonAction = async () => {
    dispatch(addEssential(userInfo));
    navigate("/signup/basicInfo");
  };

  const onChangeId = (e) => {
    setCustomerId(e.target.value);
  };

  const onChangePw = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPw = (e) => {
    setConfirmPassword(e.target.value);
  };

  const idDoubleCheck = async () => {
    try {
      await instance.post("/api/users/checkId", { customerId });
      alert("사용 가능");
      setIdCheck(true);
      setIdError('')
    } catch (e) {
      // alert("사용 불가능");
      setIdCheck(false);
      setIdError('*사용할 수 없는 아이디입니다.')
    }
  };

  const matchCheck = async (pw = password,confirmPw = confirmPassword) => {
    try {
      await instance.post("/api/users/checkPass", {
        password: pw,
        confirmPassword: confirmPw,
      });
      setPwError('')
      setPwCheck(true)
    } catch (e) {
      // console.log(e);
      setPwCheck(false)
      setPwError('*비밀번호가 일치하지 않습니다.')
    }
  };
  useEffect(()=>{    
    if(password || confirmPassword){
      matchCheck()
    }
  },[password,confirmPassword])
  

  return (
    <div>
      <InfoMessage>
        <p className="message">가입해주셔서 감사합니다</p>
        <p className="subMessage">
          아이디(이메일)은 변경이 불가합니다:&#40;
          <br />
          정확히 입력해주세요!
        </p>
      </InfoMessage>
      <InputBox>
        <section>
          <label htmlFor="">Id</label>
          <div>
            <input
              type="text"
              placeholder="3글자 이상 입력해주세요."
              onChange={onChangeId}
            />
            <VioletRoundTextBtn onClick={idDoubleCheck} disabled ={!customerId && 'disabled'}>중복 확인</VioletRoundTextBtn>
          </div>
          <Description>{idError}</Description>
        </section>
        <section>
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="특수 문자 포함, 6글자 이상 적어주셔야 해요"
            onChange={onChangePw}
          />
          <input
            type="password"
            placeholder="다시 한번 입력해주세요"
            onChange={onChangeConfirmPw}
          />
          <Description>{pwError}</Description>
        </section>
      </InputBox>
      <BlackButton
        onClick={buttonAction}
        disabled={(!idCheck || !pwCheck) && "disabled"}
      >
        다 음
      </BlackButton>
    </div>
  );
};

const InfoMessage = styled.section`
  height: 178px;
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
    width: 100%;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
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
      height: 48px;
      min-width: 210px;
      font-family: "AppleSDGothicNeoL";
      font-size: 14px;
      line-height: 22px;
      padding: 0 20px;
      background: var(--WHITE);
      border: 2px solid var(--LIGHTEST);
      border-radius: 50px;
      outline: none;
      ::placeholder {
        color: var(--DEFAULT);
        font-size: 12px;
      }
      :focus {
        border: 2px solid var(--LIGHTER);
      }
      &:last-of-type {
        margin-top: 10px;
      }
      &:first-of-type {
        margin-top: 0px;
      }
    }
  }
`;

const Description = styled.span`
  font-family: "AppleSDGothicNeoM";
  font-size: 12px;
  line-height: 22px;
  color: var(--ERROR);
  padding-left: 14px;
  margin-top: 6px;
`;
export default Essential;
