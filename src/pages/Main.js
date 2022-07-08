import React from 'react';
import { ReactPortal } from '..';

import {Container} from '../css/Style'

import MainModal from '../components/main/MainModal';
import UserInfo from '../components/main/UserInfo';
import PostList from '../components/main/PostList';
import ModalBtn from '../components/main/ModalBtn';


const Main = () => {
    return (
        <Container>
            <UserInfo/>
            <ReactPortal>
                <MainModal/>
            </ReactPortal>
            {/* <PostList/> */}
            <ModalBtn/>
        </Container>
    );
};

export default Main;







