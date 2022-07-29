import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { ReactPortal } from '../../..';
import { modalNum } from '../../../redux/modules/mapSlice';


const InputModal = ({content, modal, setModal, okBtn}) => {
    let navigate = useNavigate();
    const [text, setText] = useState("");

    const onChange = (e) => {
            setText(e.target.value);  
    };   

    return (
        <ReactPortal>
                    <DelModalWrap modal={modal}>
                        <DelModal>
                            <h3>{content}</h3>
                            <input type="text" onChange={onChange} value={text}/>
                            <div>
                                <button onClick={()=>{ setModal(false);}}>NO</button>
                                <button onClick={async ()=>{
                                    await okBtn({value:text, content:content});
                                    await setModal(false);
                                    setText("");
                                }}>OK</button>
                            </div>
                        </DelModal>
                    </DelModalWrap>
        </ReactPortal>
    );
};

export default InputModal;

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
    height:210px;
    background-color:#1a1a1a;
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
        border:none;
        color:var(--WHITE);
        background-color:transparent;
        margin:0 24px;
        cursor:pointer;
    }
    div > button:first-child {
        opacity:0.6;
    }
    input {
        width:100%;
        height:50px;
        margin-bottom:30px;
        background-color:#474747;
        border-radius:5px;
        border:none;
        outline:none;

        font-family:'AppleSDGothicNeoM';
        font-style: normal;
        font-size: 18px;
        line-height: 160%;
        color:var(--WHITE);
        text-align:center;
    }
`