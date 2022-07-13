import React, { useState } from 'react';
import styled from 'styled-components';
import positionShift from '../../img/positionShift.svg';
import useLongPress from "../../hook/useLongPress";
import { itemAnimation } from "../../redux/modules/postSlice"
import { useDispatch } from "react-redux";

const Convenience = ({longPressBackspaceCallback}) => {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(true)
    const onLongPress = async () => {
        await setToggle(toggle? false : true)
        dispatch(itemAnimation(toggle))
    };
    
    const backspaceLongPress = useLongPress(onLongPress, longPressBackspaceCallback, 5000);
    
    return (
        <Container>
            <Total>Total <strong>6</strong></Total>
            <MoveIcon {...backspaceLongPress}  image={positionShift}>길게 눌러 위치이동</MoveIcon>
        </Container>
    );
};

export default Convenience;

// 편의
const Container = styled.article`
    width:360px;
    display:flex;
    justify-content:space-between;
    margin:0 auto;
`
const Total = styled.p`
        font-size:12px;
        font-weight:300;
        line-height:16px;
        text-transform:capitalize;
        color:#2D2D2D;
`

const MoveIcon = styled.button`
    border:none;
    background-color:transparent;
    font-size:12px;
    color:#999999;
    line-height:22px;
    cursor:pointer;
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