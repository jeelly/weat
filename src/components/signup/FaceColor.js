import { useState } from "react";
import styled from "styled-components";
import { colorTest } from "./FaceResource";

const FaceColor = (props) => {
  const [location, setLocation] = useState("#23C7C7");

  const changeLocation = (e) => {
    setLocation(e.target.id);
    props.colorChange(e.target.id);
  };
  const changeColor = (e) => {
    props.colorChange(e.target.id);
  };
  return (
    <ColorPaletteContainer>
      <div>
        <section className="mainColor">
          {colorTest.map((i, idx) => {
            const defaultColor = i[4] === "#23C7C7" ? "defaultChecked" : "";
            return (
              <Label htmlFor={i[4]} key={i[4]} color={i[4]}>
                <input
                  type="radio"
                  name="mainColor"
                  onClick={changeLocation}
                  id={i[4]}
                  defaultChecked={defaultColor}
                />
              </Label>
            );
          })}
        </section>
        <section className="detailColor">
          {location === "#FFBB55" ? (
            <ul>
              {colorTest[0].map((i, idx) => {
                return (
                  <li key={i}>
                    <div
                      onClick={changeColor}
                      id={i}
                      style={{ backgroundColor: i }}
                    ></div>
                  </li>
                );
              })}
            </ul>
          ) : null}
          {location === "#FF7337" ? (
            <ul>
              {colorTest[1].map((i, idx) => {
                return (
                  <li key={i}>
                    <div
                      onClick={changeColor}
                      id={i}
                      style={{ backgroundColor: i }}
                    ></div>
                  </li>
                );
              })}
            </ul>
          ) : null}
          {location === "#23C7C7" ? (
            <ul>
              {colorTest[2].map((i, idx) => {
                return (
                  <li key={i}>
                    <div
                      onClick={changeColor}
                      id={i}
                      style={{ backgroundColor: i }}
                    ></div>
                  </li>
                );
              })}
            </ul>
          ) : null}
          {location === "#7F5FFF" ? (
            <ul>
              {colorTest[3].map((i, idx) => {
                return (
                  <li key={i}>
                    <div
                      onClick={changeColor}
                      id={i}
                      style={{ backgroundColor: i }}
                    ></div>
                  </li>
                );
              })}
            </ul>
          ) : null}
          {location === "#404040" ? (
            <ul>
              {colorTest[4].map((i, idx) => {
                return (
                  <li key={i}>
                    <div
                      onClick={changeColor}
                      id={i}
                      style={{ backgroundColor: i }}
                    ></div>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </section>
      </div>
    </ColorPaletteContainer>
  );
};

const ColorPaletteContainer = styled.div`
  width: 300px;
  margin: auto;
  .mainColor {
    text-align: center;
    margin-bottom: 10px;
    label {
      :not(:last-child) {
        margin-right: 32px;
      }
    }
  }
  .detailColor {
    ul {
      display: flex;
      box-shadow: var(--SHADOW1);
      border-radius: 500px;
      position: relative;
      li {
        border: 2px solid #fff;
        width: 56px;
        height: 24px;
        box-sizing: content-box;
        overflow: hidden;

        :first-child {
          border-radius: 500px 0px 0px 500px;
        }
        :last-child {
          border-radius: 0px 500px 500px 0px;
        }
        ::after{
            content: 1111111;
          }

        div {
          width: 100%;
          height: 100%;
          box-sizing: content-box;
        }
      }
    }
  }
`;

const Label = styled.label`
  display: inline-flex;
  width: 20px;
  height: 20px;
  border-radius: 500px;
  position: relative;
  z-index: 1;
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
    border-radius: 50%;
    background-color: ${(props) => props.color};
  }
  input:checked::before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    left: 50%;
    bottom: -11px;
    transform: translate(-50%, 0);
    border-top: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 10px solid #fff;
    border-left: 5px solid transparent;
  }
`;

export default FaceColor;
