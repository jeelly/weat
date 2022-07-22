import styled from "styled-components";
import { BlackButton } from "../../css/Style";
import { useLocation, useNavigate } from "react-router";
import { instance } from "../../shared/axios";
const FindPwDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const sendMessage = async () =>{
    try {
      const res = await instance.post("/api/users/findPass", {
        email: state.email,
        customerId: state.id,
      });
      alert(`${state.email}로 비밀번호 재설정 메일이 발송되었어요`)
      console.log(res)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <DescriptionWrap>
      <div className="emailBox">
        <p>{state.email}</p>
        <p>비밀번호 재설정 메일이 발송되었어요</p>
      </div>
      <ButtonBox>
        <p onClick={sendMessage}>인증번호 재발송</p>
        <BlackButton onClick={() => navigate("/login")}>
          로그인하러 가기
        </BlackButton>
      </ButtonBox>
    </DescriptionWrap>
  );
};



const DescriptionWrap = styled.div`
  margin-top: 153px;
  text-align: center;
  position: absolute;
  top: 52px;
  left: 0;
  width: 100%;
  background-color: #fff;

  .emailBox {
    p {
      :first-child {
        font-family: "Niramit";
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 150%;
        color: var(--INFO);
      }
      :last-child {
        font-family: "AppleSDGothicNeoUL";
        font-size: 16px;
        line-height: 150%;
        padding-top: 17px;
        color: var(--DARKER);
      }
    }
  }
`;
const ButtonBox = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 118px;
  p {
    position: absolute;
    width: 100%;
    margin: auto;
    top: 0;
    font-family: "AppleSDGothicNeoM";
    font-size: 12px;
    line-height: 22px;
  }
`;
export default FindPwDescription;
