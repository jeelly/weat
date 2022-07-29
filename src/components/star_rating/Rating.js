import React, { useState } from "react";
import styled from "styled-components";
import Gauge from "./Gauge";
import Star from "./StarIcon";

const createArray = (length) => [...Array(length)];

function Rating({ totalStars = 5, color, set}) {
  const [selectedStar, setSelectedStar] = useState(0);
  const [Rank, setRank] = useState(0)
  const on = (e) => {
    console.log(e.target.value)
    setRank(e.target.value)
    set(e.target.value)
  }
  return (
    <Container>
      {color ? 
      (
        <>
          <GaugeWrap>
          {createArray(totalStars).map((n, i) => (
              <Gauge
                color={color}
                key={i}
                selected={Rank > i} 
                // onSelect={() => setSelectedStar(i + 1)}
              />
          ))}
          </GaugeWrap>
          <div>
                <GaugeRangea type="range" id="volume" name="volume"
                onChange={on}
                      min="0" max="5"/>
          </div>
        </>
      )
      : 
      (
        <>
          <StarWrap>
          {createArray(totalStars).map((n, i) => (
              <Star
                key={i}
                selected={Rank > i} 
                color='#7F5FFF'
              />
          ))}
          </StarWrap>
          <div>
                <Rangea type="range" id="volume" name="volume"
                onChange={on}
                      min="0" max="5"/>
          </div>
        </>
      )
      }
    </Container>
  );
}

export default Rating;

const Container = styled.div`
  position: relative;
  width:100%;
`
const StarWrap = styled.div`
  position: absolute;
  top:0;
  left:50%;
  transform: translate(-50%, 0);
  width:152px;
  display:flex;
  justify-content:space-between;
`

const Rangea = styled.input`
  opacity:0;
  height:24px;
  width:152px;
  position:absolute;
  top:0;
  left:50%;
  transform: translate(-50%, 0);
`

const GaugeWrap = styled.div`
  display:flex;
  flex-direction: column-reverse;
  height:36px;
  justify-content:space-between;
`

const GaugeRangea = styled.input`
  opacity:0;
  height:36px;
  width:40px;
  position:absolute;
  top:0;
  left:0;
  transform: rotate(270deg);
`