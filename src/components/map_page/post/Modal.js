import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { ReactPortal } from '../../..';
import { modalNum } from '../../../redux/modules/mapSlice';


const Modal = ({content, modal, setModal, okBtn, nav}) => {
    let navigate = useNavigate();
    
    return (
        <ReactPortal>
                    <DelModalWrap modal={modal}>
                        <DelModal>
                            <h3>{content}</h3>
                            <div>
                                <button onClick={()=> setModal(false)}>NO</button>
                                <button onClick={async ()=>{
                                    await okBtn();
                                    await setModal(false);
                                    navigate(nav)
                                }}>OK</button>
                            </div>
                        </DelModal>
                    </DelModalWrap>
        </ReactPortal>
    );
};

export default Modal;

const DelModalWrap = styled.article`
    text-align:center;
    width:100%;
    height:100vh;
    background-color:rgba(255, 255, 255,0.9);
    position:fixed;
    z-index:100;
    top:0;
    right:0;
    justify-content:center;
    align-items:center;
    display:${({modal})=>modal?'flex':'none'}
`
const DelModal = styled.div`
    width:269px;
    height:140px;
    background-color:var(--BLACK);
    padding:32px 48px 0px 48px;
    h3 {
        font-family:'AppleSDGothicNeoM';
        font-style: normal;
        font-size: 12px;
        line-height: 160%;
        color:var(--WHITE);
        margin-bottom:28px ;
    }
    div{
        width:100%;
        display:flex;
        justify-content:space-between;
    }
    div > button {
        font-family:'Niramit';
        font-style:normal;
        font-weight:700;
        font-size: 14px;
        line-height: 18px;
        text-transform: capitalize;
        color:var(--WHITE);
        background-color:transparent;
        margin:0 24px;
        cursor:pointer;
    }
    div > button:first-child {
        opacity:0.6;
    }
`