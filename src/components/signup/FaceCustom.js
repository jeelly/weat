import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import resetBtn from "../../img/icon/reset.png";
import { ReactComponent as Characterface } from "../../img/characterface.svg";
import { BlackButton } from "../../css/Style";

const FaceCustom = () => {
  const [hex, setHex] = useState("#23C7C7");
  const [faceOpacity, setFaceOpacity] = useState("1");
  const [nickname, setNickname] = useState("");
  const colorList = [
    { name: "WE_yellow", hex: "#FFBB55" },
    { name: "WE_orange", hex: "#FF7337" },
    { name: "WE_mint", hex: "#23C7C7" },
    { name: "WE_purple", hex: "#7F5FFF" },
    { name: "WE_darkgray", hex: "#404040" },
  ];
  const opacity = ["0.2", "0.4", "0.6", "0.8", "1"];

  const onClickSaturation = useCallback((e) => {
    colorList.map((c) => {
      return c.name === e.target.id
        ? (setHex(c.hex), setFaceOpacity("1"))
        : null;
    });
  }, []);

  const onClickBrightness = useCallback((o) => {
    setFaceOpacity(o);
  }, []);

  const nicknameReset = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const cleanUp = useCallback(() => {
    setNickname("");
  }, []);

  return (
    <div>
      <NickNameBox>
        <p>실명 대신 닉네임을 써보세요</p>
        <div>
          <input
            type="text"
            placeholder="매콤한 오소리"
            value={nickname}
            onChange={nicknameReset}
          />
          <button onClick={cleanUp}></button>
        </div>
      </NickNameBox>
      <FaceBox>
        <div className="face">
          <span>Face</span>
          <div>
            <Characterface fill={hex} opacity={faceOpacity} />
            {/* <img src='' alt='눈' />*/}
          </div>
        </div>
        <div className="color">
          <span>Color</span>
          <div className="saturation">
            <Label htmlFor="WE_yellow" color={"#FFBB55"}>
              <input
                type="radio"
                id="WE_yellow"
                name="faceColor"
                onChange={onClickSaturation}
              />
            </Label>
            <Label htmlFor="WE_orange" color={"#FF7337"}>
              <input
                type="radio"
                id="WE_orange"
                name="faceColor"
                onChange={onClickSaturation}
              />
            </Label>
            <Label htmlFor="WE_mint" color={"#23C7C7"}>
              <input
                type="radio"
                id="WE_mint"
                name="faceColor"              
                defaultChecked
                onChange={onClickSaturation}
              />
            </Label>
            <Label htmlFor="WE_purple" color={"#7F5FFF"}>
              <input
                type="radio"
                id="WE_purple"
                name="faceColor"
                onChange={onClickSaturation}
              />
            </Label>
            <Label htmlFor="WE_darkgray" color={"#404040"}>
              <input
                type="radio"
                id="WE_darkgray"
                name="faceColor"
                onChange={onClickSaturation}
              />
            </Label>
          </div>
          <div className="colorPallet">
            <ColorPallet color={hex}>
              {opacity.map((o, idx) => {
                return (
                  <PalletItem
                    className="palletItem"
                    key={`faceOpacity${o}`}
                    opacity={o}
                    onClick={() => {
                      onClickBrightness(o);
                    }}
                  >
                    <div></div>
                  </PalletItem>
                );
              })}
            </ColorPallet>
          </div>
        </div>
        <div className="eyes">
          <p>Eyes</p>
          <div>
            <label htmlFor="">
              <input type="radio" name="eye" />
            </label>
            <label htmlFor="">
              <input type="radio" name="eye"/>
            </label>
            <label htmlFor="">
              <input type="radio" name="eye"/>
            </label>
            <label htmlFor="">
              <input type="radio" name="eye"/>
            </label>
            <label htmlFor="">
              <input type="radio" name="eye"/>
            </label>
          </div>
        </div>
      </FaceBox>

      <BlackButton>완 료</BlackButton>
    </div>
  );
};

const NickNameBox = styled.div`
  p {
    font-family: "AppleSDGothicNeoM", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    margin: 10px 0 16px;
  }
  div {
    display: grid;
    grid-template-columns: 1fr 24px;
    border-bottom: 1px solid #2d2d2d;
    align-items: center;
    padding: 0 4px 8px;
    margin-bottom: 36px;
    input {
      border: none;
      width: 100%;
      font-size: 32px;
      outline: none;
      line-height: 38px;
      padding-right: 4px;
      font-family: "AppleSDGothicNeoUL";
      ::placeholder {
        color: var(--DEFAULT);
      }
    }
    button {
      border: none;
      width: 24px;
      height: 24px;
      background-image: url(${resetBtn});
    }
  }
`;

const FaceBox = styled.div`
  .face {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    padding-bottom: 44px;

    div {
      width: 124px;
      height: 124px;
      img {
        width: 100%;
      }
    }
  }

  .color {
    width: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 15px;
    .saturation {
      display: flex;
      justify-content: center;
      margin-bottom: 14px;
      label:not(:last-child) {
        margin-right: 32px;
      }
    }
  }

  .eyes {
    width: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 15px;
    p {
      font-family: "Niramit", sans-serif;
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
    }
  }

  span {
    position: absolute;
    left: 0;
    top: 0;
    font-family: "Niramit", sans-serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
  }
`;

const Label = styled.label`
  display: inline-flex;
  width: 20px;
  height: 20px;
  border-radius: 500px;
  position: relative;
  background-color: ${(props) => props.color};
  input {
    appearance: none;
  }
  input:checked {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 3px;
    box-sizing: content-box;
    border-radius: 500px;
    background-color: #ffffff;
    border: 1px solid;
    box-shadow: var(--SHADOW2);
  }
  input:checked::after {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 500px;
    background-color: ${(props) => props.color};
  }
`;

const ColorPallet = styled.ul`
  display: flex;
  box-shadow: var(--SHADOW1);
  width: 300px;
  margin: auto;
  border-radius: 500px;
  position: relative;
  li.palletItem {
    border: 2px solid #fff;
    width: 56px;
    height: 24px;
    box-sizing: content-box;
    overflow: hidden;
    div {
      width: 100%;
      height: 100%;
      background-color: ${(props) => props.color};
      opacity: ${(props) => props.opacity};
    }
  }
  li:first-child {
    border-radius: 500px 0px 0px 500px;
  }
  li:last-child {
    border-radius: 0 500px 500px 0;
  }
  ::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    left: 50%;
    top: -15px;
    transform: translate(-50%, 0);
    border-top: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #fff;
    border-left: 5px solid transparent;
  }
`;

const PalletItem = styled.li`
  div {
    opacity: ${(props) => props.opacity};
  }
`;

export default FaceCustom;
