import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadRoomDetailDB } from '../../redux/modules/postSlice';

const RoomData = () => {
    const dispatch = useDispatch()
    const rooms = useSelector(state => state.post.rooms);
    
    const room_id = (id) => {
        console.log('아이디',id)
        dispatch(loadRoomDetailDB(id))
    }

    return (
        <>
          {rooms.map((room)=> (
                <div key={room.roomId}>
                    <button onClick={()=> room_id(room.roomId)}>{room.roomName}</button>
                </div>
            ))}  
        </>
    );
};

export default RoomData;