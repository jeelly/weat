import React from "react"
import {useSelector} from 'react-redux'

//컴포넌트
import { Container } from '../css/GlobalStyles';
import Members from "../components/makeRoom/Members";
import RoomCustom from "../components/makeRoom/RoomCustom";
// import Emoji from "../components/makeRoom/Emoji_";
import Emoji from "../components/makeRoom/Emoji"


const MakeRoom = () => {
    const keypad = useSelector(state => state.userEmoji.emojiOnOff)
    console.log(keypad)
    return(
        <>
        <Container>
            <RoomCustom />
            <Members/>
        </Container>        
        {keypad ? <Emoji /> : null}
        </>
    )

}

export default MakeRoom