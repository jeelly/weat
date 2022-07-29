import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loadRoomDetailDB } from '../../redux/modules/postSlice';
import circle_owner from '../../img/circle__owner.svg';
import circle_private from '../../img/circle_private.svg';
import circle_guest from '../../img/circle_guest.svg';
import { loadRoomTagIconDB } from '../../redux/modules/mapSlice';
import { useParams } from 'react-router-dom';

const Rooms = ({room, idx}) => {
    const dispatch = useDispatch()
    const [color, setColor] = useState('#fff')
    const [order, setOrder] = useState(0)
    const [defaultColor, setDefaultColor] = useState('#fff')

    const room_id = (id) => {
        dispatch(loadRoomDetailDB(id))
        dispatch(loadRoomTagIconDB(id))
    }

    const statusIcon = (status) => {
        if(status==='private') {
            return circle_private;
        }else if(status==='publicOwner') {
            return circle_owner;
        }else {
            return circle_guest;
        }
    }
    
    // const activeColor = (order) => {
    //     setOrder(order)
    //     if(!order===idx) return;
    //     if(room.status === 'private') {
    //         setColor('#FFBB55');
    //     }else if(room.status ==='publicOwner') {
    //         setColor('#FF7337');
    //     }else if(room.status ==='publicGuest'){
    //         setColor('#23C7C7');
    //     }else {
    //         setColor('#fff')
    //     }
    // }

    const activeColor = (order) => {
        if(room.status === 'private') {
            return '#FFBB55';
        }else if(room.status ==='publicOwner') {
            return '#FF7337';
        }else if(room.status ==='publicGuest'){
            return '#23C7C7';
        }else {
            return '#fff';
        }
    }

    // useEffect(()=> {
    //     if(order===idx) return;
    //     setColor('#fff');
    // },[activeColor])

    return (
        <Container color={activeColor}>
        <input type='radio'
            name='room' 
            value={room.roomName}
            id={room.roomId}/>
        <Room for={room.roomId} color={color} onClick={()=> {
            // activeColor(room.order);
            room_id(room.roomId);
        }}>
            <EmojiIcon>{room.emoji}</EmojiIcon>
            <TextWrap>
                <h3>{room.roomName}</h3>
                <p>Total<span>{room.storeNum}</span></p>
            </TextWrap>
            <p><img src={statusIcon(room.status)} alt="status_icon"/></p>
        </Room>
        </Container>
    );
};

export default Rooms;

const Room = styled.label`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 12px;
    width:187px;
    height:60px;
    background-color:var(--WHITE);
    border:none;
    border-radius:100px;
    box-shadow:var(--SHADOW2);
    margin:30px 4px 80px 4px;    
`

const Container = styled.div`
    input {
        display:none;
    }
    input[type="radio"]:checked+label { 
        background:red;
        background-color:${({color})=> color};
    } 
`

const EmojiIcon = styled.p`
    display:flex;
    align-items:center;
    justify-content:center;
    width:24px;
    height:24px;
    font-size:24px;
`
const TextWrap = styled.div`
    text-align:left;
    h3 {
        text-align:left;
        font-family:AppleSDGothicNeoM;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 160%;
        color:var(--BLACK)
    }
    p  {
        font-family: 'Niramit';
        font-style: normal;
        font-weight: 300;
        font-size: 10px;
        line-height: 13px;
        letter-spacing: -0.02em;
        color:var(--DEFAULT)
    }
`