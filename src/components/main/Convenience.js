import React from 'react';
import styled from 'styled-components';

import positionShift from '../../img/positionShift.svg';

const Convenience = () => {
    return (
        <Container>
            <Total>Total <strong>6</strong></Total>
            <MoveIcon image={positionShift}>길게 눌러 위치이동</MoveIcon>
        </Container>
    );
};

export default Convenience;

// 편의
const Container = styled.article`
    display:flex;
    justify-content:space-between;
    
`
const Total = styled.p`
        font-size:12px;
        font-weight:300;
        line-height:16px;
        text-transform:capitalize;
        color:#2D2D2D;
`

const MoveIcon = styled.p`
    font-size:12px;
    color:#999999;
    line-height:22px;
    &:after{
        content:"positionShift";
        display:inline-block;
        text-indent:-9999px;
        width:18px;
        height:22px;
        background-image:url(${({image}) => image});
        background-repeat:no-repeat;
        background-size:18px 14px;
        background-position:center;
        margin-left:7px;
    }
`