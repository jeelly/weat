import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { ReactPortal } from '../..';
import { editModal, memberdel, roomDeleteDB, roomUserDelDB } from '../../redux/modules/postSlice';


const Modal = ({id}) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const edit = useSelector(state => state.post.editModal);
    const [delEdit, setDelEdit] = useState(false)
    const [key, setKey] = useState()

    useEffect(() => {
        setDelEdit(...Object.values(edit))
        setKey(...Object.keys(edit))
      }, [edit]);

    const noBtn = () => {
        dispatch(editModal({defult:false}))
    }

    // console.log(edit.userId)
    const memberDelete = async () => {
        const data = {
            'id' : edit.userId,
            "del" : true
        }
        if(key === 'Member') {
            await dispatch(roomUserDelDB(id, {guestId:edit.userId}))
            await dispatch(memberdel(data)) 
            dispatch(editModal({defult:false})) //모달창 끄기
        }
    }
    const roomDelete = async () => {
        await dispatch(roomDeleteDB(id))
        navigate("/")
    }

    console.log(key)
    return (
        <ReactPortal>
                    <DelModalWrap delModal={delEdit}>
                        <DelModal>
                            {key === 'Member' ?
                            <h3>정말로 {edit.nickname}님을 <br/>강퇴시키겠어요? :(</h3>
                            : <h3>정말로 삭제하시겠어요?<br/>그동안 모아뒀던 맛집들이 사라져요;( </h3>
                            }
                            <div>
                                <button onClick={noBtn}>NO</button>
                                <button onClick={key === 'Member' ? memberDelete : roomDelete}>OK</button>
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
    position:absolute;
    top:0;
    right:0;
    display:flex;
    justify-content:center;
    display:${({delModal})=>delModal?'flex':'none'}
`
const DelModal = styled.div`
    width:269px;
    height:140px;
    background-color:var(--BLACK);
    margin-top:31.25%;
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