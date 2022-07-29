import React from "react";
import styled from "styled-components";
import {ReactComponent as Star} from '../../img/fixed/Star_Icon.svg';

const StarIcon = ({selected = false, color, size}) => {
    return (
      <StarStyle fill={selected ? color : "#fff"} stroke={color} size={size}/>
    );
}

export default StarIcon;

const StarStyle = styled(Star)`
  width:${({size})=> size ? size : '24px'};
  height:${({size})=> size ? size : '24px'};
`