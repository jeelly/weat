import React from "react";
import styled from "styled-components";

const Gauge = ({selected = false, color}) => {
    return (
      <GaugeStyle fill={selected ? color : "#F5F5F5"} />
    );
}

export default Gauge;

const GaugeStyle = styled.div`
  width:40px;
  height:4px;
  background-color:${({fill})=> fill} ;
`