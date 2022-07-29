import styled from "styled-components";
import { ReactComponent as ThumbUp } from "../img/thumbUp.svg";
import { likeAction } from "./likeAction";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from 'react-query';
import instance from "../shared/axios";

const LikeToggleBtn = ({likeDone, likeNum, madiId, Review}) => {
  const QueryClient = useQueryClient();  //캐싱된 데이터 후처리 리듀서 느낌

  const MadiLikeToggleDB = () => {
    return instance.post(`/api/like/${madiId}`);
  }
  const MadiLikeDelDB = () => {
      return instance.delete(`/api/like/${madiId}`);
}

const LikeToggle = useMutation(MadiLikeToggleDB, {
  onSuccess: (response) => {
      QueryClient.invalidateQueries("review") //여기 키값 넣어야함
      
  }
});

const LikeDel = useMutation(MadiLikeDelDB, {
  onSuccess: (response) => {
      QueryClient.invalidateQueries("review") //여기 키값 넣어야함
      
  }
});

  const dispatch = useDispatch()
  return (
    <LikeWrap
      onClick={() => {
        if(!Review) {
          likeAction(madiId, likeDone, dispatch, QueryClient, useMutation);
        }else 
        {
          if(!likeDone){
            LikeToggle.mutate();
          }else {
            LikeDel.mutate();
          }
        }
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
