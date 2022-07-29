import React, { useState } from 'react';
import styled from 'styled-components';
import characterface from '../../img/background_character_face.svg';
import close from '../../img/close.svg';
import Lock from '../../img/Lock.svg';
import arrow from '../../img/arrow.svg';
import donut from '../../img/donut.svg';
import { device } from "../../css/GlobalStyles";

const MainModal = () => {
    const [modal, setModal] = useState(true)
    return (
        <Aside close={characterface} arrow={arrow} modal={modal}>
            <CloseBtn onClick={()=> {
                setModal(false)
            }}><img src={close} alt="close"/></CloseBtn>
            <SquareWrap>
                <li/>
                <li/>
                <li>
                    <SquareContent>
                        <li><img src={Lock} alt="나만보기"/></li>
                        <li><h3>나만알거야<br/>디저트</h3></li>
                        {/* <li><p>🍩</p></li> */}
                        <li><img src={donut} alt="도너츠"/></li>
                        <li><strong>3</strong><span> members</span></li>
                    </SquareContent>
                </li>
            </SquareWrap>
            <p>기록하고 모아두고 싶은<br/><span>맛방</span>을 만들어보세요!</p>
        </Aside>
    );
};

export default MainModal;

const Aside = styled.aside`
@media ${device.pc} {
      width: 480px;
    }
    font-family: "AppleSDGothicNeoM00", sans-serif;
    display:${({modal}) => modal ?'block':'none'};
    width:100%;
    height:180px;
    text-align:center;
    border-radius:18px 18px 0 0;
    position:fixed;
    bottom:67px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color:var(--LIGHTEST);
    background-image:url(${(props) => props.close});
    background-repeat:no-repeat;
    background-position:bottom 16px right -3px;
    background-size:64px;
    z-index:100;
    > p {
        font-size:14px;
        font-weight:700;
        position:absolute;
        right :24px;
        bottom:58px;
    }
    > p:before {
        content:"";
        display:block;
        width:13.56px;
        height:32.85px;
        background-image:url(${(props) => props.arrow});
        background-repeat:no-repeat;
        background-size:13.56px 32.85px;
        position:absolute;
        top:-26.85px;
        left:31px;
    }
    > span {
        color:#7F5FFF
    }
`
const CloseBtn = styled.button`
    border:none;
    background-color:transparent;
    width:14.34px;
    height:14.34px;
    position:absolute;
    top:16.83px;
    right:16.83px;
    cursor:pointer;
    img {
        width:14.34px;
        height:14.34px;
    }
`
const SquareWrap = styled.ul`
    > li{
        width:150px;
        height:167px;
        border-radius:19px;
        border:4px solid var(--WHITE);
        position:absolute;
        top:-23.24px;
        left:31.71px;
        background-color:#FFBB55;
    } 
    > li:nth-child(2) {
        background-color:#FF7337;
        left:48.34px;
        transform: rotate(6deg);
    }
    > li:nth-child(1) {
        background-color:#23C7C7;
        transform: rotate(12deg);
        left: 69.39px;
    }
`
const SquareContent = styled.ul`
    li:first-child {
        position:absolute;
        top:11.75px;
        right :13.6px;
    }
    li:nth-child(3) > img {
        width: 33.39px;
        height:33.39px;
    }
    li > h3 {
        margin:33.39px auto 15.66px auto;
        color:var(--WHITE);
        font-size:16.6969px;
        line-height:20px;
        font-weight:400;
    }
    li > strong {
        font-size: 11.1313px;
        font-weight:700;
    }
    li > span {
        font-size: 11.1313px;       
    }
`