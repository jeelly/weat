import React, { useState } from "react";

//패키지
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//이미지
import logo from "../img/logo_type2.svg";
import googleIcon from "../img/googleIcon.png";
import kakaoIcon from "../img/kakaoIcon.png";

//
import instance from "../shared/axios";
import { loginCheck } from "../redux/modules/userSlice";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [userId, setUserId] = useState(null);
  const [userPassword, setUserPassword] = useState(null);

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };
  const onChangePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const loginAction = async () => {
    try {
      const response = await instance.post("/api/users/login", {
        customerId:userId,
        password:userPassword,
      });
      window.localStorage.setItem('token', response.data.token)
      dispatch(loginCheck(true))
      navigate('/')      
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <LoginContainer>
      <section className="logoSection">
        <img src={logo} alt="" />
      </section>
      <section className="loginInputBox">
        <p onClick={loginAction}>로그인</p>
        <div>
          <input type="text" placeholder="Id" onChange={onChangeId} />
          <input
            type="text"
            placeholder="Password"
            onChange={onChangePassword}
          />
        </div>
      </section>
      <section className="subMenu">
        <p onClick={() => navigate("/finduser")}>아이디/비밀번호 찾기 &#62;</p>
        <p onClick={() => navigate("/signup/agreement")}>회원가입</p>
      </section>
      <section className="snsLogin">
        <div>
          <img src={googleIcon} alt="" />
          <p>
            <span>구글메일</span>로 로그인
          </p>
        </div>
        <div>
          <img src={kakaoIcon} alt="" />
          <p>
            <span>카카오톡</span>으로 로그인
          </p>
        </div>
      </section>
      <section className="copyright">© 2022 WEat. All rights reserved.</section>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--INFO);
  padding: 0 16px;
  .logoSection {
    display: flex;
    justify-content: center;
    padding-top: 80px;
  }
  .loginInputBox {
    p {
      text-align: center;
      width: 100%;
      font-family: "AppleSDGothicNeoT";
      font-size: 32px;
      line-height: 150%;
      color: var(--WHITE);
      padding: 28px 0 40px;
    }
    input {
      width: 100%;
      height: 50px;
      border-radius: 50px;
      border: 2px solid var(--LIGHTER);
      margin-bottom: 16px;
      padding: 0 24px;
      outline: none;
      ::placeholder {
        color: var(--DEFAULT);
      }
    }
  }
  .subMenu {
    display: flex;
    justify-content: space-between;
    color: var(--WHITE);
    p:first-child {
      font-family: "AppleSDGothicNeoUL";
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 22px;
    }
    p:last-child {
      font-family: "AppleSDGothicNeoSB";
      font-size: 14px;
      line-height: 22px;
    }
  }
  .snsLogin {
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 64px;
      img {
        width: 60px;
      }

      p {
        font-family: "AppleSDGothicNeoT";
        font-style: normal;
        font-size: 14px;
        line-height: 22px;
        color: var(--WHITE);
        padding-top: 16px;
        span {
          font-family: "AppleSDGothicNeoUL";
        }
      }
    }
  }
  .copyright {
    width: 100%;
    text-align: center;
    margin-top: 52px;
    font-family: "Niramit";
    font-weight: 400;
    font-size: 12px;
    color: var(--WHITE);
    opacity: 0.5;
  }
`;

export default Login;
