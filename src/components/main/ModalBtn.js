import React, { useState } from 'react';
import styled from 'styled-components';

import plus from '../../img/plus.svg';
import close from '../../img/main_modal_close.svg';
import { useNavigate } from 'react-router-dom';
import { ModalBtnAnimationOne, ModalBtnAnimationTwo, ModalBtnAnimationThree  } from '../../css/animation/ModalBtnAnimation'
const ModalBtn = () => {
    let navigate = useNavigate();
    const [modal, setModal] = useState(false);

    return (
        <Container>
            <CreateModal modal={modal}>
                <Btn onClick={()=>{navigate("/detail");}}>공유<br/>코드</Btn>
                <Btn onClick={()=>{navigate("/signup/agreement");}}>맛방<br/>편집</Btn>
                <Btn onClick={()=>{navigate("/login");}}>맛방<br/>만들기</Btn>
            </CreateModal>
            <CreateBtn plus={plus} close={close} modal={modal} onClick={()=> {
                modal?setModal(false):setModal(true)
            }}>plus</CreateBtn>      
        </Container>
    );
};

export default ModalBtn;

const Container = styled.div`
    height:100%;
    overflow:hidden;
`
const CreateBtn = styled.button`
    width:80px;
    height:80px;
    background-color:var(--BLACK);
    border-radius:50%;
    cursor:pointer;
    text-indent:-9999px;
    background-image:url(${({plus, close, modal}) => !modal?plus:close});
    background-repeat: no-repeat;
    background-position:center;
    background-size:24px;
    position:fixed;
    right:16px;
    bottom:20px;
`

const CreateModal = styled.div`
    display:${({modal}) => !modal ?'none':'block'};
    opacity: 0.9;
    width:100%;
    height:100vh;
    background-color:var(--WHITE);
    position:absolute;
    top:0;
    right:0;
    button:nth-child(2) {
        animation:${ModalBtnAnimationTwo} 0.3s linear forwards;
    }
    button:nth-child(1) {
        animation:${ModalBtnAnimationThree} 0.3s linear forwards;
    }
`

const Btn = styled.button`
    width:68px;
    height:68px;
    border-radius:50%;
    font-size:12px;
    line-height:20px;
    letter-spacing: -0.02em;
    border: 2px solid var(--BLACK);
    background-color:var(--WHITE);
    position:absolute;
    /* bottom:124px; */
    right:22px;
    cursor: pointer;
    animation:${ModalBtnAnimationOne} 0.3s linear forwards;
`