import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadRoomDetailDB } from '../../redux/modules/postSlice';
import styled from 'styled-components';
import Rooms from './Rooms';
import { device } from '../../css/GlobalStyles';
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
    height:108px;
    display:flex;
    width:${({rooms_length})=>rooms_length===0 ? 0 : rooms_length===1 ? '33vw' : rooms_length===2 ? '66vw' : '95.556vw'};
    width:95.556vw;
    position:absolute;
    bottom:148px;
    left:4.444%;
    white-space: nowrap;
    overflow-x:overlay;
    /* &::-webkit-scrollbar {
        height:8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color:transparent;
        background-color:gray;
    }
    &::-webkit-scrollbar-track {
        background-color:transparent;
        background-color:black;
        transform: matrix(1, 0, 0, -1, 0, 0);
    }
    @media ${device.pc} {
        width:57vw;
        &::-webkit-scrollbar {
            height:8px;    
            transform: scaleX(-1);
        }
    } */
    &::-webkit-scrollbar {
    height:5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color:rgba(125, 125, 125,0.4);
    }
    &::-webkit-scrollbar-track {
        background-color:rgba(125, 125, 125,0.2);
    }
    @media ${device.pc} {
        width:463px;
        &::-webkit-scrollbar {
        height:5px;
        }
    }
`