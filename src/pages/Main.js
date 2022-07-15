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
    const rooms = useSelector(state => state.post?.rooms);
    const user = useSelector(state => state.loggedIn);

    console.log(user)
    
    return (
        <NewContainer>
            <UserInfo user={user.userInfo ? user.userInfo : ''}/>
            <Convenience roomsLength={rooms.length}/>
            <ReactPortal>
                {rooms ? null : <MainModal/>}
            </ReactPortal>
            {rooms?<PostList rooms={rooms}/>:<MainDefault/>}
            <ModalBtn/>
        </NewContainer>
    );
};

export default Main;

const NewContainer = styled(Container)`
    overflow:hidden;
`






