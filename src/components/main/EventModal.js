import React, { useState } from 'react';
import styled from 'styled-components';
import characterface from '../../img/background_character_face.svg';
import closeBtn from '../../img/closeBtn.svg';
import Lock from '../../img/Lock.svg';
import arrow from '../../img/arrow.svg';
import donut from '../../img/donut.svg';
import { device } from "../../css/GlobalStyles";
import alert_banner from '../../img/alert_banner.jpg'
import eventBanner from '../../img/EventBanner.svg'
const EventModal = ({bnClose}) => {
    console.log(bnClose)
    return (
        <EventBnWrap eventBanner={eventBanner}>   
                
                <div>
                    <a target="_black" href="https://docs.google.com/forms/d/e/1FAIpQLSeOzr5Ppeu0BGJIuxBldO7LoFd_VUOeL0ZGzDk0SkP8jBZl8Q/viewform">
                        <img src={eventBanner} alt="" />
                    </a>
                    <span onClick={() => bnClose()}><img src={closeBtn} alt="" className='closeBtn'/></span>
                </div>
        </EventBnWrap>
    );
};

export default EventModal;

const EventBnWrap = styled.aside`
    /* width:100%;
    height:90px; */
    display: flex;
    justify-content: center;
    align-items: center;
    div{
        position: fixed;
        z-index: 2;
        bottom: 0;
        left:50%;
        transform: translate(calc(-50% ),0);
        margin-bottom: 70px;
        padding: 0 16px;
        max-width: 480px;
        width: 100%;
        height:90px;
    }
    a {
        display: block;
        img{
            width: 100%;
            box-shadow: var(--SHADOW2);
            border-radius: 20px;
        }
        
    }
    .closeBtn{
            width: 17px;
            position: absolute;
            top:10%;
            right:7%;
            opacity: .5;
            cursor: pointer;
            :hover{
                opacity: 1;
            }
        }



`