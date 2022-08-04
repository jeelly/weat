import { useCallback, useState } from "react";
import styled from "styled-components";
import { BlackButton } from "../../css/Style";
import checkIcon from "../../img/icon/check.png";
import { useNavigate } from "react-router-dom";

const Agreement = () => {
  const navigate = useNavigate();

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const agreementCheck1 = useCallback(() => {
    setCheck1(!check1);
  }, [check1]);

  const agreementCheck2 = useCallback(() => {
    setCheck2(!check2);
  }, [check2]);

  const buttonAction = useCallback(() => {
    navigate("/signup/essential");
  }, [check1, check2]);

  return (
    <div>
      <WelcomMessage>
        <p className="message">환영합니다!</p>
        <p className="subMessage">
          회원가입을 위해
          <br />
          약관에 동의해주세요.
        </p>
      </WelcomMessage>
      <AgreementSection>
        <p className="title">모두 동의</p>
        <div>
          <div className="agreementItem">
            <p>
              <span>이용약관</span>과 <span>개인정보 취급방침</span>에
              동의합니다.
            </p>
            <p className={check1 + " toggleBtn"} onClick={agreementCheck1}>
              <img src={checkIcon} alt="" />
            </p>
          </div>
          <div className="agreementItem">
            <p>위치기반의 이용약관에 동의합니다.</p>
            <p className={check2 + " toggleBtn"} onClick={agreementCheck2}>
              <img src={checkIcon} alt="" />
            </p>
          </div>
        </div>
      </AgreementSection>
      <BlackButton
        onClick={buttonAction}
        disabled={(!check1 || !check2) && "disabled"}
      >
        다 음
      </BlackButton>
    </div>
  );
};

const WelcomMessage = styled.section`
  height: 216px;
  text-align: center;
  padding-top: 40px;
  .message {
    font-family: "AppleSDGothicNeoL";
    font-weight: 400;
    font-size: 30px;
    line-height: 150%;
    margin-bottom: 12px;
  }
  .subMessage {
    font-family: "AppleSDGothicNeoL";
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: var(--DEFAULT);
  }
`;

const AgreementSection = styled.section`
padding-bottom: 70px;
  .title {
    font-family: "AppleSDGothicNeoB";
    font-size: 16px;
    line-height: 22px;
    padding-bottom: 16px;
    border-bottom: 1px solid;
    margin-bottom: 28px;
  }
  .agreementItem {
    font-family: "AppleSDGothicNeoM";

    font-size: 14px;
    line-height: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    p {
      span {
        color: var(--INFO);
      }
    }
    .toggleBtn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: var(--LIGHTER);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .true {
      background-color: var(--BLACK);
    }
  }
`;

export default Agreement;
