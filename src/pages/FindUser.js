import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Container } from "../css/GlobalStyles";
import FindId from "../components/findUser/FindId";
import FindPw from "../components/findUser/FindPw";

const FindUser = () => {
  const [location, setLocation] = useState('id')
  const findIdTab = useCallback(()=>{
    setLocation('id')
  },[])
  const findPasswordTab = useCallback(()=>{
    setLocation('pw')
  },[])
console.log(location)
  return (
    <Container>
      <Tab>
        <li className={location === 'id' && "active"} onClick={findIdTab}>아이디 찾기</li>
        <li className={location === 'pw' && "active"} onClick={findPasswordTab}>비밀번호 찾기</li>
      </Tab>
      {location === 'id' ? <FindId/> : <FindPw/>}
    </Container>
  );
};

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
  li.active{
    color: var(--BLACK);
    border-bottom: 2px solid var(--BLACK);

  }
`;

export default FindUser;
