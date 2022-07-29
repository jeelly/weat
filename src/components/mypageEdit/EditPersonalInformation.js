import React, { useState } from "react";
import styled from "styled-components";
import { BlackButton } from "../../css/Style";
import instance from "../../shared/axios";

const EditPersonalInformation = () => {
  const [userName, setUserName] = useState("");
  const [userBirthDate, setUserBirthDate] = useState("");

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const onChangeUserBirthDate = (e) => {
    setUserBirthDate(e.target.value.split("-").join(""));
  };

  const userInfoChangeAction = async (e) => {
    try {
      const res = await instance.put("/api/users/edit", {
        name: userName,
        birthDay: userBirthDate,
      });
      console.log(res);
    } catch (e) {}
  };

  return (
    <ChangePasswordWrap>
      <div className="title">개인정보 수정</div>
      <section className="informationConfirmation">
        <div className="subTitle">Name</div>
        <input type="text" placeholder="이름" onChange={onChangeUserName} />
      </section>
      <section>
        <div className="subTitle">Birth date</div>
        <input type="date" onChange={onChangeUserBirthDate} />
      </section>
      <Button onClick={userInfoChangeAction}> 완료 </Button>
    </ChangePasswordWrap>
  );
};

const ChangePasswordWrap = styled.div`
  padding-bottom: 100px;
  .title {
    font-family: "AppleSDGothicNeoSB";
    font-size: 18px;
    line-height: 160%;
    padding: 20px 0;
  }
  section {
    margin-bottom: 20px;
    .subTitle {
      font-family: "Niramit";
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      margin-bottom: 8px;
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
  }
`;
const Button = styled(BlackButton)`
  ::before {
    content: "정보는 비공개입니다. 맛집추천을 위해 사용됩니다.";
    position: fixed;
    bottom: 82px;
    font-family: "AppleSDGothicNeoM";
    letter-spacing: -0.02em;
    font-size: 12px;
    line-height: 22px;
    color: #000;
  }
`;
export default EditPersonalInformation;
