import styled from "styled-components";
import { BlackButton } from "../../css/Style";
import { useLocation, useNavigate } from "react-router";
const FindIdDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const date = state.createdAt.split("T")[0].split("-").join(", ");
  return (
    <DescriptionWrap>
      <div className="emailBox">
        <p>아이디 찾기가 완료되었습니다.</p>
        <p>{state.customerId}</p>
      </div>
      <div className="date">
        <p>
          가입일 <span>{date}</span>
        </p>
      </div>
      <ButtonBox>
        {/* <p onClick={() => navigate(-1)}>인증번호 재발송</p> */}
        <BlackButton onClick={() => navigate("/login")}>
          로그인하러 가기
        </BlackButton>
      </ButtonBox>
    </DescriptionWrap>
  );
};

const DescriptionWrap = styled.div`
  margin-top: 114px;
  text-align: center;
  position: absolute;
  top: 52px;
  left: 0;
  width: 100%;
  background-color: #fff;

  .emailBox {
    margin-bottom: 108px;
    p {
      :first-child {
        font-family: "AppleSDGothicNeoUL";
        font-size: 16px;
        line-height: 150%;
        color: var(--DARKER);
        padding-bottom: 13px;
      }
      :last-child {
        font-family: "Niramit";
        font-style: normal;
        font-weight: 700;
        font-size: 22px;
        line-height: 150%;
        color: var(--INFO);
      }
    }
  }
  .date {
    font-family: "AppleSDGothicNeoSB";
    font-size: 14px;
    line-height: 150%;
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
export default FindIdDescription;
