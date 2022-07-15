import React, { useState } from "react";
import { useSelector } from "react-redux";
import instance from '../shared/axios'
import {useNavigate} from 'react-router-dom'
//컴포넌트
import { Container } from "../css/GlobalStyles";
import Members from "../components/makeRoom/Members";
import RoomCustom from "../components/makeRoom/RoomCustom";
// import Emoji from "../components/makeRoom/Emoji_";
import Emoji from "../components/makeRoom/Emoji";
import { BlackButton } from "../css/Style";
import SearchBar from "../components/makeRoom/SearchBar";

const MakeRoom = () => {
  const navigate = useNavigate()
  const { emojiKey, tasteRoom} = useSelector(state => state.roomMaking);
  const [serchBar, setSerchBar] = useState(false);
  const guestId = tasteRoom.invitedFriends.map((row) => row.split(",")[0]);

  const request = {
    roomName: tasteRoom.roomName,
    emoji: tasteRoom.emoji,
    guestId,
  };

  const roomMaking = async () => {
    try{
        const res = await instance.post('/api/rooms',request)
        navigate('/')
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
