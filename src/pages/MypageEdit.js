import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import close from "../img/icon/close.svg";
import { useNavigate } from "react-router-dom";
import { Container } from "../css/GlobalStyles";

const MypageEdit = () => {
  const navigate = useNavigate();
  return (
    <>
      <Goback>
        <img
          src={close}
          alt=""
          onClick={() => {
            navigate(-1);
          }}
        />
      </Goback>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

const Goback = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 52px;
  background-color: #000;
  padding: 0 16px;
`;

export default MypageEdit;
