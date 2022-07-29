import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FooterBtn } from '../../../css/Style';
import Modal from './Modal';
import circle_owner from '../../../img/circle__owner.svg';
import circle_private from '../../../img/circle_private.svg';
import circle_guest from '../../../img/circle_guest.svg';
import { useDispatch, useSelector } from 'react-redux';
import RegistrationItem from './RegistrationItem';
import { postData, RegistrationData } from '../../../redux/modules/postSlice';
import { useNavigate } from 'react-router-dom';

const RoomRegistration = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const rooms = useSelector((state)=> state.post.rooms)
    const [toggle, setToggle] = useState(false);
    const [roomArr, setRoomArr] = useState([])
    const [reset, setReset] = useState()
    const statusIcon = (status) => {
        if(status==='private') {
            return circle_private;
        }else if(status==='publicOwner') {
            return circle_owner;
        }else {
            return circle_guest;
        }
    }

    const upload = async () => {
        await dispatch(RegistrationData(roomArr))
        navigate('/storepost/PostReview')
    }

    const resetBtn = () => {
        setRoomArr('');
        if(reset){
            setReset(false) 
        }else {
            setReset(true)
        }
    }

    return (
        <div>
            {/* <Modal content='맛방에 등록하시겠습니까?' nav='/storepost/PostReview' modal={modal} setModal={setModal} okBtn={upload}/> */}
            <ContentWrap>
                <ul>
                    <Nav>
                        <p><span>{roomArr.length}</span>/{rooms.length}</p>
                        <button onClick={resetBtn}>Reset</button>
                    </Nav>
                    {rooms.map((room, idx)=> (    
                        <RegistrationItem key={room.roomId} room={room} statusIcon={statusIcon} roomArr={roomArr} setRoomArr={setRoomArr} reset={reset}/>
                    ))}
                </ul>
            </ContentWrap>
            <FooterBtn onClick={upload}>
                <p>다 음</p>
            </FooterBtn>
        </div>
    );
};

export default RoomRegistration;

const ContentWrap = styled.article`
    padding:0 4.444%;
    padding-bottom:88px;
`

const Nav = styled.li`
    display:flex;
    justify-content:space-between;
    margin:20px 0;
    p {
        font-family: 'Niramit';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        text-transform: capitalize;
        color:#2d2d2d;
    }
    p > span {
        color:var(--INFO);
    }
    button {
        border:none;
        background-color:transparent;
        text-decoration:underline;
        font-family: 'Niramit';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 16px;
        text-align: right;
        text-transform: capitalize;
        color:var(--BLACK);
        cursor:pointer;
    }
`
