import styled from "styled-components";
import { ReactComponent as ThumbUp } from "../img/thumbUp.svg";
import { likeAction } from "./likeAction";
import { useDispatch } from "react-redux";

const LikeToggleBtn = ({ likeDone, likeNum, madiId}) => {
  const dispatch =useDispatch()
  return (
    <LikeWrap
      onClick={() => {
        likeAction(madiId, likeDone, dispatch);
      }}
      color={likeDone ? "#7F5FFF" : "#999"}
    >
      <ThumbUp fill={likeDone ? "#7F5FFF" : "#999"} />
      <span>{likeNum}</span>
    </LikeWrap>
  );
};

const LikeWrap = styled.div`
  /* position: absolute;
  left: 50%;
  top: calc(44% - 16px);
  transform: translate(-50%, 0); */
  width: 78px;
  height: 32px;
  border-radius: 500px;
  background-color: #fff;
  box-shadow: var(--SHADOW1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  span {
    font-family: "Niramit";
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    color: ${props => props.color}
  }
`;

export default LikeToggleBtn;
