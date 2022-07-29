import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const RegistrationItem = ({room, statusIcon, roomArr, setRoomArr, reset}) => {
    const [toggle, setToggle] = useState(false);

    useEffect(()=>{
        setToggle(false)
    },[reset])

    const SelectRoom = (roomId) => {
        if(roomArr.indexOf(roomId) === -1) {
            setToggle(true)
            setRoomArr(roomArr => [...roomArr, roomId]);
        }else {
            setToggle(false)
            setRoomArr(roomArr => roomArr.filter((atmos) => atmos !== roomId));
        }
    }
    return (
        <ContentItem toggle={toggle}
        onClick={()=> {
            SelectRoom(room.roomId);
        }}>
            <ItemWrap >
                <strong>{room.emoji}</strong>
                <TextWrap>
                    <h3>{room.roomName}</h3>
                    <p><span>{room.memberNum}</span> members</p>
                </TextWrap>
            </ItemWrap>
            <p><img src={statusIcon(room.status)} alt="status_icon"/></p>
        </ContentItem>
    );
};

export default RegistrationItem;

const ContentItem = styled.li`
    display:flex;
    box-shadow: 0px 2px 2px rgba(153, 153, 153, 0.2), 0px 3px 1px rgba(153, 153, 153, 0.2), 0px -2px 5px rgba(153, 153, 153, 0.2);
    border-radius: 100px;
    padding:12px 20px;
    justify-content:space-between;
    align-items:center;
    margin-bottom:12px;
    border:${({toggle}) => toggle? '2px solid #7F5FFF' : 'none'}
`
const ItemWrap = styled.div`
    display:flex;
    align-items:center;
    strong {
        font-size:24px;
    }
`
const TextWrap = styled.div`
    margin-left:10px;
    h3 {
        font-family: 'AppleSDGothicNeoUL';
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 160%;
        color:var(--BLACK);
    }
    p {
        font-family: 'Niramit';
        font-style: normal;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: -0.02em;
        color:var(--BLACK);
    }
    p > span {
        font-weight: 700;
    }
`