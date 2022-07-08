import styled from "styled-components";
import logo from "../../img/logo_type1.png";
import { VioletButton } from '../../css/Style';

const Completion = () => {
  return (
    <CompletionPage>
      <img src={logo} alt="" />
      <div className="infoMessage">
        <p className="title">가입완료</p>
        <p className="dateInfo">가입일 2022. 04. 12</p>
        <p className="subMessage">
          가입이 완료되었어요!
          <br />
          이제 맛집 히스토리를 기록해보세요
        </p>
      </div>
      <VioletButton>확 인</VioletButton>
    </CompletionPage>
  );
};

const CompletionPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--INFO);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  .infoMessage {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top:68px;
    color: #fff;
    font-family: 'AppleSDGothicNeoUL';
    .title {
      font-weight: normal;
      font-size: 32px;      
      line-height: 150%;
      padding-bottom: 16px;
    } 
    .dateInfo{
      font-weight: 500;      
      font-size: 14px;
      line-height: 150%;
      padding-bottom: 28px;
    }
    .subMessage{
      font-size: 16px;
      line-height: 24px;
      color:var(--LIGHTEST);
      font-family: 'AppleSDGothicNeoT';

    }
  }
`;

export default Completion;
