import styled from "styled-components";
import logo from "../../img/logo_type2.svg";
import {VioletButton} from '../../css/Style'
import { useNavigate } from "react-router-dom";
const NoEntry = () => {
  const navigate = useNavigate()
  return (
    <NoEntryWrap>
      <img src={logo} alt="" />
      <p>
        <span>비공개 맛방</span>이에요 ;&#40;
        <br />
        지금바로 맛방에 참여해보세요!
      </p>
    <VioletButton onClick={()=>{navigate('/login')}}>로 그 인</VioletButton>
    </NoEntryWrap>
  );
};

const NoEntryWrap = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 180px;
  img {
    margin-bottom: 50px;
  }
  p {
    font-family: "AppleSDGothicNeoM";
    font-size: 18px;
    line-height: 180%;
    span{
        color: #8729FF;
    }
  }
  button {
    font-size: 24px;
    font-family: "AppleSDGothicNeoUL";
  }
`;

export default NoEntry;
