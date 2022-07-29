import React from "react";
import styled from "styled-components";

const Score = ({ review }) => {
  const score = [1, 2, 3, 4, 5];
  
  console.log(review);
  return (
    <div>
      <ScoreListContainer>
        <ScoreList>
          <div className="title">맛</div>
          <ul>
            {score.map((item, idx) => (
              <li
                className="item"
                key={"score" + idx}
                style={{
                  backgroundColor: idx > 4 - review.ratingTasty && "#FF7337",
                }}
              />
            ))}
          </ul>
        </ScoreList>
        <ScoreList>
          <div className="title">가격</div>
          <ul>
            {score.map((item, idx) => (
              <li
                className="item"
                key={"score" + idx}
                style={{
                  backgroundColor: idx > 4 - review.ratingPrice && "#23C7C7",
                }}
              />
            ))}
          </ul>
        </ScoreList>
        <ScoreList>
          <div className="title">서비스</div>
          <ul>
            {score.map((item, idx) => (
              <li
                className="item"
                key={"score" + idx}
                style={{
                  backgroundColor: idx > 4 - review.ratingService && "#FFBB55",
                }}
              />
            ))}
          </ul>
        </ScoreList>
      </ScoreListContainer>
    </div>
  );
};

const ScoreListContainer = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
 
`;
const ScoreList = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top:59px;
    :not(:first-child){
        margin-left:40px;
    }
 .title {
    font-family: "Niramit";
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    color: #fff;
    margin-bottom:10px;
    
  }
  .item {
    width: 40px;
    height: 4px;
    border-radius: 500px;
    background-color: #666;
    margin-bottom: 4px;
  }
`;

export default Score;
