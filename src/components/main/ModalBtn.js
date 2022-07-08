import React, { useState } from 'react';
import styled from 'styled-components';

import plus from '../../img/plus.svg';
import close from '../../img/main_modal_close.svg';

const ModalBtn = () => {
    const [modal, setModal] = useState(false);

    return (
        <div>
            <CreateModal modal={modal}>
                <Btn>공유<br/>코드</Btn>
                <Btn>맛방<br/>편집</Btn>
                <Btn>맛방<br/>만들기</Btn>
            </CreateModal>
            <CreateBtn plus={plus} close={close} modal={modal} onClick={()=> {
                modal?setModal(false):setModal(true)
            }}>plus</CreateBtn>      
        </div>
    );
};

export default ModalBtn;

const CreateBtn = styled.button`
    width:80px;
    height:80px;
    background-color:var(--BLACK);
    border-radius:50%;
    position:fixed;
    right:16px;
    bottom:20px;
    cursor:pointer;
    text-indent:-9999px;
    background-image:url(${({plus, close, modal}) => !modal?plus:close});
    background-repeat: no-repeat;
    background-position:center;
    background-size:24px;
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
        bottom:208px;
    }
    button:nth-child(1) {
        bottom:292px;
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
    bottom:124px;
    right:22px;
`