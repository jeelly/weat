import React, { useState, useEffect, useLayoutEffect } from "react";

//패키지
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//이미지
import logo from "../img/logo_type2.svg";
import googleBtn from "../img/googleLoginBtn.svg";
import kakaoBtn from "../img/kakaoLoginBtn.svg";

//
import instance from "../shared/axios";
import { loginCheck } from "../redux/modules/userSlice";
import { BlackButton } from "../css/Style";
import Splash from "../components/Splash";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };
  const onChangePassword = (e) => {
    setUserPassword(e.target.value);
  };

  //엔터키 누르면 로그인
  const loginAction = async () => {
    try {
      const response = await instance.post("/api/users/login", {
        customerId: userId,
        password: userPassword,
      });
      window.localStorage.setItem("token", response.data.token);
      dispatch(loginCheck(true));
      navigate("/");
    } catch (e) {
      setError(e.response.data.errorMessage);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loginAction();
    }
  };

  useEffect(()=>{
    if(window.localStorage.getItem('token')){
      navigate('/')
    }
  },[])

  //소셜 로그인 후 받은 토큰 저장
  // const userToken = window.location.href.split('=')[1]
  // const tokenSave = () => {
  //   localStorage.setItem('token',userToken)
  // }
  // useEffect(()=>{
  //   if(userToken){
  //     tokenSave()
  //   }
  // },[userToken])

  return (
    <>
    {isLoading ? <Splash /> : ""}
      <LoginContainer>
        <section className="logoSection">
          <img src={logo} alt="" />
        </section>
        <section className="loginInputBox">
          <p>로그인</p>
          <div>
            <input type="text" placeholder="Id" onChange={onChangeId} />
            <input
              type="Password"
              placeholder="Password"
              onChange={onChangePassword}
              onKeyDown={handleKeyDown}
            />
          </div>
        </section>
        <section className="subMenu">
          <p onClick={() => navigate("/finduser")}>
            아이디/비밀번호 찾기 &#62;
          </p>
          <p onClick={() => navigate("/signup/agreement")}>회원가입</p>
        </section>
        <section className="snsLogin">
          
          <div>
            <a
              href="http://realprojectapiserver.com/api/auth/kakao"
              alt="카카오 로그인"
            >
              <img src={kakaoBtn} alt="" />
            </a>
          </div>
          <div>
            <a
              href="http://realprojectapiserver.com/api/auth/google"
              alt="구글 로그인"
            >
              <img src={googleBtn} alt="" />
            </a>
          </div>
        </section>
      </LoginContainer>
      <Button onClick={loginAction} error={error}>
        로그인
      </Button>
    </>
  );
};

const LoginContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--INFO);
  padding: 0 16px 100px;
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
      padding: 28px 0 24px;
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
    p{
      cursor: pointer;
    }
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 300px));
    gap:12px;
    align-items: center;
    justify-content: center;
    padding:30px 14px;
    a{
      display:block;
      width:100%;
      height:45px;
      img{
        width: 100%;
        
      }
    }
        
      
    
  }
`;
const Button = styled(BlackButton)`
  ::after {
    content: "${(props) => props.error}";
    position: absolute;
    top: -61px;
    width: 100%;
    text-align: center;
    margin-top: 24px;
    font-family: "Niramit";
    font-weight: 400;
    font-size: 12px;
    color: var(--WHITE);
    opacity: 0.5;
  }
`;
export default Login;
