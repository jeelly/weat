import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {instance, getAuthorizationHeader} from '../shared/axios'
import {useNavigate} from 'react-router-dom'
//컴포넌트
import { Container } from "../css/GlobalStyles";
import Members from "../components/makeRoom/Members";
import RoomCustom from "../components/makeRoom/RoomCustom";
// import Emoji from "../components/makeRoom/Emoji_";
import Emoji from "../components/makeRoom/Emoji";
import { BlackButton } from "../css/Style";
import SearchBar from "../components/makeRoom/SearchBar";
import { loadRoomDB } from "../redux/modules/postSlice";

const MakeRoom = ({socket}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { emojiKey, tasteRoom} = useSelector(state => state.roomMaking);
  const { userInfo } = useSelector(state => state.loggedIn)
  const [serchBar, setSerchBar] = useState(false);
  const guestId = tasteRoom.invitedFriends.map((row) => row.split(",")[0]);

  const request = {
    roomName: tasteRoom.roomName,
    emoji: tasteRoom.emoji,
    guestId,
  };

  const roomMaking = async () => {
    if(!tasteRoom.roomName){
      return alert('방제목을 지어주세요')
    }
    if(!tasteRoom.emoji){
      return alert('대표 이모지를 선택해주세요')
    }
    try{
        const res = await instance.post('/api/rooms',request,{headers: { Authorization: getAuthorizationHeader() }})
        await socket?.emit("inviteMember", {          
          userId: userInfo.userId,
          guestName: res.data.guestId,
          roomId: res.data.roomId,
        });        
        console.log(userInfo.userId, res.data.guestId, res.data.roomId)
        await dispatch(loadRoomDB(0))
        await navigate('/')
        console.log(res)
    }catch(e){
        console.log(e)
    }
    
  };
  return (
    <>
      <Container>
        <RoomCustom />
        <Members serchBar={serchBar} setSerchBar={setSerchBar} />
        <BlackButton onClick={roomMaking}>완 료</BlackButton>
        <SearchBar serchBar={serchBar} setSerchBar={setSerchBar} />
      </Container>
      {emojiKey ? <Emoji /> : null}
      
    </>
  );
};

export default MakeRoom;
