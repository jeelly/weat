import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Container } from "../css/GlobalStyles";
import FindId from "../components/findUser/FindId";
import FindPw from "../components/findUser/FindPw";
import { BlackButton } from "../css/Style";

const FindUser = () => {
  const [location, setLocation] = useState("id");
  const findIdTab = useCallback(() => {
    setLocation("id");
  }, []);
  const findPasswordTab = useCallback(() => {
    setLocation("pw");
  }, []);
  console.log(location);
  return (
    <Container>
      <Tab>
        <li className={location === "id" && "active"} onClick={findIdTab}>
          아이디 찾기
        </li>
        <li className={location === "pw" && "active"} onClick={findPasswordTab}>
          비밀번호 찾기
        </li>
      </Tab>
      <InfoMessage>
        <p className="subMessage">
          가입했던 휴대전화번호를 입력해주세요
          <br />
          인증번호를 보내드립니다.
        </p>
      </InfoMessage>
      {location === "id" ? <FindId /> : <FindPw />}
      <Resend>인증번호 재발송</Resend>
      <BlackButton>발 송</BlackButton>
    </Container>
  );
};
const InfoMessage = styled.section`
  height: 114px;
  width: 100%;
  text-align: center;
  padding: 40px 0 32px;
  .subMessage {
    font-family: "AppleSDGothicNeoL";
    font-size: 14px;
    line-height: 150%;
    color: #666;
  }
`;

const Tab = styled.ul`
  display: flex;
  margin-top: 51px;

  li {
    width: 164px;
    padding-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid var(--LIGHTEST);
    font-family: "AppleSDGothicNeoB";
    font-style: normal;
    font-size: 16px;
    line-height: 22px;
    color: var(--LIGHTER);
  }
  li.active {
    color: var(--BLACK);
    border-bottom: 2px solid var(--BLACK);
  }
`;

const Resend = styled.p`
  display: flex;
  justify-content: center;
  font-family: "AppleSDGothicNeoM";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.02em;
  color: #818286;
`;
export default FindUser;
