import { useRef } from "react";
import styled from "styled-components";
import {eyeList} from './FaceResource'

const Eyes = (props) => {
  return (
    <EyeContainer>
      <EyeList>
        {eyeList.map((item, idx) => {
          const checked = item === eyeList[2] ? "defaultChecked" : "";
          return (
            <EyeItemLabel htmlFor={item} key={item} eyeImg={item}>
              <div>
                <input
                  type="radio"
                  name="eye"
                  id={item}
                  defaultChecked={checked}   
                  onClick={()=>{props.eyeChange(item)}}               
                />
                <img src={item} alt="" />
              </div>
            </EyeItemLabel>
          );
        })}
      </EyeList>
    </EyeContainer>
  );
};
const EyeContainer = styled.div`
  position: relative;
  left: -16px;
  padding: 0 0 20px 16px;
  width: calc(100% + 32px);
  overflow: auto;
  text-align: center;
`;
const EyeList = styled.div`
  display: inline-flex;
  margin-top: 18px;
`;

const EyeItemLabel = styled.label`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--LIGHTER);
  :not(:last-child) {
    margin-right: 28px;
  }
  :last-child {
    margin-right: 16px;
  }
  div {
    position: relative;
    input {
      appearance: none;
      width: 100%;
      height: 100%;
      position: relative;
      :checked {
        ::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -45%);
          width: 68px;
          height: 68px;
          display: block;
          border-radius: 50%;
          background-color: var(--WHITE);
          border: 1px solid var(--BLACK);
          box-shadow: var(--SHADOW2);
        }
        ::after {
          content: "";
          background-image: url(${props => (props.eyeImg)});
          background-size: 100% auto ;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          position: absolute;
          z-index: 2;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -45%);
          display: block;
          width: 60px;
          height: 60px;
          background-color: #666;
          border-radius: 50%;
        }
      }
    }
    img {
      position: absolute;
      width: 100%;
      z-index: 1;
      top: 0;
      left: 0;
      /* transform: translate(-50%, 0%); */
    }
  }
`;

export default Eyes;
