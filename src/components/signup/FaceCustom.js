//패키지
import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//이미지
import resetBtn from "../../img/icon/reset.svg";
import { ReactComponent as Characterface } from "../../img/characterface.svg";
//컴포넌트
import Eyes from "./Eyes";
import FaceColor from "./FaceColor";
import { eyeList } from "../../components/signup/FaceResource";
import { BlackButton } from "../../css/Style";
//액션함수
import { addFace } from "../../redux/modules/signupSlice";
import { loginCheck } from "../../redux/modules/userSlice";
import { loginUserCheck } from "../../redux/modules/userSlice";
//axios
import {instance, getAuthorizationHeader} from "../../shared/axios";

const FaceCustom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hex, setHex] = useState("#23C7C7");
  const [nickname, setNickname] = useState("");
  const [eyeItem, setEyeItem] = useState(eyeList[2]);
  const eye = eyeItem.split(".")[0].split("/").slice(-1).join();

  const userSignupData = useSelector((state) => state.userSignup);
  const snsUserData = useSelector((state) => state.loggedIn.userInfo);
  const userToken = window.localStorage.getItem('token')
  const url = window.location.href

  const userInfo = {
    nickname: nickname,
    eyes: eye,
    faceColor: hex,
  };

  const buttonAction = useCallback(async () => {
    const reg_nickname = /^[ㄱ-ㅎ가-힣0-9a-zA-Z]{3,10}$/;
    if (!reg_nickname.test(nickname)) {
      console.log(nickname);
      return alert("닉네임 한글/영문 3~10자리!");
    }
    dispatch(addFace(userInfo));
    if (!userToken) {
      try {
        const response = await instance.post("/api/users/signup", {
          birthDay: userSignupData.birthDay,
          customerId: userSignupData.customerId,
          email: userSignupData.email,
          eyes: eye,
          faceColor: hex,
          name: userSignupData.name,
          nickname: nickname,
          password: userSignupData.password,
        });
        return navigate("/signup/completion");
      } catch (e) {
        console.log(e);
      }
    }
    if (userToken) {
      const snsLoginUserData = {
        email: snsUserData.email,
        name: snsUserData.name,
        provider: snsUserData.provider,
        userId: snsUserData.userId,
        nickname:nickname,
        faceColor: hex,
        eyes: eye,
      }
      try {
        const response = await instance.put("/api/users/edit", snsLoginUserData ,{ 
          headers: { Authorization: getAuthorizationHeader() }
        });
        console.log(response)
        dispatch(loginCheck(true));
        dispatch(loginUserCheck(snsLoginUserData));  
        if(url.includes('character_edit'))  {
          navigate('/mypage')
        }else{
          navigate("/");
        }        
      } catch (e) {
        console.log(e);
      }
    }
  }, [nickname, eyeItem, hex,snsUserData]);
console.log()
  //닉네임 셋팅
  const nicknameSetting = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  //닉네임 릿셋
  const cleanUp = useCallback(() => {
    setNickname("");
  }, []);

  //컬러 선택
  const colorChange = useCallback((e) => {
    return e ? setHex(e) : null;
  }, []);

  //눈모양 선택
  const eyeChange = useCallback((item) => {
    setEyeItem(item);
  }, []);

  return (
    <div>
      <NickNameBox>
        <p>실명 대신 닉네임을 써보세요</p>
        <div>
          <input
            type="text"
            placeholder="매콤한 오소리"
            value={nickname}
            onChange={nicknameSetting}
            maxLength="6"
          />
          <button onClick={cleanUp}></button>
        </div>
      </NickNameBox>
      <MakeFace>
        <div className="face">
          <span>Face</span>
          <div>
            <Characterface fill={hex} />
            <img src={eyeItem} alt="눈" />
          </div>
        </div>
        <div className="color">
          <span>Color</span>
          <FaceColor colorChange={colorChange} />
        </div>
        <div className="eyes">
          <p>Eyes</p>
          <Eyes eyeChange={eyeChange} />
        </div>
      </MakeFace>
      <BlackButton onClick={buttonAction}>완 료</BlackButton>
    </div>
  );
};

const NickNameBox = styled.div`
  p {
    font-family: "AppleSDGothicNeoM", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    margin: 10px 0 16px;
  }
  div {
    display: grid;
    grid-template-columns: 1fr 24px;
    border-bottom: 1px solid #2d2d2d;
    align-items: center;
    padding: 0 4px 8px;
    margin-bottom: 36px;
    input {
      border: none;
      width: 100%;
      font-size: 32px;
      outline: none;
      line-height: 38px;
      padding-right: 4px;
      font-family: "AppleSDGothicNeoUL";
      ::placeholder {
        color: var(--DEFAULT);
      }
    }
    button {
      border: none;
      width: 24px;
      height: 24px;
      background-image: url(${resetBtn});
      background-color: transparent;
    }
  }
`;

const MakeFace = styled.div`
padding-bottom:70px;
  .face {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    padding-bottom: 44px;
    div {
      position: relative;
      width: 124px;
      height: 124px;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .color {
    width: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 26px;
    .saturation {
      display: flex;
      justify-content: center;
      margin-bottom: 14px;
      label:not(:last-child) {
        margin-right: 32px;
      }
    }
  }

  .eyes {
    width: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 15px;
    p {
      font-family: "Niramit", sans-serif;
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
    }
  }

  span {
    position: absolute;
    left: 0;
    top: 0;
    font-family: "Niramit", sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
  }
`;

export default FaceCustom;
