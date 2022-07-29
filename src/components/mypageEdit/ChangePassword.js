import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { BlackButton } from "../../css/Style";
import instance from "../../shared/axios";

const ChangePassword = () => {
  const { userInfo } = useSelector((state) => state.loggedIn);
  const [currentId, setCurrentId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState(1);
  const password = useRef();
  const confirmPw = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const [buttonActivation, setButtonActivation] = useState(true);

  const reg = /^(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{6,}$/;

  const message = useCallback(() => {
    if (!reg.test(newPassword)) {
      return setErrorMessage(
        "*비밀번호는 특수 문자 포함, 6글자 이상 적어주셔야 해요"
      );
    }
    if (!(password.current.value === confirmPw.current.value)) {
      setErrorMessage("*비밀번호가 일치하지 않습니다.");
    } else {
      setErrorMessage("");
    }
  }, [confirmPassword, newPassword]);

  const onChangeId = (e) => {
    setCurrentId(e.target.value);
  };
  const onChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
    message();
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    message();
  };

  useEffect(() => {
    if (
      currentId &&
      currentPassword &&
      reg.test(newPassword) &&
      newPassword === confirmPassword &&
      !errorMessage
    ) {
      setButtonActivation(false);
    }
  }, [currentId, currentPassword, newPassword, confirmPassword, reg]);

  const changePasswordAction = async () => {
    try {
      const res = await instance.put("/api/users/passSet", {
        customerId: currentId,
        thePassword: confirmPassword,
        password: newPassword,
      });
      alert('비밀번호가 변경되었습니다.')
      console.log(res)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ChangePasswordWrap>
      <div className="title">비밀번호 변경</div>
      <section className="informationConfirmation">
        <div className="subTitle">ID / Password</div>
        <input
          type="text"
          placeholder="아이디"
          value={currentId}
          onChange={onChangeId}
        />
        <input
          type="password"
          placeholder="현재 비밀번호 입력"
          onChange={onChangeCurrentPassword}
        />
      </section>
      <section>
        <div className="subTitle">New Password</div>
        <input
          type="password"
          placeholder="특수 문자 포함, 6글자 이상 적어주셔야 해요"
          onChange={onChangeNewPassword}
          ref={password}
        />
        <input
          type="password"
          placeholder="다시 한번입력해주세요"
          onChange={onChangeConfirmPassword}
          ref={confirmPw}
        />
        <p className="errorMessage">{errorMessage}</p>
      </section>
      <BlackButton disabled={buttonActivation} onClick={changePasswordAction}> 완료 </BlackButton>
    </ChangePasswordWrap>
  );
};

const ChangePasswordWrap = styled.div`
  .title {
    font-family: "AppleSDGothicNeoSB";
    font-size: 18px;
    line-height: 160%;
    padding: 20px 0;
  }
  section {
    margin-bottom: 40px;
    .subTitle {
      font-family: "Niramit";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      margin-bottom: 8px;
      padding-left:14px;
    }
    input {
      width: 100%;
      height: 48px;
      border-radius: 500px;
      border: 2px solid #f5f5f5;
      outline: none;
      padding: 0 20px;
      font-family: "AppleSDGothicNeoUL";
      font-size: 14px;
      line-height: 22px;
      color: #000;
      :focus {
        border: 2px solid #cccccc;
      }
      :not(:last-child) {
        margin-bottom: 8px;
      }
      ::placeholder {
        font-size: 12px;
        color: #999999;
      }
    }
    p.errorMessage {
      padding-left: 14px;
      font-family: "AppleSDGothicNeoB";
      font-size: 12px;
      line-height: 22px;
      letter-spacing: -0.02em;
      color: var(--ERROR);
    }
  }
`;

export default ChangePassword;
