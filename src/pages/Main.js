import React, { useEffect, useState } from 'react';
import { ReactPortal } from '..';
import {useSelector} from 'react-redux'
import {Container} from '../css/Style'

import MainModal from '../components/main/MainModal';
import UserInfo from '../components/main/UserInfo';
import PostList from '../components/main/PostList';
import ModalBtn from '../components/main/ModalBtn';
import MainDefault from '../components/main/MainDefault';
import styled from 'styled-components';
import Convenience from '../components/main/Convenience';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const _rooms = useSelector(state => state.post._rooms);
    const rooms = useSelector(state => state.post.rooms);
    const [room, setRoom] = useState(rooms);
    const user = useSelector(state => state.loggedIn);

    useEffect(() => {
        setRoom(rooms)
      }, [_rooms]);
      
    console.log(room)
    return (
        <NewContainer>
            <UserInfo user={user.userInfo ?? ''}/>
            <Convenience roomsLength={rooms.length}/>
            <ReactPortal>
                {rooms.length === 0 ? <MainModal/> : null}
            </ReactPortal>
            {rooms.length === 0 ? <MainDefault/> : <PostList rooms={room}/>}
            <ModalBtn/>
        </NewContainer>
    );
};

export default Main;

const NewContainer = styled(Container)`
    overflow:hidden;
`