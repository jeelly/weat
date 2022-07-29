import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../../shared/axios";

const AlertModal = ({ type, alertModalOpen }) => {
  const navigate = useNavigate();
  console.log(alertModalOpen);

  const contents = () => {
    if (type === "secession") {
      return `정말로 탈퇴하시겠어요?
          <br />
          그동안 모아뒀던 맛집들이 사라져요 ;&#40;`;
    }
    if (type === "logout") {
      return `정말로 로그아웃하시나요?
            <br />
            다시 오실꺼죠? ;&#40;`;
    }
    if(type === "none"){
        return `준비중이에요! <br /> 조금만 기다려주세요 :)`;
    }
  };

  const modalCloss = () => {
    alertModalOpen(false);
  };  

  const logoutAction = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const secessionAction = async () =>{
    try{
        const res = await instance.delete('/api/users/deleteUser')
        window.localStorage.removeItem("token");
        window.location.replace('/login')
        console.log(res)
    }catch(e){
        console.log(e)
    }
  }

  const btnAction = () => {
    if(type === "secession"){
     return  secessionAction()
    }
    if(type === "logout"){
        return  logoutAction()
    }
    if(type === "none"){
        return  modalCloss()
    }
  };

  return (
    <AlertModalWrap>
      <Alert>
        <h3 dangerouslySetInnerHTML={{ __html: contents() }} />
        <div className="btnArea">
          <p onClick={modalCloss}>NO</p> <p onClick={btnAction}>OK</p>
        </div>
      </Alert>
    </AlertModalWrap>
  );
};

const AlertModalWrap = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 110;
`;
const Alert = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 28%;
  width: 269px;
  height: 140px;
  background-color: #000;
  color: #fff;
  h3 {
    font-family: "AppleSDGothicNeoSB";
    text-align: center;
    font-style: normal;
    font-size: 12px;
    line-height: 160%;
    font-weight: 400;
    color: var(--WHITE);
    padding-top: 20px;
  }
  .btnArea {
    display: flex;
    margin-top: 18px;
    p {
      padding: 10px;
      font-family: "Niramit";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      :last-child {
        margin-left: 70px;
      }
    }
  }
`;

export default AlertModal;
