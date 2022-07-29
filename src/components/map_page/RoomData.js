import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadRoomDetailDB } from '../../redux/modules/postSlice';
import styled from 'styled-components';
import Rooms from './Rooms';
const RoomData = () => {
    
    const rooms = useSelector(state => state.map.loadStoreRoom);
    
    return (
        <RoomWrap rooms_length={rooms.length}>
          {rooms.map((room, idx)=> (
                <div key={room.roomId}>
                    <Rooms room={room} idx={idx} />
                </div>
            ))}  
        </RoomWrap>
    );
};

export default RoomData;

const RoomWrap = styled.div`
    display:flex;
    width:${({rooms_length})=>rooms_length===0 ? 0 : rooms_length===1 ? '33vw' : rooms_length===2 ? '66vw' : '95.556vw'};
    width:95.556vw;
    position:absolute;
    bottom:0;
    left:4.444%;
    overflow: auto;
    white-space: nowrap;

    &::-webkit-scrollbar {
    height:0px;
    position:absolute;
    top:0;
    left:0;
    }
    &::-webkit-scrollbar-thumb {
        background:transparent;
    }
    &::-webkit-scrollbar-track {
        background:transparent;
    }
`